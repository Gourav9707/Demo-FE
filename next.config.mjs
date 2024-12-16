/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/compiler', // The path to your new default page
        permanent: true, // Indicates a permanent redirect (308 status code)
      },
    ];
  },
};

export default nextConfig;
