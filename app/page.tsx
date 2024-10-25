'use client';

import { useState, Suspense } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlayCircle, Loader2 } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import PaymentHandler from "@/components/payment-handler";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductHuntBadge from "@/components/product-hunt-badge";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Home() {
  const [loading, setLoading] = useState(false);
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
        <Header/>
        <main className="flex-grow flex flex-col items-center justify-center">
          <div
            className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>

          <section
            className="w-full py-12 md:py-24 lg:py-32 xl:py-24 flex flex-col items-center justify-center">
            <div className="container px-4 md:px-6">
              <div
                className="w-full flex flex-col items-center justify-center">
                <ProductHuntBadge />
              </div>
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
                <div
                  className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center w-full md:w-auto">
                  {/* Buy Button with macOS 13+ label */}
                  <div className="relative w-full md:w-auto">
                    <Button
                      onClick={handleBuy}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base font-medium flex items-center justify-center space-x-2 w-full" // Added w-full here
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
                    {/* Subtle macOS 13+ text with absolute positioning */}
                    <p
                      className="text-xs text-gray-500 mt-1 left-1/2 transform -translate-x-1/2 relative md:absolute top-full md:mt-0">
                      macOS 13+
                    </p>
                  </div>

                  {/* Watch Video Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-background px-6 py-3 text-base font-medium flex items-center justify-center w-full md:w-auto" // Added w-full for mobile
                      >
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
              <Dialog>
                <DialogTrigger asChild>
                  <Image
                    src="/main.webp"
                    alt="Product showcase"
                    className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] h-auto object-cover rounded-lg shadow-lg cursor-pointer"
                    width={1600}
                    height={800}
                  />
                </DialogTrigger>
                <DialogTitle></DialogTitle>
                <DialogContent className="sm:max-w-[800px]">
                  <Image
                    src="/main.webp"
                    alt="Product showcase"
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                    width={1600}
                    height={800}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </main>
        <Footer/>
      </div>
      {/* Wrap PaymentHandler in Suspense */}
      <Suspense fallback={<div>Loading payment status...</div>}>
        <PaymentHandler/>
      </Suspense>
    </Suspense>
  );
}
