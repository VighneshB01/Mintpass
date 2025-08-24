/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['gateway.pinata.cloud', 'ipfs.io'],
    unoptimized: true,
  },
}

module.exports = nextConfig