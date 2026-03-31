'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import CartSidebar from '@/components/CartSidebar'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null // Prevent hydration mismatch for cart
  
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-primary-50 text-primary-900 min-h-screen">
        <Header onCartClick={() => setCartOpen(true)} />
        {children}
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </body>
    </html>
  )
}