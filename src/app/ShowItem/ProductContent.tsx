'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { it } from 'node:test'

type ProductWithId = {
  id: string
  judul: string
  stok: number
  kategori: string
  deskripsi?: string
  harga: number
  imageUrl: string
  pembuat?: string
  whatsApp?: string
}

export default function ProductContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [product, setProduct] = useState<ProductWithId | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!id) return
    const fetchProduct = async () => {
      const ref = doc(db, 'produk', id)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() } as ProductWithId)
      } else {
        console.warn('Produk tidak ditemukan')
      }
    }
    fetchProduct()
  }, [id])

  const handleQuantity = (value: number) => {
    if (value >= 1) setQuantity(value)
  }

  const total = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format((product?.harga || 0) * quantity)

  if (!product) return <div className="p-10 text-center text-gray-500">Memuat produk...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl grid md:grid-cols-2 gap-10 p-6 md:p-10">
        {/* Gambar Produk */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.judul}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Detail Produk */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.judul}</h1>
            <p className="text-gray-600 text-sm mb-2">by {product.pembuat}</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">Quantity</span>
                <div className="flex items-center border rounded-lg overflow-hidden w-32">
                  <button
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-800 text-lg text-white"
                    onClick={() => handleQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                        const value = parseInt(e.target.value)
                        const stokVal = product.stok
                        if (!isNaN(value)){
                            if (value <= stokVal){
                                setQuantity(value)
                            } else {
                                setQuantity(stokVal)
                            }
                        }
                    }}
                    className="w-full text-center text-black outline-none"
                    min={1}
                    max={product.stok}
                  />
                  <button
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-800 text-lg text-white"
                    onClick={() => {if (quantity < product.stok) handleQuantity(quantity + 1)}}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-xl font-bold text-lime-600">Total: {total}</div>

              <div className="text-sm text-gray-500">
                Stok: <span className="font-medium">{product.stok}</span>
              </div>

              {product.whatsApp && (
                <p className="text-sm text-gray-500">
                  WhatsApp:{" "}
                  <Link
                    href={`https://wa.me/${product.whatsApp}`}
                    target="_blank"
                    className="text-lime-600 hover:underline"
                  >
                    {product.whatsApp}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{product.deskripsi}</p>
            </div>
          </div>

          {/* Tombol Sticky */}
          <div className="sticky bottom-4 mt-10">
            <Link
            onClick={() =>{
              const whatsappMessage = `Saya tertarik membeli produk ${product.judul} dengan harga ${product.harga}.`;

                const message = encodeURIComponent(whatsappMessage);
                const phoneNumber = `https://wa.me/${product.whatsApp}?text=${message}`;
                window.open(phoneNumber, "_blank");
            }}
            href={"#"}
              target="_blank"
              className="block text-center bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 rounded-xl transition"
            >
              Beli Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
