import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Opcjonalne: Pozwala na używanie rozszerzenia .mdx dla stron
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Tutaj możesz dodać wtyczki do markdowna, jeśli potrzebujesz
});

export default withMDX(nextConfig);
