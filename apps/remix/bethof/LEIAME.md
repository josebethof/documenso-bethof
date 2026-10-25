# Documenso com as mudanças da Bethof

Este código é o Documenso v2.20.0 (https://github.com/documenso/documenso, licença AGPL-3.0)
com um conjunto pequeno de mudanças feitas pela Bethof Solutions Ltda em 25/10/2026.
Ele roda no portal de assinatura https://assinatura.bethof.com.br.

## O que mudou

| Mudança | Arquivos |
|---|---|
| Idioma: navegador em "pt-BR" passa a abrir o sistema em português (o original comparava só "pt" e caía no inglês) | `packages/lib/utils/i18n.ts` |
| Fontes da marca: Instrument Sans no texto e Sora nos títulos (licença OFL) | `apps/remix/app/bethof.css`, `apps/remix/app/app.css`, `apps/remix/public/fonts/` |
| Nome, ícones e prévia de link da Bethof no lugar do Documenso | `apps/remix/app/utils/meta.ts`, `apps/remix/app/routes/_recipient+/`, `apps/remix/public/` |
| Tradução pt-BR completa e revisada da tela de assinatura e dos e-mails | `apps/remix/bethof/traducoes-pt-BR.po`, `apps/remix/bethof/aplicar-traducoes.mjs`, `apps/remix/.bin/build.sh` |
| Link "Código-fonte" no rodapé da tela de assinatura (AGPL-3.0, seção 13) | `packages/lib/constants/app.ts`, `apps/remix/app/components/general/public-legal-links.tsx` |

Toda linha alterada nos arquivos originais tem um comentário começando com `Bethof:`.

## Variável nova

- `NEXT_PUBLIC_SOURCE_CODE_URL`: endereço deste código. Quando preenchida, aparece o link "Código-fonte".

## Como montar a imagem

```bash
docker build -f docker/Dockerfile -t bethof/documenso:v2.20.0-bethof.1 .
```

## Como atualizar para uma versão nova do Documenso

1. Buscar a etiqueta nova (por exemplo `v2.21.0`) do repositório oficial.
2. Reaplicar os commits da Bethof por cima dela (`git rebase --onto v2.21.0 v2.20.0 bethof/v2.20.0`).
3. Montar a imagem. Se o script de traduções avisar "texto não existe mais", revisar `traducoes-pt-BR.po`.
4. Testar na cópia local antes de trocar a produção.
