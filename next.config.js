/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mi-backend-api.liendoalejandro94.workers.dev'],
    unoptimized: true,  // IMPORTANTE para Cloudflare Pages
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://mi-backend-api.liendoalejandro94.workers.dev/api',
  },
  output: 'standalone',  // Recomendado para App Router en Cloudflare
  
  // Si tienes problemas durante el build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig