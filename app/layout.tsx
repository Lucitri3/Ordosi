import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana Inspector",
  description: "A modern, focused tool to inspect Addresses and Transactions on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto max-w-5xl p-4 sm:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gradient pb-2">
            Solana Inspector
          </h1>
          <p className="text-center text-text-secondary mb-8">
            A modern explorer for the Solana blockchain.
          </p>
          {children}
        </main>
      </body>
    </html>
  );
}

