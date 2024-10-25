import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import { Toaster } from "@pheralb/toast";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mrrtracker.app/'),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "MRRTracker",
    "monthly recurring revenue",
    "revenue tracking",
    "business growth",
    "subscription tracking",
    "revenue monitoring",
    "milestone notifications"
  ],
  openGraph: {
    title: siteConfig.name,
    siteName: siteConfig.name,
    url: 'https://www.mrrtracker.app',
    description: siteConfig.description,
    images: [
      {
        url: 'https://www.mrrtracker.app/preview.png',
        alt: 'MRRTracker App preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    images: [
      {
        url: 'https://www.mrrtracker.app/preview.png',
        alt: 'MRRTracker App preview',
      },
    ],
    description: siteConfig.description,
  },
  icons: [
    {
      rel: "icon",
      url: "/logo.png",
      type: "image/png"
    },
    {
      rel: "apple-touch-icon",
      url: "/logo.png",
      type: "image/png"
    }
  ]
};



interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable}>
    <head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteConfig.name,
            "url": "https://www.mrrtracker.app",
            "logo": "https://www.mrrtracker.app/logo.png",
            "sameAs": [
              "https://twitter.com/yourTwitter",
              "https://linkedin.com/in/yourLinkedIn"
            ]
          }),
        }}
      />
    </head>
    <body>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Analytics />
      <SpeedInsights />
      <Toaster position="top-right" />
    </ThemeProvider>
    </body>
    </html>
  );
}