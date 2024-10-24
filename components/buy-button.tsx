'use client'

import React, { useState, useEffect, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'

import Link from 'next/link'
import { toast } from '@pheralb/toast';
import { Button } from "@/components/button";
import { useSearchParams, useRouter } from 'next/navigation'

interface BuyButtonProps {
  productId: string
  variant?: 'dark' | string
  className?: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function BuyButton({
                                    // productId = 'prod_R5GFPL6Eg3hk1B',
                                    productId = 'prod_R5IYfdJ4uIpE6s',
                                    variant = 'dark',
                                    className = 'block w-40 text-center md:hidden'
                                  }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const toastShown = useRef(false) // to prevent showing multiple toasts

  useEffect(() => {
    if (toastShown.current) return

    const paymentStatus = searchParams.get('payment')

    if (paymentStatus === 'success') {
      toastShown.current = true
      toast.success({
        text: 'Payment Successful! 🎉',
        description: 'Thank you for your purchase. You will receive a confirmation email shortly.',
        delayDuration: 900000 // ensure autoDismiss is set to false
      })

      router.replace(window.location.pathname)
    } else if (paymentStatus === 'canceled') {
      toastShown.current = true
      toast.error({
        text: 'Payment Canceled ❌',
        description: 'Your payment was canceled. Please try again if you wish to complete your purchase.',
        delayDuration: 900000 // ensure autoDismiss is set to false
      })
      router.replace(window.location.pathname)
    }

  }, [searchParams, router])

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      })

      if (error) {
        throw error
      }

    } catch (error) {
      console.error('Payment error:', error)
      toast.error({
        text: 'Payment Failed ❌',
        description: error instanceof Error ? error.message : 'Unable to process your payment. Please try again.',
      })
      setLoading(false)
    }
  }

  return (
    <Button
      as={Link}
      href="#"
      variant="dark"
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Buy for $4.99'}
    </Button>
  )
}
