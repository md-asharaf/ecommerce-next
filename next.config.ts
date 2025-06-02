import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname:"picsum.photos"
            }
        ],
    },
    allowedDevOrigins: ["*.ngrok-free.app"],
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
