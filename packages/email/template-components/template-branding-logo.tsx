import { Img, Link } from '../components';
import { useBranding } from '../providers/branding';
import { getEmailAssetUrl } from '../utils/asset-url';
import { getSafeBrandingUrl } from '../utils/branding-url';

// Bethof: 103 px wide is 24 px high (the former `h-6`) for the Bethof logo, 512 x 119 px.
const BRANDING_LOGO_WIDTH = 103;

export type TemplateBrandingLogoProps = {
  assetBaseUrl: string;
  className?: string;
};

/**
 * Renders the email logo.
 *
 * - When custom branding is enabled with a logo, the branding logo is shown.
 *   If a safe (http/https) Brand Website is configured, the logo links to it.
 * - Otherwise the Documenso logo is shown.
 */
export const TemplateBrandingLogo = ({ assetBaseUrl, className = 'mb-4 h-6' }: TemplateBrandingLogoProps) => {
  const branding = useBranding();

  const hasCustomBrandingLogo = branding.brandingEnabled && Boolean(branding.brandingLogo);

  if (!hasCustomBrandingLogo) {
    const documensoLogoUrl = getEmailAssetUrl(assetBaseUrl, 'static/logo.png');

    return <Img src={documensoLogoUrl} alt="Documenso Logo" className={className} />;
  }

  // Bethof: Outlook for Windows ignores the CSS height (in rem) and showed the logo at its full 512 px.
  // The width also goes as an HTML attribute, in px, and the height follows the image's proportion.
  const brandingLogo = (
    <Img
      src={branding.brandingLogo}
      alt="Branding Logo"
      width={BRANDING_LOGO_WIDTH}
      className={className.replace(/(^|\s)h-\d+/g, '')}
      style={{ width: `${BRANDING_LOGO_WIDTH}px`, height: 'auto' }}
    />
  );

  const safeBrandingUrl = getSafeBrandingUrl(branding.brandingUrl);

  if (!safeBrandingUrl) {
    return brandingLogo;
  }

  return (
    <Link href={safeBrandingUrl} target="_blank">
      {brandingLogo}
    </Link>
  );
};

export default TemplateBrandingLogo;
