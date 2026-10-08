import type { NextConfig } from "next";

const ONE_YEAR = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // public/ assets default to max-age=0; the video alone is 4.3 MB. Only the hero
      // images and training media are cached long — keep names versioned if replaced.
      { source: "/hero-:name.jpg", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/help-site/media/:file", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
    ];
  },
};

export default nextConfig;
