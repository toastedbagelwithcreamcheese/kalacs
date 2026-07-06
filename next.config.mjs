/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'res.cloudinary.com' },
        { protocol: 'https', hostname: 'rtbyretnbzshnolbljtv.supabase.co' },
      ],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 31536000,
    },
  };

  export default nextConfig;
