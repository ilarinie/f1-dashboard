const { getYear } = require('date-fns')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: `/${getYear(new Date())}`,
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
