import { X509Certificate } from 'node:crypto';
import * as fs from 'node:fs';

import { env } from '@documenso/lib/utils/env';
import { P12Signer } from '@libpdf/core';

const loadP12 = (): Uint8Array => {
  const localFileContents = env('NEXT_PRIVATE_SIGNING_LOCAL_FILE_CONTENTS');

  if (localFileContents) {
    return Buffer.from(localFileContents, 'base64');
  }

  const localFilePath = env('NEXT_PRIVATE_SIGNING_LOCAL_FILE_PATH');

  if (localFilePath) {
    return fs.readFileSync(localFilePath);
  }

  if (env('NODE_ENV') !== 'production') {
    return fs.readFileSync('./example/cert.p12');
  }

  throw new Error('No certificate found for local signing');
};

/**
 * Bethof: the real e-CNPJ certificate stays encrypted in the FinanceHub, which hands it over the internal network at
 * ASSINATURA_CERT_URL to callers holding the ASSINATURA_CERT_SECRET bearer. It is kept in memory only, never written
 * to disk or logs. When the FinanceHub does not answer, the last copy from the past 24 hours is used; without one, the
 * test certificate from the NEXT_PRIVATE_SIGNING_* variables seals the document and the health check reports a warning.
 * Without ASSINATURA_CERT_URL nothing changes.
 */
export type LocalCertificateSource = 'local' | 'bridge' | 'bridge-stale' | 'fallback';

type CertificateMaterial = {
  p12: Uint8Array;
  passphrase: string;
};

type BridgeCertificate = CertificateMaterial & {
  fetchedAt: number;
};

const BRIDGE_FRESH_MS = 60 * 60 * 1000;
const BRIDGE_STALE_LIMIT_MS = 24 * 60 * 60 * 1000;
const BRIDGE_RETRY_MS = 60 * 1000;
const BRIDGE_TIMEOUT_MS = 5000;

let localMaterial: CertificateMaterial | null = null;
let bridgeCertificate: BridgeCertificate | null = null;
let bridgeInFlight: Promise<BridgeCertificate> | null = null;
let nextBridgeAttemptAt = 0;
let lastSource: LocalCertificateSource = 'local';

const signerCache = new WeakMap<Uint8Array, { withChain?: P12Signer; withoutChain?: P12Signer }>();

export const getLocalCertificateSource = () => lastSource;

const getLocalMaterial = () => {
  if (!localMaterial) {
    localMaterial = { p12: loadP12(), passphrase: env('NEXT_PRIVATE_SIGNING_PASSPHRASE') || '' };
  }

  return localMaterial;
};

const describeCertificate = (signer: P12Signer) => {
  const certificate = new X509Certificate(Buffer.from(signer.certificate));

  return `${certificate.subject.replace(/\n/g, ', ')}, válido até ${certificate.validTo}`;
};

const fetchBridgeCertificate = async (url: string): Promise<BridgeCertificate> => {
  const response = await fetch(url, {
    headers: { authorization: `Bearer ${env('ASSINATURA_CERT_SECRET') ?? ''}` },
    signal: AbortSignal.timeout(BRIDGE_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const body = (await response.json()) as { pfxBase64?: unknown; senha?: unknown };

  if (typeof body.pfxBase64 !== 'string' || !body.pfxBase64 || typeof body.senha !== 'string') {
    throw new Error('resposta sem pfxBase64 ou senha');
  }

  const fetched = { p12: Buffer.from(body.pfxBase64, 'base64'), passphrase: body.senha, fetchedAt: Date.now() };

  // Opens the certificate before it replaces the cached copy, so a bad answer never evicts a good one.
  const signer = await P12Signer.create(fetched.p12, fetched.passphrase, { buildChain: false });

  signerCache.set(fetched.p12, { withoutChain: signer });

  if (lastSource !== 'bridge') {
    console.log(`[Bethof] Certificado de assinatura recebido do FinanceHub: ${describeCertificate(signer)}.`);
  }

  return fetched;
};

const resolveCertificate = async (): Promise<CertificateMaterial> => {
  const bridgeUrl = env('ASSINATURA_CERT_URL');

  if (!bridgeUrl) {
    lastSource = 'local';

    return getLocalMaterial();
  }

  const now = Date.now();

  if (bridgeCertificate && now - bridgeCertificate.fetchedAt < BRIDGE_FRESH_MS) {
    lastSource = 'bridge';

    return bridgeCertificate;
  }

  if (now >= nextBridgeAttemptAt) {
    try {
      bridgeInFlight ??= fetchBridgeCertificate(bridgeUrl);
      bridgeCertificate = await bridgeInFlight;
      lastSource = 'bridge';

      return bridgeCertificate;
    } catch (err) {
      nextBridgeAttemptAt = Date.now() + BRIDGE_RETRY_MS;

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const cause = err instanceof Error ? (err.cause as { code?: string } | undefined)?.code : undefined;
      const reason =
        err instanceof Error ? `${err.name}: ${err.message}${cause ? ` (${cause})` : ''}` : 'erro desconhecido';
      const usingStale = bridgeCertificate && now - bridgeCertificate.fetchedAt < BRIDGE_STALE_LIMIT_MS;

      console.error(
        usingStale
          ? `[Bethof] ATENÇÃO: o FinanceHub não entregou o certificado (${reason}). Usando a cópia em memória.`
          : `[Bethof] ATENÇÃO: o FinanceHub não entregou o certificado (${reason}). Selando com o certificado de TESTE.`,
      );
    } finally {
      bridgeInFlight = null;
    }
  }

  if (bridgeCertificate && now - bridgeCertificate.fetchedAt < BRIDGE_STALE_LIMIT_MS) {
    lastSource = 'bridge-stale';

    return bridgeCertificate;
  }

  lastSource = 'fallback';

  return getLocalMaterial();
};

export type CreateLocalSignerOptions = {
  /**
   * Fetch missing intermediates via AIA. Leave on for sealing.
   * Turn off for health checks so they do not hit the network.
   *
   * @default true
   */
  buildChain?: boolean;
};

export const createLocalSigner = async ({ buildChain = true }: CreateLocalSignerOptions = {}) => {
  const { p12, passphrase } = await resolveCertificate();

  const cached = signerCache.get(p12) ?? {};
  const key = buildChain ? 'withChain' : 'withoutChain';
  const existing = cached[key];

  if (existing) {
    return existing;
  }

  const signer = await P12Signer.create(p12, passphrase, {
    buildChain,
  });

  signerCache.set(p12, { ...cached, [key]: signer });

  return signer;
};
