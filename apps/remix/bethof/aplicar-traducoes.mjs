// Bethof: aplica apps/remix/bethof/traducoes-pt-BR.po por cima do catálogo pt-BR oficial.
// Roda na montagem, depois do "lingui extract" e antes do "lingui compile" (apps/remix/.bin/build.sh).
// Só troca o msgstr de msgids que já existem no catálogo. Avisa quando um msgid sumiu do código oficial.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const catalogo = path.join(raiz, 'packages/lib/translations/pt-BR/web.po');
const correcoes = path.join(raiz, 'apps/remix/bethof/traducoes-pt-BR.po');

// Lê um campo do PO (msgid ou msgstr), juntando as linhas de continuação.
const lerCampo = (bloco, campo) => {
  const linhas = bloco.split('\n');
  const inicio = linhas.findIndex((l) => l.startsWith(`${campo} "`));
  if (inicio === -1) return null;
  let valor = linhas[inicio].slice(campo.length + 2, -1);
  for (let i = inicio + 1; i < linhas.length && linhas[i].startsWith('"'); i++) valor += linhas[i].slice(1, -1);
  return valor;
};

const blocos = (texto) => texto.replace(/\r\n/g, '\n').split(/\n{2,}/);

// A chave junta o contexto (msgctxt), quando existe, ao texto original.
const chave = (bloco) => {
  const id = lerCampo(bloco, 'msgid');
  if (!id) return null;
  const contexto = lerCampo(bloco, 'msgctxt');
  return contexto === null ? id : `${contexto}${id}`;
};

const mapa = new Map();
for (const bloco of blocos(readFileSync(correcoes, 'utf8'))) {
  const id = chave(bloco);
  if (id) mapa.set(id, lerCampo(bloco, 'msgstr'));
}

const usados = new Set();
const saida = blocos(readFileSync(catalogo, 'utf8')).map((bloco) => {
  const id = chave(bloco);
  if (!id || !mapa.has(id)) return bloco;
  usados.add(id);
  const semMsgstr = bloco.split('\n');
  const inicio = semMsgstr.findIndex((l) => l.startsWith('msgstr "'));
  let fim = inicio + 1;
  while (fim < semMsgstr.length && semMsgstr[fim].startsWith('"')) fim++;
  semMsgstr.splice(inicio, fim - inicio, `msgstr "${mapa.get(id)}"`);
  return semMsgstr.join('\n');
});

writeFileSync(catalogo, saida.join('\n\n'));

const faltando = [...mapa.keys()].filter((id) => !usados.has(id));
console.log(`[Bethof] traduções aplicadas: ${usados.size} de ${mapa.size}`);
for (const id of faltando) console.warn(`[Bethof] texto não existe mais no código oficial: ${id.replace('', ' | ')}`);
