import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/abhishek-engagement",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
