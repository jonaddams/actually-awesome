import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nutrient SDK Samples",
  description:
    "Interactive examples and demos showcasing Nutrient SDKs and features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch hints for faster CDN connections when needed */}
        <link rel="dns-prefetch" href="//cdn.cloud.pspdfkit.com" />
        <link rel="dns-prefetch" href="//document-authoring.cdn.nutrient.io" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
