'use client'

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type ProductWithId = {
  id: string;
  judul: string;
  stok: number;
  kategori: string;
  deskripsi?: string;
  harga: number;
  imageUrl: string;
  pembuat?: string;
  whatsApp?: string;
};

export default function SearchCategoryItem() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const [products, setProducts] = useState<ProductWithId[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "produk"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductWithId[];
        setProducts(items);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchData();
  }, []);

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-5">
      {products.filter(() => (
        <div
          key={product.id}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          <Link href={`/ShowItem?id=${product.id}`}>
            <img
              src={product.imageUrl}
              alt={product.judul}
              className="w-full h-36 object-cover"
            />
          </Link>
          <div className="p-3">
            <h5 className="text-sm font-semibold text-gray-800 truncate">
              {product.judul}
            </h5>
            <p className="text-xs text-gray-500 mb-2 truncate">
              {product.deskripsi || "Deskripsi belum tersedia"}
            </p>
            <p className="text-emerald-600 font-bold text-sm mb-2">
              {formatRupiah(Number(product.harga))}
            </p>
            <Link href={`/ShowItem?id=${product.id}`}>
              <button className="w-full text-sm bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-md">
                Lihat
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
