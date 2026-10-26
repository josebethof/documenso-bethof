import { X509Certificate } from 'node:crypto';

import { createLocalSigner, getLocalCertificateSource } from '@documenso/signing/transports/local';

import { NEXT_PRIVATE_SIGNING_TRANSPORT } from '../../constants/app';

/**
 * Whether the local P12 opens with the configured passphrase and is in date.
 * Skips AIA so this stays offline. gcloud-hsm and csc always report available.
 */
export const getCertificateStatus = async () => {
  const transport = NEXT_PRIVATE_SIGNING_TRANSPORT();

  // Cannot inspect a remote HSM or CSC provider from this process.
  if (transport === 'gcloud-hsm' || transport === 'csc') {
    return { isAvailable: true };
  }

  // Anything else (typo, leftover `http`) would throw at seal time.
  if (transport !== 'local') {
    return { isAvailable: false };
  }

  try {
    const signer = await createLocalSigner({ buildChain: false });

    const certificate = new X509Certificate(Buffer.from(signer.certificate));

    const now = new Date();

    const isWithinValidityPeriod = new Date(certificate.validFrom) <= now && now <= new Date(certificate.validTo);

    // Bethof: sealing with the test certificate, or with an old copy because the FinanceHub stopped answering,
    // turns the health check into a warning.
    const isFromBridgeOrLocal = ['local', 'bridge'].includes(getLocalCertificateSource());

    return { isAvailable: isWithinValidityPeriod && isFromBridgeOrLocal };
  } catch {
    return { isAvailable: false };
  }
};
