import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/app/components/footer"
import "./globals.css";
import { ScrollRestoration } from "next-scroll-restoration";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Industry Recalls",
  description: "A quick and up-to-date searchable index of FDA and USDA recalls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col top-0 right-0 bottom-0 left-0">
          <div className="flex bg-[#102135] w-full p-8 items-center justify-between">
            <a href="https://jurislawgroup.com" className="p-3"><img src="JURIS-LG-logo.svg" width="160" /></a>
            <a href="https://jurislawgroup.com" className="text-stone-100 text-sm hover:text-stone-300">Back to main site</a>
          </div>
          <div className="flex p-2 grow relative max-w-dvw overflow-y-scroll">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
