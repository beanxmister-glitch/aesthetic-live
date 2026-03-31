import { NextResponse } from 'next/server'

// POST /api/orders - Create order with inventory management
export async function POST(request: Request) {
  return NextResponse.json({ id: 'mock-order-id', status: 'pending' })
}

// GET /api/orders - List orders (admin)
export async function GET() {
  return NextResponse.json([])
}