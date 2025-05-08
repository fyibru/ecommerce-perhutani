import { UserData } from "@/app/ShopMenu/page"
import ProductPage from "../../ShowItem/page"
import ShowItem from "../../ShowItem/page"
import Link from "next/link"


export default function CategoryItem({itemName}: {itemName: UserData[]}) {
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        }).format(amount);
      };
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-5">
            {itemName.map((it, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                    <a href="#">
                        <img
                            src={it.imageUrl}
                            alt={""}
                            className="w-full h-36 object-cover"
                        />
                    </a>
                    <div className="p-3">
                        <h5 className="text-sm font-semibold text-gray-800 truncate">{it.judul}</h5>
                        <p className="text-xs text-gray-500 mb-2 truncate">
                            {it.deskripsi || "Deskripsi belum tersedia"}
                        </p>
                        <p className="text-emerald-600 font-bold text-sm mb-2">{formatRupiah(it.harga)}</p>
                        <Link href={`/ShowItem?judul=${it.judul}&harga=${it.harga}&deskripsi=${it.deskripsi}&whatsApp=${it.whatsApp}`}>
                        <button className="w-full text-sm bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-md">
                            Lihat
                        </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}