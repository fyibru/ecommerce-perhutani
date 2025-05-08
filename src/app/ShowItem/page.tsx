import { Suspense } from 'react'
import ProductContent from './ProductContent'

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white px-4">
      <header className="bg-white shadow-md sticky top-0 z-40">
        {/* header content kamu tetap di sini... */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-emerald-700">KPH Jatirogo</h1>
        </div>
      </header>

      <Suspense fallback={<div className="text-center py-10">Loading product...</div>}>
        <ProductContent />
      </Suspense>
    </div>
  )
}
