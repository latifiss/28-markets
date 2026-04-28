import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  turbopack: {},
  skipTrailingSlashRedirect: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        buffer: false,
        fs: false,
        net: false,
        tls: false,
      };
      
      config.externals = [
        ...(config.externals || []),
        { redis: 'redis' },
        { '@redis/client': '@redis/client' },
      ];
    }
    return config;
  },
  experimental: {
    prerenderEarlyExit: false,
  },
};

export default nextConfig;