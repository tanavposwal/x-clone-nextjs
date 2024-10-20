import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import Back from "@/components/Back";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MySpace",
  description:
    "Opensource micro blogging app.",
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
        <div className="mx-auto max-w-4xl h-screen border-r flex border-neutral-800 overflow-hidden">
          <div className="">
            <Navbar />
          </div>
          <div className="w-full sm:ml-72 overflow-y-auto">
            <Back />
            <div>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
