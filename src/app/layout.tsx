import { type Metadata } from "next";
import { Suspense } from "react";
import local from "next/font/local";
import Link from "next/link";
import DesktopNavbar from "@/components/navigation/navbar/desktop";
import MobileNavbar from "@/components/navigation/navbar/mobile";
import "@/styles/globals.css";

const sofia = local({
  src: "../../public/fonts/Sofia Pro Regular.ttf",
});

export const metadata: Metadata = {
  title: {
    absolute: "HRT Stock",
    template: "%s | HRT Stock",
  },
  description: "Basic countries stock overview",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`font-sans ${sofia.className} fixed inset-0 flex flex-col justify-center bg-tertiary-2-400`}
      >
        <DesktopNavbar />
        <div className="flex w-full flex-col justify-center gap-4">
          <h1 className="text-center text-2xl font-semibold">HRT Stock</h1>
          <div className="mx-8 flex w-auto max-w-xl flex-col justify-center rounded-lg border-2 border-secondary-300 bg-tertiary-1-400 px-2 py-8 shadow-2xl sm:m-auto sm:w-full">
            {children}
          </div>
        </div>
        <MobileNavbar />
      </body>
    </html>
  );
}
