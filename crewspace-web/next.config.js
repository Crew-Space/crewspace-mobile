/** @type {import('next').NextConfig} */
module.exports = {
  distDir: 'dist',
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: process.env.DESTINATION_URL,
        source: process.env.SOURCE_PATH,
      },
    ];
  },
};
