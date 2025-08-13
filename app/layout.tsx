import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = "http://213.181.206.12:9305";
const OG_IMAGE_URL = `${SITE_URL}/oson.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "OSON AI - Registration",
  description:
    "Be among the first to explore the future of development — pre-register now for early access to oson.dev and stay ahead with cutting-edge tools designed to streamline your workflow and supercharge your productivity.",
  openGraph: {
    title: "OSON AI - Registration",
    description:
      "Be among the first to explore the future of development — pre-register now for early access to oson.dev and stay ahead with cutting-edge tools designed to streamline your workflow and supercharge your productivity.",
    url: SITE_URL,
    siteName: "OSON.DEV",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "oson.dev Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "oson.dev - Pre-registration",
    description:
      "Be among the first to explore the future of development — pre-register now for early access to oson.dev and stay ahead with cutting-edge tools designed to streamline your workflow and supercharge your productivity.",
    images: [OG_IMAGE_URL],
  },
  icons: {
    icon: "/logo.png", // relatív útvonal a public mappán belül
  },
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
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}