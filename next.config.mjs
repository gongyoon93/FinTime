/** @type {import('next').NextConfig} */
import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/history",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === "development",
  },
});
