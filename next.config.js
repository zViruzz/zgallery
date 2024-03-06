/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'ptqtitvjamtrjyniaxqk.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'us-tuna-sounds-images.voicemod.net',
      },
    ],
  },
}

module.exports = nextConfig
