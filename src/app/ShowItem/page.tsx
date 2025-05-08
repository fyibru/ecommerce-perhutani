'use client'
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductPage() {
  const searchParams = useSearchParams();

  const judul = searchParams.get("judul") || "";
  const harga = searchParams.get("harga");
  const pembuat = searchParams.get("pembuat") || "";
  const whatsApp = searchParams.get("whatsapp") || "";
  const deskripsi = searchParams.get("deskripsi") || "";

  const hargaNumber = harga ? parseInt(harga) : 0;

  const [quantity, setQuantity] = useState(1);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const total = formatRupiah(hargaNumber * quantity);

  return (

    <div className="min-h-screen bg-white px-4">
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-emerald-700">KPH Jatirogo</h1>

          {/* Search Form */}
          <form className="w-full p-2 md:w-6/12 mx-auto">
            <label htmlFor="sidebar-search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="sidebar-search"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Cari produk..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2 bottom-1.5 bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-3 py-1"
              >
                Cari
              </button>
            </div>
          </form>

          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden text-emerald-700"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="hidden md:block text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
              type="button"
              aria-label="User menu"
            >
              <img className="w-8 h-8 rounded-full" src="/images/Sengon.jpg" alt="User profile" />
            </button>

            {/* Dropdown Menu */}
            <div
              className="hidden md:hidden absolute right-0 z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md"
            >
              <div className="px-4 py-3 text-sm text-gray-900">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                </li>
                <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                </li>
                <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Earnings</Link>
                </li>
              </ul>
              <div className="py-2">
                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
          <Image
            src="/images/Sengon.jpg" // Make sure to add this image in your public folder
            alt="Wok Ramen"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {judul}
            </h1>
            <p className="font-bold text-black">{pembuat}</p>


            {/* Quantity Table */}
            <div className="my-4">
              <table className="w-full text-left border border-black rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-black">
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
                        className="w-20 p-2 border rounded text-black border-b-gray-700"
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
          </div>
          {/* Description */}
          <div className="mt-7">
            <h2 className="text-lg font-semibold mb-1 text-black">Description</h2>
            <p className="text-gray-700 text-sm">
              {deskripsi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}