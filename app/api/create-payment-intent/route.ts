// app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId } = body

    const origin = request.headers.get('origin') || ''

    const product = await stripe.products.retrieve(productId)

    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      limit: 1,
    })

    if (!prices.data[0]?.id) {
      return NextResponse.json(
        { error: 'No active price found for this product' },
        { status: 400 }
      )
    }

    // Create Checkout Session with the product
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Update success/cancel URLs with payment status parameter
      success_url: `${origin}?payment=success`,
      cancel_url: `${origin}?payment=canceled`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: error.statusCode || 500 }
      )
    }

    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
}