import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const REMOTE_APP_URL =
  process.env.NEXT_PUBLIC_REMOTE_APP_URL || "http://localhost:3001";

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";

  return {
    remote: `remote@${REMOTE_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "static/chunks/remoteEntry.js",
        remotes: remotes(isServer),
        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
        },
      })
    );

    return config;
  },
};

export default nextConfig;
