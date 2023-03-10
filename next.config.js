const path = require('path');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cdn.pixabay.com',
      'cdn.ipregistry.co',
      'img.ltwebstatic.com',
      'lh3.googleusercontent.com',
      'media.licdn.com',
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "shared/_mixins.scss"; @import "shared/_variables.scss"; @import "shared/_functions.scss";`,
  },
  env: {
    ip_registry_key: process.env.IP_REGISTRY_API_KEY,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },
  exportPathMap: () => ({
    '/login': { page: '/sign-up' },
    '/register': { page: '/sign-in' },
  }),
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
