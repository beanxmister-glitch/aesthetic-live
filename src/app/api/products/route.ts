import { NextResponse } from 'next/server'

// GET /api/products - List all products
export async function GET() {
  return NextResponse.json([])
}

// POST /api/products - Create product (admin only)
export async function POST(request: Request) {
  return NextResponse.json({ error: 'Not implemented in static mode' }, { status: 501 })
}