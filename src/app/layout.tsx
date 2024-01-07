import "@/styles/globals.css";
import { type Metadata } from "next";

import local from "next/font/local";
import Link from "next/link";
import { Suspense } from "react";

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
      <body className={`font-sans ${sofia.className}`}>
        <div className="fixed bottom-0 flex w-auto flex-col items-start justify-start gap-2 pb-4 pl-4">
          <Link href="/" className="rounded-md border bg-tertiary-1 px-2 py-1">
            Home
          </Link>
          <Link
            href="/countries"
            className="rounded-md border bg-tertiary-1 px-2 py-1"
          >
            Countries
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
