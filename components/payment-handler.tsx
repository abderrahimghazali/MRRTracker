'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from "@pheralb/toast";  // Import toast from @pheralb/toast

export default function PaymentHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentStatus = searchParams.get("payment");

    if (paymentStatus === "success") {
      toast.success({
        text: 'Payment Successful! 🎉',
        description: 'Thank you for your purchase. You will receive a confirmation email shortly.',
        delayDuration: 900000
      });
      router.replace("/");
    } else if (paymentStatus === "canceled") {
      toast.error({
        text: 'Payment Canceled ❌',
        description: 'Your payment was canceled. Please try again if you wish to complete your purchase.',
        delayDuration: 900000
      });
      router.replace("/");
    }
  }, [searchParams, router]);

  return null;
}
