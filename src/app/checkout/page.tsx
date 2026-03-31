'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cart'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'AU',
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // In production: call Stripe checkout
      // For now: simulate order creation
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total: getTotal(),
          shippingAddress: form,
        }),
      })
      
      if (response.ok) {
        clearCart()
        alert('Order placed successfully! (Demo mode)')
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary-600 mb-4">Your cart is empty</p>
          <a href="/" className="btn-primary">Continue Shopping</a>
        </div>
      </div>
    )
  }
  
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                required
                className="input"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input 
                type="text" 
                required
                className="input"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input 
                type="text" 
                required
                className="input"
                value={form.address}
                onChange={e => setForm({...form, address: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input 
                  type="text" 
                  required
                  className="input"
                  value={form.city}
                  onChange={e => setForm({...form, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <input 
                  type="text" 
                  required
                  className="input"
                  value={form.state}
                  onChange={e => setForm({...form, state: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">ZIP Code</label>
                <input 
                  type="text" 
                  required
                  className="input"
                  value={form.zip}
                  onChange={e => setForm({...form, zip: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <select 
                  className="input"
                  value={form.country}
                  onChange={e => setForm({...form, country: e.target.value})}
                >
                  <option value="AU">Australia</option>
                  <option value="SG">Singapore</option>
                  <option value="US">United States</option>
                </select>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Processing...' : `Pay $${getTotal().toFixed(2)}`}
            </button>
          </form>
          
          {/* Order Summary */}
          <div className="bg-primary-50 p-6 rounded-xl h-fit">
            <h2 className="font-serif text-xl mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between font-medium">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}