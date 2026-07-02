/** @type {import('next').NextConfig} */

// import type { NextConfig } from "next";
const nextConfig = {
  /* Opções de configuração aqui */
  // allowedDevOrigins: ['*.dev.localhost', 'localhost:3000'], // Permite que subdomínios de desenvolvimento acessem a API localmente
  reactStrictMode: true, // Ativa o modo estrito do React para ajudar a encontrar bugs

  images: {
    // Permite que o componente <Image /> do Next.js carregue imagens de domínios externos de forma segura
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Permite qualquer caminho dentro do domínio do Unsplash
      },
      // Se futuramente você usar outro provedor (ex: Cloudinary, S3), adicione outro objeto aqui:
      // {
      //   protocol: 'https',
      //   hostname: 'sua-api-ou-s3.amazonaws.com',
      //   pathname: '/**',
      // }
    ],
  },

  // Exemplo de configuração adicional para redirecionamentos (muito útil em Delivery)
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true, // Redirecionamento 301 definitivo
      },
    ];
  },
};

export default nextConfig;