import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/context/providers";

import ToasterWrapper from "@/components/toaster-wrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mrrtracker.app/'),
  title:'MRRTracker',
  description: 'MRRTracker is a simple macOS app that tracks your Monthly Recurring Revenue (MRR) from your toolbar, providing real-time updates, milestone notifications, and insights in a minimalist interface.',
  keywords: ["MRRTracker", "MRR tracking", "Stripe", "macOS app", "business tracking", "macOS revenue tracker"],
  openGraph: {
    title: 'MRRTracker',
    description: 'MRRTracker is a simple macOS app that tracks your Monthly Recurring Revenue (MRR) from your toolbar, providing real-time updates, milestone notifications, and insights in a minimalist interface.',
    images: 'https://www.mrrtracker.app/preview.png',
  },
  twitter: {
    card:'summary_large_image',
    title: 'MRRTracker',
    images: [{
      url: 'https://www.mrrtracker.app/preview.png',
      alt: 'A vibrant display of animated emojis showcasing various expressions and motions.',
    }],
    description: "MRRTracker is a simple macOS app that tracks your Monthly Recurring Revenue (MRR) from your toolbar, providing real-time updates, milestone notifications, and insights in a minimalist interface.",
  },
  icons: [
    {
      url: "/logo_2.png",
      href: "/logo_2.png"
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased dark:bg-black bg-white", inter.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <ToasterWrapper />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
