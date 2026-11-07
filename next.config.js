/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All images are served locally from /public/images.
    // If you switch to remote URLs (e.g. Unsplash), allow the host here:
    // remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
