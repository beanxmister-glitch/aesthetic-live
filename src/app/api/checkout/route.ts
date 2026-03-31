import Stripe from 'stripe'

// Initialize Stripe with secret key
// In production: use process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
})

// POST /api/checkout - Create Stripe checkout session
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, successUrl, cancelUrl } = body
    
    // Transform cart items to Stripe line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'aud',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }))
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || '/?success=true',
      cancel_url: cancelUrl || '/checkout',
      shipping_address_collection: {
        allowed_countries: ['AU', 'SG', 'US', 'GB'],
      },
    })
    
    return Response.json({ url: session.url })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// Webhook handler for payment events
export async function webhook(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig || '',
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
    
    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any
      
      // Update order status in database
      // In production: Update Prisma order status to 'paid'
      console.log('Payment completed:', session.id)
    }
    
    return Response.json({ received: true })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}