import Link from "next/link";
import userProvider from '@/app/ShopMenu/page'
const PromoBanner = ({ userProvider }) => {
  const isDisabled = userProvider !== "password"; // misalnya hanya password yang boleh upload

  return (
    <div className="relative bg-emerald-50 p-6 rounded-2xl text-center shadow-lg overflow-hidden">
      {/* Optional Overlay jika disabled */}
      {isDisabled && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 rounded-2xl flex items-center justify-center">
          <p className="text-emerald-900 font-semibold">Fitur upload hanya tersedia untuk akun Email</p>
        </div>
      )}

      <h4 className="text-emerald-800 font-bold text-lg mb-2">Kelola Produk Kamu</h4>
      <p className="text-sm text-gray-700 mb-4">Kenalkan barang-barangmu kepada seluruh orang!</p>

      <Link href="/upload" className="block">
        <button
          disabled={isDisabled}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl shadow-md hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Lihat Produk</span>
        </button>
      </Link>

      <Link href="/upload" className="block mt-4">
        <button
          disabled={isDisabled}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl shadow-md hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src="/images/upload.svg" className="w-5 h-5" alt="Upload" />
          <span>Upload Produk</span>
        </button>
      </Link>
    </div>
  );
};
