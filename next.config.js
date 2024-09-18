/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['your-image-domain.com'], // 如果你有外部图片源，添加到这里
    },
  }
  
  module.exports = nextConfig