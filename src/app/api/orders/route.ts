import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// POST /api/orders - Create order with inventory management
export async function POST(request: Request) {
  const session = await getServerSession() // Add auth check
  
  try {
    const body = await request.json()
    const { items, shippingAddress } = body

    // Use transaction to prevent overselling
    const order = await prisma.$transaction(async (tx) => {
      // Check and decrement stock for each item
      for (const item of items) {
        const product = await tx.product.findUnique({ 
          where: { id: item.productId }
        })
        
        if (!product || product.stockQuantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product?.name || item.productId}`)
        }
        
        await tx.product.update({
          where: { id: item.productId },
          data: { 
            stockQuantity: product.stockQuantity - item.quantity,
            status: product.stockQuantity - item.quantity === 0 
              ? 'out_of_stock' 
              : 'active'
          }
        })
      }

      // Create order
      return tx.order.create({
        data: {
          userId: body.userId || null,
          total: body.total,
          items: JSON.stringify(items),
          shippingAddress: JSON.stringify(shippingAddress),
          status: 'pending',
        }
      })
    })

    return NextResponse.json(order)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// GET /api/orders - List orders (admin)
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}