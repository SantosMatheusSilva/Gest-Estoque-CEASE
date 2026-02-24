import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trqacnfiassiagurveil.supabase.co",
      },
    ],
  },
};

export default nextConfig;

// cacheComponents: true, --> ver docs Next.js sobre caching de componentes do servidor

