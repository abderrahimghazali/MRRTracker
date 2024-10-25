import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;

  try {
    // Retrieve the price for the specific product
    const prices = await stripe.prices.list({
      product: 'prod_R5iMgOdoQmw0B7',
      limit: 1, // Only need the first price if multiple prices are not used
    });

    if (!prices.data || prices.data.length === 0) {
      return NextResponse.json(
        { error: 'No prices found for the specified product.' },
        { status: 400 }
      );
    }

    // Create a checkout session with the retrieved price ID
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}?payment=success`,
      cancel_url: `${origin}?payment=canceled`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Could not create checkout session' }, { status: 500 });
  }
}
