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
| Botão "Compartilhar" (propaganda do Documenso nas redes) pode ser escondido na tela de assinatura concluída | `packages/lib/constants/app.ts`, `apps/remix/app/routes/_recipient+/sign.$token+/complete.tsx` |
| Montagem automática da imagem pelo GitHub | `.github/workflows/bethof-imagem.yml` |
| Logo Bethof no topo do painel e no ícone (o nome acompanha a cor do tema claro ou escuro) | `apps/remix/app/components/general/branding-logo.tsx`, `branding-logo-icon.tsx` |
| Cores da marca no aplicativo inteiro, temas claro e escuro, e filete da marca na barra do topo | `apps/remix/app/bethof.css`, `packages/tailwind-config/index.cjs` (paleta "documenso" trocada pelos azuis da marca) |
| Português como idioma padrão, mesmo com navegador em outro idioma (variável) | `packages/lib/utils/i18n.ts` |
| "Bethof" na opção de remetente padrão e no rodapé do menu do celular (o crédito "© Documenso, Inc." continua) | 3 diálogos de envio e `apps/remix/app/components/general/app-nav-mobile.tsx` |
| Tradução completa e revisada do aplicativo inteiro: 860 textos que faltavam e 748 correções de termos e estilo | `apps/remix/bethof/traducoes-pt-BR-completo.po` |

Toda linha alterada nos arquivos originais tem um comentário começando com `Bethof:`.

## Variáveis

- `NEXT_PUBLIC_SOURCE_CODE_URL` (nova): endereço deste código. Quando preenchida, aparece o link "Código-fonte".
- `NEXT_PUBLIC_HIDE_SIGNING_SHARE_BUTTON` (nova): `true` esconde o botão "Compartilhar" da tela de assinatura concluída.
- `NEXT_PUBLIC_DEFAULT_LANGUAGE` (nova): idioma do aplicativo quando a pessoa não escolheu um no menu. Na Bethof: `pt-BR`.
- `NEXT_PUBLIC_PRIVACY_POLICY_URL` (já existia no Documenso): link "Política de privacidade" no mesmo rodapé.
  Na Bethof: `https://bethof.com.br/politica-de-privacidade`.

## Como montar a imagem

Pelo GitHub (recomendado): criar a etiqueta `v2.20.0-bethof.N` e enviar. O fluxo `bethof-imagem.yml`
monta `docker/Dockerfile` e publica em `ghcr.io/<dono-do-repositório>/documenso-bethof:v2.20.0-bethof.N`.

No computador (precisa de uns 4 GB de memória livre para o Docker):

```bash
docker build -f docker/Dockerfile -t bethof/documenso:v2.20.0-bethof.1 .
```

## Como atualizar para uma versão nova do Documenso

1. Buscar a etiqueta nova (por exemplo `v2.21.0`) do repositório oficial.
2. Reaplicar os commits da Bethof por cima dela (`git rebase --onto v2.21.0 v2.20.0 bethof/v2.20.0`).
3. Montar a imagem. Se o script de traduções avisar "texto não existe mais", revisar os arquivos `traducoes-pt-BR*.po`.
   Textos novos da versão nova aparecem em inglês até entrarem em `traducoes-pt-BR-completo.po`.
4. Testar na cópia local antes de trocar a produção.
