import Image from 'next/image'
import Link from 'next/link'

const products = [
  { 
    id: '1', 
    name: 'Geometric Layered Lamp', 
    price: 89, 
    compareAtPrice: 129,
    description: 'A stunning geometric lamp with layered acrylic plates that create a warm, ambient glow.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f712a?w=800',
    category: 'Table Lamps'
  },
  { 
    id: '2', 
    name: 'Minimalist Floor Lamp', 
    price: 149, 
    compareAtPrice: 199,
    description: 'Sleek minimalist design with adjustable arm. Provides focused task lighting.',
    image: 'https://images.unsplash.com/photo-1540932239986-301840bb5e8b?w=800',
    category: 'Floor Lamps'
  },
  { 
    id: '3', 
    name: 'Ambient Table Lamp', 
    price: 59, 
    compareAtPrice: 79,
    description: 'Compact ambient lighting with soft warm glow. Ideal for bedside tables.',
    image: 'https://images.unsplash.com/photo-1513506003901-6e6ab2a9f417?w=800',
    category: 'Table Lamps'
  },
  { 
    id: '4', 
    name: 'Asymmetrical Art Pendant', 
    price: 219, 
    compareAtPrice: 289,
    description: 'Architectural lighting that doubles as modern art. Features brushed brass and frosted glass.',
    image: 'https://images.unsplash.com/photo-1517992993132-836750371077?w=800',
    category: 'Pendant Lights'
  },
  { 
    id: '5', 
    name: 'Soft Curve Wall Sconce', 
    price: 129, 
    compareAtPrice: 169,
    description: 'Rounded edges and irregular surfaces create a residential, approachable luxury feel.',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800',
    category: 'Wall Lighting'
  },
  { 
    id: '6', 
    name: 'Nordic Linear Chandelier', 
    price: 349, 
    compareAtPrice: 499,
    description: 'Sophisticated linear design offering perfectly diffused light for dining spaces.',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800',
    category: 'Chandeliers'
  },
]

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-5xl text-[#4A3B35] mb-12 text-center">Our Collection</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#E6DCCF]">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-[#7A6A63] mb-2">{product.category}</p>
                <h2 className="font-serif text-xl text-[#4A3B35] mb-2">{product.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-[#4A3B35]">${product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-[#7A6A63] line-through">${product.compareAtPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
