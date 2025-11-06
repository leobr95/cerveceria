// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typedRoutes: true,
//   images: { unoptimized: true }
// };
// export default nextConfig;
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cerveceria7estrellas.com', pathname: '/wp-content/uploads/**' },
      { protocol: 'https', hostname: 'www.cerveceria7estrellas.com', pathname: '/wp-content/uploads/**' },
    ],
  },
  // NO pongas output: 'export' si usas App Router/SSR
};

export default nextConfig;