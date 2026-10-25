import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { i18n, type MessageDescriptor } from '@lingui/core';

export const appMetaTags = (title?: MessageDescriptor) => {
  // Bethof: textos da marca no lugar dos textos do Documenso.
  const description = 'Portal de assinatura eletrônica da Bethof. Atendimento em todo o Brasil.';

  return [
    {
      title: title ? `${i18n._(title)} | Bethof` : 'Bethof | Assinatura eletrônica',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: 'Bethof, assinatura eletrônica, contrato',
    },
    {
      name: 'author',
      content: 'Bethof Solutions Ltda',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'Bethof | Assinatura eletrônica',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
  ];
};
