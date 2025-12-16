import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
