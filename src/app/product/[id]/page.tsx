import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Mock product data (replace with database query)
const products = [
  { 
    id: '1', 
    name: 'Geometric Layered Lamp', 
    price: 89, 
    compareAtPrice: 129,
    description: 'A stunning geometric lamp with layered acrylic plates that create a warm, ambient glow. Perfect for modern living spaces.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f712a?w=800',
    category: 'table-lamps',
    stock: 15
  },
  { 
    id: '2', 
    name: 'Minimalist Floor Lamp', 
    price: 149, 
    compareAtPrice: 199,
    description: 'Sleek minimalist design with adjustable arm. Provides focused task lighting with elegant simplicity.',
    image: 'https://images.unsplash.com/photo-1540932239986-301840bb5e8b?w=800',
    category: 'floor-lamps',
    stock: 8
  },
  { 
    id: '3', 
    name: 'Ambient Table Lamp', 
    price: 59, 
    compareAtPrice: 79,
    description: ' Compact ambient lighting with soft warm glow. Ideal for bedside tables and cozy corners.',
    image: 'https://images.unsplash.com/photo-1513506003901-6e6ab2a9f417?w=800',
    category: 'table-lamps',
    stock: 23
  },
]

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id)
  
  if (!product) return notFound()
  
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/#products" className="text-primary-600 hover:text-primary-900 mb-8 inline-block">
          ← Back to Shop
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-primary-100">
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.stock <= 5 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                Only {product.stock} left!
              </div>
            )}
          </div>
          
          {/* Details */}
          <div>
            <p className="text-primary-500 mb-2">{product.category}</p>
            <h1 className="font-serif text-4xl mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl">${product.price}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-primary-400 line-through">
                  ${product.compareAtPrice}
                </span>
              )}
            </div>
            
            <p className="text-primary-600 mb-8">{product.description}</p>
            
            {/* Stock */}
            <div className="mb-8">
              {product.stock > 0 ? (
                <p className="text-green-600">
                  ✓ In stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-red-500">✕ Out of stock</p>
              )}
            </div>
            
            {/* Add to Cart Form */}
            <form action="/api/cart" method="POST" className="space-y-4">
              <input type="hidden" name="productId" value={product.id} />
              
              <div className="flex gap-4">
                <button 
                  type="submit"
                  disabled={product.stock === 0}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </form>
            
            {/* Features */}
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl mb-2">🚚</div>
                <p className="text-sm text-primary-600">Free Shipping</p>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">↩️</div>
                <p className="text-sm text-primary-600">30-Day Returns</p>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">🔒</div>
                <p className="text-sm text-primary-600">Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}