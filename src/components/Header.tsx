'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/cart'

export default function Header({ onCartClick }: { onCartClick: () => void }) {
  const getCount = useCartStore(state => state.getCount)
  const count = getCount()
  
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl">
          Aesthetic Lighting
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#products" className="text-primary-600 hover:text-primary-900">
            Shop
          </Link>
          <Link href="/about" className="text-primary-600 hover:text-primary-900">
            About
          </Link>
        </nav>
        
        <button 
          onClick={onCartClick}
          className="relative p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a8 8 0 00-16 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}