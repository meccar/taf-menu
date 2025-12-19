import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
    },
  },
};

export default nextConfig;
