import type { Metadata } from 'next';
export const metadata: Metadata = { robots:{index:false,follow:false},description:'Illustrative Betterway client workspace preview. No live identity, document storage or application processing.' };
export default function PortalPreviewLayout({children}:{children:React.ReactNode}){return children;}
