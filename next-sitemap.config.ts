// next-sitemap.config.js or .ts
import { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: 'https://www.mrrtracker.app', // Replace with your actual site URL
  generateRobotsTxt: true,               // Optional: Generate a robots.txt file
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
};

export default config;
