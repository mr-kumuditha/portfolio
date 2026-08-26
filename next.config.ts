import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Without it Turbopack walks up to
  // the home directory (there is a stray package-lock.json there) and picks the
  // wrong root, which breaks dev HMR.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
