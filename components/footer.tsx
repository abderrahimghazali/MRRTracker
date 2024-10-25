'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-background text-center border-t">
      <div className="container mx-auto text-gray-600 dark:text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} MRRTracker. All rights reserved.
        </p>
        <div className="mt-4 space-x-4">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="mailto:contact@mrrtracker.app" target="_blank" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
