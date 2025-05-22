'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

type ProductWithId = {
  id: string
  judul: string
  stok: number
  kategori: string
  deskripsi?: string
  harga: number
  imageUrl: string
  otherImageUrls: string[]
  pembuat?: string
  whatsApp?: string
}

export default function ProductContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [product, setProduct] = useState<ProductWithId | null>(null)
  const [imgUrl, setImgUrl] = useState<[]>([])
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduk = async () => {
      if (!id) return
      const docRef = doc(db, 'produk', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data();

        setProduct({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ProductWithId, 'id'>),
          otherImageUrls: data.otherImageUrls,
        })
        console.log(docSnap, "=>", docSnap.data());
        setImgUrl(data.otherImageUrls)
      }
    }

    fetchProduk()
  }, [id])

  const handleQuantity = (value: number) => {
    if (value >= 1) setQuantity(value)
  }

  if (!product) {
    return <div className="p-10 text-center text-gray-500">Memuat produk...</div>
  }

  const total = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.harga * quantity)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl grid md:grid-cols-2 gap-10 p-6 md:p-10">
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

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.judul}</h1>
            <p className="text-gray-600 text-sm mb-2">by {product.pembuat}</p>
            {/* Bagian yang diperbaiki untuk menampilkan gambar tambahan */}
            {imgUrl?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-gray-700 text-lg font-semibold mb-3 md:mb-4">Gambar Lainnya</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {imgUrl.map((dataUrl, id) => (
                    <div
                      key={id}
                      className="aspect-square relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Link href={dataUrl}>
                        <Image
                          src={dataUrl}
                          alt={`Gambar produk ${id + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-200"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          quality={85}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                      if (!isNaN(value)) {
                        setQuantity(Math.min(value, product.stok))
                      }
                    }}
                    className="w-full text-center text-black outline-none"
                    min={1}
                    max={product.stok}
                  />
                  <button
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-800 text-lg text-white"
                    onClick={() => {
                      if (quantity < product.stok) handleQuantity(quantity + 1)
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-xl font-bold text-lime-600">Total: {total}</div>

              {product.kategori !== 'rumah' && (
                <div className="text-sm text-gray-500">
                  Stok: <span className="font-medium">{product.stok}</span>
                </div>
              )}

              {product.whatsApp && (
                <p className="text-sm text-gray-500">
                  WhatsApp:{' '}
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

          <div className="sticky bottom-4 mt-10">
            <Link
              onClick={() => {
                const pesan = product.kategori === 'rumah'
                  ? `${product.pembuat}, Saya ingin menyewa properti ${product.judul} dengan harga RP ${product.harga.toLocaleString('id-ID')}. Apakah ini masih tersedia?`
                  : `${product.pembuat}, Saya ingin membeli produk ${product.judul} sejumlah ${quantity} dengan total harga RP ${(product.harga * quantity).toLocaleString('id-ID')}`

                const message = encodeURIComponent(pesan)
                window.open(`https://wa.me/62${product.whatsApp}?text=${message}`, '_blank')
              }}
              href="#"
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
