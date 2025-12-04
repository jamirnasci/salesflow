import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // This is crucial for Next.js to treat these Node packages as external
    // modules that should not be bundled internally.
    serverComponentsExternalPackages: ["sequelize", "mysql2"],
  },
};

export default nextConfig;
