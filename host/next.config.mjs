import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          remote:
            "remote@http://localhost:3001/_next/static/chunks/remoteEntry.js",
        },
        exposes: {},
        shared: {},
      })
    );
  },
};

export default nextConfig;
