import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { productData } from "@/productData";

const inter = Inter({ subsets: ["latin"] });

// Configure this from productData.ts
export const metadata: Metadata = {
  title: `Buy a ${productData.name}`,
  description: `${productData.name} is a ${productData.description}`,
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
