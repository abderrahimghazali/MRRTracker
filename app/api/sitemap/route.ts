// app/api/sitemap/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.mrrtracker.app';

  // List of static URLs for your site
  const staticUrls = [
    `${baseUrl}/`,
    `${baseUrl}/privacy-policy`,
    `${baseUrl}/terms`,
  ];

  // Generate XML for each URL
  const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls
    .map(
      (url) => `
          <url>
            <loc>${url}</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
          </url>
        `
    )
    .join('')}
    </urlset>`;

  return new NextResponse(xmlData, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
