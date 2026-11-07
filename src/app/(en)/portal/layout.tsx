import type { Metadata } from 'next';
export const metadata: Metadata = { robots:{index:false,follow:false},description:'A sample client workspace for illustration only. It does not verify identity, store documents or process applications.' };
export default function PortalPreviewLayout({children}:{children:React.ReactNode}){return children;}
