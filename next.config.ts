import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Hardcover serves cover art from its assets CDN.
      { protocol: "https", hostname: "assets.hardcover.app", pathname: "/**" },
      { protocol: "https", hostname: "**.hardcover.app", pathname: "/**" },
    ],
  },
};

export default nextConfig;
