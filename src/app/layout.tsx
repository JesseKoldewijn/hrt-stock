import "@/styles/globals.css";
import { type Metadata } from "next";

import local from "next/font/local";

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
      <body className={`font-sans ${sofia.className}`}>{children}</body>
    </html>
  );
}
