'use client'

import { useState } from 'react'

// Admin Dashboard - Protected route
const mockProducts = [
  { id: '1', name: 'Geometric Layered Lamp', price: 89, stock: 15, status: 'active' },
  { id: '2', name: 'Minimalist Floor Lamp', price: 149, stock: 8, status: 'active' },
  { id: '3', name: 'Ambient Table Lamp', price: 59, stock: 23, status: 'active' },
]

const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 89, status: 'paid', date: '2026-03-28' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 148, status: 'shipped', date: '2026-03-27' },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState<'products' | 'orders' | 'inventory'>('products')
  const [products, setProducts] = useState(mockProducts)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Add product form
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', stock: '', description: ''
  })
  
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-xl">Admin Dashboard</h1>
          <a href="/" className="text-primary-600 hover:text-primary-900 text-sm">
            View Store →
          </a>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {(['products', 'orders', 'inventory'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg ${
                tab === t 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white text-primary-600 hover:bg-primary-50'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Products Tab */}
        {tab === 'products' && (
          <div className="space-y-6">
            {/* Add Product Form */}
            <div className="bg-white p-6 rounded-xl">
              <h2 className="font-medium mb-4">Add New Product</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <input 
                  placeholder="Product name"
                  className="input"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
                <input 
                  placeholder="Price"
                  type="number"
                  className="input"
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                />
                <input 
                  placeholder="Stock"
                  type="number"
                  className="input"
                  value={newProduct.stock}
                  onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                />
                <button className="btn-primary">
                  Add Product
                </button>
              </div>
            </div>
            
            {/* Products List */}
            <div className="bg-white rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Price</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-t">
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">${product.price}</td>
                      <td className="p-4">
                        <span className={product.stock < 5 ? 'text-red-500 font-medium' : ''}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-primary-600 hover:text-primary-900 mr-4">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Orders Tab */}
        {tab === 'orders' && (
          <div className="bg-white rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary-50">
                <tr>
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Total</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map(order => (
                  <tr key={order.id} className="border-t">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">${order.total}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'paid' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Inventory Tab */}
        {tab === 'inventory' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-primary-500 text-sm mb-2">Total Products</h3>
              <p className="text-3xl font-serif">{products.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-primary-500 text-sm mb-2">Low Stock Alerts</h3>
              <p className="text-3xl font-serif text-red-500">
                {products.filter(p => p.stock < 5).length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-primary-500 text-sm mb-2">Total Orders</h3>
              <p className="text-3xl font-serif">{mockOrders.length}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}