import type { SVGAttributes } from 'react';

export type LogoProps = SVGAttributes<SVGSVGElement>;

// Bethof: Bethof symbol instead of the Documenso icon.
export const BrandingLogoIcon = ({ ...props }: LogoProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2406 4335 1100 1225" role="img" aria-label="Bethof" {...props}>
      <defs>
        <linearGradient id="bethof-icon-id3" gradientUnits="objectBoundingBox" x1="55.5758%" y1="26.8063%" x2="120.671%" y2="88.3265%">
          <stop offset="0" stopColor="#09BCFF" />
          <stop offset="0.678431" stopColor="#058BD0" />
          <stop offset="1" stopColor="#0059A0" />
        </linearGradient>
        <linearGradient id="bethof-icon-id5" gradientUnits="objectBoundingBox" x1="50.9263%" y1="32.9923%" x2="99.9997%" y2="91.7515%">
          <stop offset="0" stopColor="#09BCFF" />
          <stop offset="0.678431" stopColor="#058BD0" />
          <stop offset="1" stopColor="#0059A0" />
        </linearGradient>
        <linearGradient id="bethof-icon-id6" gradientUnits="objectBoundingBox" x1="91.7354%" y1="26.0669%" x2="115.769%" y2="85.5431%">
          <stop offset="0" stopColor="#09BCFF" />
          <stop offset="0.678431" stopColor="#058BD0" />
          <stop offset="1" stopColor="#0059A0" />
        </linearGradient>
      </defs>
      <path fill="url(#bethof-icon-id3)" d="M3183.67 5217.53c-87.46,116.45 -265.13,141.64 -262.79,140.47 0.33,-0.17 78.23,-33.93 78.61,-139.29l0 -508.25c0,-22.73 18.6,-41.33 41.33,-41.33l101.54 0c22.73,0 41.32,18.6 41.32,41.33l0 507.07z" />
      <path fill="url(#bethof-icon-id5)" d="M2748.09 4808.74l101.54 0c22.73,0 41.33,18.6 41.33,41.32l0 516.52c0,23.56 -238.01,65.7 -235.64,44.24 0.02,-0.15 46.61,-3.86 51.46,-56.51l0 -504.24c0,-22.73 18.6,-41.32 41.33,-41.32z" />
      <path fill="url(#bethof-icon-id6)" d="M3342.68 4394.73l101.53 0c22.73,0 41.33,18.6 41.33,41.33l0 450.41c0,311.65 -227.66,737.05 -978.88,578.99 -22.19,-4.66 -87.49,-34.58 18.2,-42.22 649.69,-47 769.4,-262.73 776.37,-510.44l0 -476.39c0,-22.73 18.73,-41.67 41.46,-41.67z" />
    </svg>
  );
};
