/** Static marketing pages plus a server route for the official public benchmark feed. */
export default {
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  trailingSlash: false,
  images: { unoptimized: true },
  async headers() {
    return [{ source:'/:path*', headers:[
      { key:'X-Content-Type-Options', value:'nosniff' },
      { key:'Referrer-Policy', value:'strict-origin-when-cross-origin' },
      ...(process.env.NODE_ENV === 'development' ? [] : [{ key:'X-Frame-Options', value:'SAMEORIGIN' }]),
      { key:'Permissions-Policy', value:'camera=(), microphone=(), geolocation=()' },
    ] }];
  },
};
