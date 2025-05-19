"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";

type Product = {
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

export default function CategoryItem({ search }: { search?: string | string[] }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "produk"));
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredProducts = products.filter((product) => {
    if (!search) return true;

    const searchTerms = Array.isArray(search)
      ? search.map((term) => term.toLowerCase())
      : [search.toLowerCase()];

    console.log(searchTerms);

    return searchTerms.some(
      (term) =>
        product.judul.toLowerCase().includes(term) ||
        product.kategori.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
            <div className="bg-gray-200 h-40 w-full" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-8 bg-gray-200 rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Image
          src="/images/no-results.svg"
          alt="No products found"
          width={200}
          height={200}
          className="opacity-70"
        />
        <p className="mt-4 text-gray-500 text-lg">
          {search ? "No matching products found" : "No products available"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-emerald-100"
        >
          <Link href={`/ShowItem?id=${product.id}`} scroll={false}>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.imageUrl || "/images/product-placeholder.jpg"}
                alt={product.judul}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={false}
              />
            </div>
          </Link>

          <div className="p-3 space-y-1">
            <Link href={`/ShowItem?id=${product.id}`} scroll={false}>
              <h3 className="font-medium text-gray-900 line-clamp-1 hover:text-emerald-600 transition-colors">
                {product.judul}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 line-clamp-2">
              {product.deskripsi || "No description available"}
            </p>
            <p className="text-emerald-600 font-semibold mt-1">
              {formatPrice(product.harga)}
            </p>
            <div className="flex items-center justify-between mt-2">
              {product.kategori !== "rumah" &&
                <span className="text-xs text-gray-400">
                  Stock: {product.stok}
                </span>
              }
              {product.kategori === "rumah" &&
                <span className="text-xs text-gray-400">
                  Rumah sewa
                </span>
              }
              <Link
                href={`/ShowItem?id=${product.id}`}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                scroll={false}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}