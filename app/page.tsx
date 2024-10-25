'use client';

import { useState, Suspense } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle, Moon, Sun, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { loadStripe } from '@stripe/stripe-js';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import PaymentHandler from "@/components/payment-handler";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleBuy = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    try {
      // Call the API to create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col min-h-screen">
        <header
          className="sticky top-0 z-50 w-full py-4 px-4 md:px-6 bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src="/logo.png"
                  alt="Product Logo"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span className="text-xl font-bold">MRRTracker</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {theme === 'dark' ? <Sun className="h-6 w-6"/> :
                    <Moon className="h-6 w-6"/>}
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <Link href="https://x.com/Ghazalidotdev" target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  <svg className="h-4 w-4 fill-current" height="23"
                       viewBox="0 0 1200 1227" width="23"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
                  </svg>
                  <span className="sr-only">X (Twitter)</span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center">
          <div
            className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>

          <section
            className="w-full py-12 md:py-24 lg:py-32 xl:py-24 flex flex-col items-center justify-center">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Stay in Control, Stay Motivated
                </h1>
                <p
                  className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Track your MRR from your toolbar, stay updated on growth, and
                  get milestone notifications—hassle-free.
                </p>
                <div className="space-x-4 flex items-center">
                  <Button
                    onClick={handleBuy}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base font-medium flex items-center justify-center space-x-2"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5"/>
                        <span>Processing</span>
                      </>
                    ) : (
                      <span>Buy for $4.99</span>
                    )}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline"
                              className="bg-background px-6 py-3 text-base font-medium flex items-center">
                        <PlayCircle className="mr-2 h-5 w-5"/>
                        Watch Video
                      </Button>
                    </DialogTrigger>
                    <DialogTitle></DialogTitle>
                    <DialogContent className="sm:max-w-[800px]">
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          width="100%"
                          height="400"
                          src="https://www.youtube.com/embed/qDTvhhvFxw0?autoplay=1"
                          title="YouTube video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full flex justify-center">
            <div className="container flex justify-center px-4 md:px-6 m-10">
              <Image
                src="/main.webp"
                alt="Product showcase"
                className="w-full max-w-[80%] h-auto object-cover rounded-lg shadow-lg"
                width={1600}
                height={800}
              />
            </div>
          </section>
        </main>
      </div>
      {/* Wrap SearchParams in Suspense */}
      <Suspense fallback={<div>Loading payment status...</div>}>
        <PaymentHandler />
      </Suspense>
    </Suspense>
  );
}
