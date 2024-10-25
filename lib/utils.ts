import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from 'crypto'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function generateDownloadToken(orderId: string): string {
  const secret = process.env.DOWNLOAD_SECRET_KEY || 'your-secret-key'
  return crypto
    .createHash('sha256')
    .update(`${orderId}-${secret}`)
    .digest('hex')
}