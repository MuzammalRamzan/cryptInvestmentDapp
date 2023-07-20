/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  i18n: {
    locales: ["en", "de", "es", "fr", "it", "nl", "pt", "ro", "tr"],
    defaultLocale: "en",
    localeDetection: false,
  },
  async redirects() {
    return [
      {
        source: "/backlink-estimator",
        destination: "/backlink-calculator",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
