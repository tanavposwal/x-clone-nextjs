import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Back from "@/components/Back";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X",
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
        <SessionProvider session={session}>
        <div className="mx-auto max-w-4xl h-screen border-r flex border-neutral-800 overflow-hidden">
          <Navbar />
          <div className="w-full ml-72 overflow-y-auto">
            <Back />
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
