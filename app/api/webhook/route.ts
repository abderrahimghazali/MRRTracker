import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined')
}

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
  throw new Error('AWS credentials are not properly configured')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-09-30.acacia',
})

const resend = new Resend(process.env.RESEND_API_KEY)

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

async function generatePresignedUrl() {
  const command = new GetObjectCommand({
    Bucket: 'abdel-gh',
    Key: 'MRRTrackerApp.zip',
  })

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 48 * 60 * 60,
  })

  return signedUrl
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  console.log('Received webhook', {
    signature_present: !!signature,
    webhook_secret_present: !!process.env.STRIPE_WEBHOOK_SECRET
  })

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    console.log('Webhook event constructed successfully:', event.type)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    console.log('Processing checkout.session.completed event')
    const session = event.data.object as Stripe.Checkout.Session
    const customerEmail = session.customer_details?.email

    console.log('Session details:', {
      session_id: session.id,
      customer_email: customerEmail,
      payment_status: session.payment_status
    })

    try {
      // Generate presigned URL
      const presignedUrl = await generatePresignedUrl()
      console.log('Generated presigned URL:', presignedUrl)

      if (customerEmail) {
        // Send email
        const emailResponse = await resend.emails.send({
          from: 'MRRTracker <no-reply@mrrtracker.app>',
          to: customerEmail,
          subject: 'MMRTracker App Download Link',
          html: `
            <h1>Thank you for your purchase!</h1>
            <p>Your payment was successful.</p>
            <p>Your Order ID is: ${session.id}</p>
            <p>You can download your app here: <a href="${presignedUrl}">Download App</a></p>
            <p>Important: This download link will expire in 48 hours for security purposes.</p>
            <p>If you have any issues with the download, please contact our support team.</p>
          `,
        })
        console.log('Email sent successfully:', emailResponse)
      } else {
        console.log('No customer email found in session')
      }
    } catch (error) {
      console.error('Error processing successful payment:', error)
      return NextResponse.json(
        { error: 'Error processing successful payment' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}