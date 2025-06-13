import type { Metadata } from "next"; import { Inter } from "next/font/google"; import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = { title: "Solana Wallet Inspector", description: "A focused tool to inspect a single Address or Transaction.",};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return ( <html lang="en"> <body className={inter.className}> <main className="container mx-auto max-w-4xl p-4 sm:p-8"> <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-solana-green to-solana-purple pb-4"> Solana Wallet Inspector </h1> <p className="text-center text-gray-400 mb-8"> A tool to inspect a single Address or Transaction using public RPCs. </p> {children} </main> </body> </html> );
}

