import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col top-0 right-0 bottom-0 left-0">
          <div className="flex bg-[#102135] h-20 items-center">
            <a href="https://jurislawgroup.com" className="p-3"><img src="JURIS-LG-logo.svg" width="100" /></a>
          </div>
          <div className="flex p-2 grow relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
