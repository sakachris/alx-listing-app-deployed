import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      // Dev
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/static/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/static/**",
      },

      // Production
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_API_DOMAIN as string,
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_API_DOMAIN as string,
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,

//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "127.0.0.1",
//         port: "8000",
//         pathname: "/media/**",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/media/**",
//       },
//       {
//         protocol: "http",
//         hostname: "127.0.0.1",
//         port: "8000",
//         pathname: "/static/**",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/static/**",
//       },
//     ],
//   },
// };

// export default nextConfig;
