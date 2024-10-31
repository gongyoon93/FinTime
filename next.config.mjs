/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
  //   reactStrictMode: true,
  //   images: {
  //     remotePatterns: [
  //       {
  //         protocol: "https",
  //         hostname: "lh3.googleusercontent.com",
  //       },
  //     ],
  //   },
  //   async headers() {
  //     return [
  //       {
  //         source: "/api/:path*",
  //         headers: [
  //           {
  //             key: "Access-Control-Allow-Origin",
  //             value: process.env?.NEXT_PUBLIC_PROD_URL || "http://localhost:3000", // 배포 주소 호스팅 가능하게
  //           },
  //           {
  //             key: "Access-Control-Allow-Origin",
  //             value:
  //               "https://ssl.gstatic.com/accessibility/javascript/ext/loader.js?1709880302058", // t
  //           },
  //           {
  //             key: "Access-Control-Allow-Methods",
  //             value: "GET, POST, PUT, DELETE, OPTIONS",
  //           },
  //           {
  //             key: "Access-Control-Allow-Headers",
  //             value: "Content-Type, Authorization",
  //           },
  //         ],
  //       },
  //     ];
  //   },
};

export default withPWA({
  ...nextConfig,
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
});
