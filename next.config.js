/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    apiTimeout: 30000, // 30 seconds
  },

}

module.exports = nextConfig
