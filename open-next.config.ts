import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Configuración específica para Cloudflare
  imageLoader: 'cloudflare',
  
  // Configuración de experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Configuración de compresión y optimización
  compress: true,
  minify: true,
  
  // Configuración de imágenes
  images: {
    domains: ['mi-backend-api.liendoalejandro94.workers.dev'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Configuración de variables de entorno para Cloudflare
  env: {
    NEXT_PUBLIC_API_URL: 'https://mi-backend-api.liendoalejandro94.workers.dev/api',
  },
  
  // Headers de seguridad
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ],
});