import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Back from "@/components/Back";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Micro blog",
  description:
    "Opensource X clone.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#fc3838"
          template='<div class="bar z-50" role="bar"></div>'
        />
        <SessionProvider session={session}>
        <div className="mx-auto max-w-4xl h-screen border-r flex border-slate-800 overflow-hidden">
          <Navbar />
          <div className="w-full ml-72 overflow-y-auto">
            <div className="w-full h-14 relative">
              <Back />
            </div>
            <div>
              {children}
            </div>
          </div>
        </div>
        </SessionProvider>
      </body>
    </html>
  );
}
