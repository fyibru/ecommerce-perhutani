'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function ProductContent() {
  const searchParams = useSearchParams()
  const judul = searchParams.get('judul')
  const harga = searchParams.get('harga')
  const pembuat = searchParams.get('pembuat')
  const whatsApp = searchParams.get('whatsapp')
  const deskripsi = searchParams.get('deskripsi')

  const hargaNumber = harga ? parseInt(harga) : 0
  const [quantity, setQuantity] = useState(1)
  const total = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(hargaNumber * quantity)

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
        <Image src="/images/Sengon.jpg" alt="Product Image" layout="fill" objectFit="cover" />
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{judul}</h1>
        <p className="font-bold text-black">{pembuat}</p>

        <div className="my-4">
          <table className="w-full text-left border border-black rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-3">Quantity</th>
                <th className="p-3">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-20 p-2 border rounded text-black"
                  />
                </td>
                <td className="p-3 font-semibold text-black">{total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-xl font-semibold">
          Buy Now
        </button>
        <p className="text-sm text-gray-600 mt-2">Stok: 28 shop</p>
        <p className="text-sm text-gray-600">{whatsApp}</p>

        <div className="mt-7">
          <h2 className="text-lg font-semibold mb-1 text-black">Description</h2>
          <p className="text-gray-700 text-sm">{deskripsi}</p>
        </div>
      </div>
    </div>
  )
}
