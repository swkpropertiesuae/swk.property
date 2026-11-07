import type { ReactNode } from 'react';

/** Responsive photo: AVIF → WebP → JPEG, 1x/2x sources. Files live in /public/img/<name>-<w>.<ext>. */
export function Photo({ name, alt, w = 1376, h = 768, sizes = '(min-width: 1024px) 50vw, 100vw', className = '', priority = false }: {
  name: string; alt: string; w?: number; h?: number; sizes?: string; className?: string; priority?: boolean;
}) {
  const set = (ext: string) => `/img/${name}-1376.${ext} 1376w, /img/${name}-2752.${ext} 2752w`;
  return (
    <div className={`group overflow-hidden rounded-card ${className}`}>
      <picture>
        <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
        <img src={`/img/${name}-1376.jpg`} srcSet={set('jpg')} sizes={sizes} alt={alt} width={w} height={h}
          loading={priority ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </picture>
    </div>
  );
}

/**
 * Laptop frame, adapted from 21st.dev "Macbook Pro" mockup (designali-in/macbook-pro).
 * The SVG draws the bezel; live HTML sits in the screen cut-out (coordinates from the SVG's 650x400 viewBox).
 */
export function Laptop({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[650/400] w-full ${className}`}>
      <svg viewBox="0 0 650 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path fill="#a4a5a7" d="M79.56,13.18h491.32c7.23,0,13.1,5.87,13.1,13.1v336.61H66.46V26.28c0-7.23,5.87-13.1,13.1-13.1Z" />
        <path fill="#222" d="M79.96,14.24h490.45c6.83,0,12.37,5.54,12.37,12.37v336.28H67.59V26.6c0-6.83,5.54-12.37,12.37-12.37Z" />
        <path fill="#000" d="M570.25,15.74H80.34c-6.12,0-11.080,4.96-11.08,11.08v336.07h512.08V26.82c0-6.12-4.96-11.08-11.08-11.08ZM575.74,345.17H74.52V27.31c0-3.31,2.68-5.99,5.99-5.99h489.24c3.31,0,5.99,2.68,5.99,5.99v317.86Z" />
        <rect fill="#ffffff" x="74.52" y="21.32" width="501.22" height="323.85" rx="5" />
        <rect fill="#1d1d1d" x="69.09" y="350.51" width="512.11" height="12.48" />
        <path fill="#acadaf" d="M19.04,362.77h611.92v10.39c0,5.950-4.83,10.79-10.79,10.79H29.83c-5.95,0-10.79-4.83-10.79-10.79v-10.39h0Z" />
        <path fill="#8f9091" d="M278.11,362.6h94.05c0,3.63-2.95,6.58-6.58,6.58h-80.89c-3.63,0-6.58-2.95-6.58-6.58h0Z" />
        <polygon fill="#b9b9bb" points="600.06 385.39 567.29 385.39 565.84 383.95 601.82 383.95 600.06 385.39" />
        <polygon fill="#b9b9bb" points="82.64 385.39 49.87 385.39 48.43 383.95 84.41 383.95 82.64 385.39" />
      </svg>
      <div className="absolute overflow-hidden rounded-[3px] bg-white" style={{ left: '11.465%', top: '5.33%', width: '77.11%', height: '80.96%' }}>
        {children}
      </div>
      <div className="pointer-events-none absolute rounded-b-[4px] bg-black" style={{ left: '45.82%', top: '5.25%', width: '8.32%', height: '2.3%' }} aria-hidden="true" />
    </div>
  );
}
