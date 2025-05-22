'use client';

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    deleteDoc,
    where,
    onSnapshot,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

// Sidebar component
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                ></div>
            )}
            <aside
                className={`h-screen fixed top-0 left-0 w-64 bg-gray-100 shadow-lg z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-4 font-bold text-emerald-700 text-xl">
                    Menu
                </div>
                <nav className="p-4 space-y-2">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="/ShopMenu"
                                className="flex items-center p-2 text-emerald-900 rounded-lg hover:bg-emerald-200"
                            >
                                <svg
                                    className="w-5 h-5 text-emerald-700 transition duration-75 group-hover:text-emerald-900"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Halaman Utama</span>
                            </a>
                            <a href="/upload"
                                className="flex items-center p-2 text-emerald-900 rounded-lg hover:bg-emerald-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="w-5 h-5 text-emerald-700 transition duration-75 group-hover:text-emerald-900"
                                >
                                    <path d="M12 17V7" />
                                    <path d="M6 11l6-6 6 6" />

                                    <rect x="4" y="17" width="16" height="3" rx="1.5" />
                                </svg>

                                <span className="ms-3">Upload</span>
                            </a>
                        </li>
                        {/* Tambahkan item lainnya sesuai kebutuhan */}
                    </ul>
                </nav>
            </aside>
        </>
    );
}

type Produk = {
    id?: string;
    createdAt: string;
    deskripsi: string;
    harga: string;
    imageUrl: string;
    judul: string;
    kategori: string;
    stok: number;
    pembuat: string;
    uid: string;
    whatsApp: string;
};

export default function LihatProduk() {
    const [user, setUser] = useState<any>(null);
    const [produkList, setProdukList] = useState<Produk[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Produk | null>(null);
    const [form, setForm] = useState<Partial<Produk>>({});
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const q = query(collection(db, "produk"), where("uid", "==", user.uid));
                const unsubscribeProduk = onSnapshot(q, (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as Produk[];
                    setProdukList(data);
                    setLoading(false);
                });
                return () => unsubscribeProduk();
            } else {
                setUser(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleEdit = (produk: Produk) => {
        setEditing(produk);
        setForm({
            judul: produk.judul,
            deskripsi: produk.deskripsi,
            harga: produk.harga,
            stok: produk.stok,
            kategori: produk.kategori,
        });
    };

    const handleDelete = async (item: Produk) => {
        const docref = doc(db, "produk", item.id || "");
        await deleteDoc(docref);
    };

    const handleSave = async () => {
        if (!editing?.id) return;
        const docRef = doc(db, "produk", editing.id);
        await updateDoc(docRef, {
            ...form,
            harga: form.harga || "0",
            stok: form.stok || 0,
        });
        setProdukList((prev) =>
            prev.map((item) => (item.id === editing.id ? { ...item, ...form } as Produk : item))
        );
        setEditing(null);
    };

    if (loading)
        return <div className="p-6 text-center text-gray-500">Loading...</div>;

    if (!user)
        return (
            <div className="p-6 text-center text-red-600 font-semibold">
                Anda belum login.
            </div>
        );

    return (
        <div className="flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 bg-gray-50">
                {/* Header mobile */}
                <div className="lg:hidden p-4 shadow bg-white flex items-center justify-between">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-lg font-semibold text-emerald-700">Produk</h1>
                    <div className="w-6 h-6" />
                </div>

                <div className="p-6 h-screen">
                    <h1 className="text-3xl font-bold text-emerald-700 mb-6 hidden lg:block">Produk Kamu</h1>
                    {produkList.length === 0 ? (
                        <p className="text-gray-500 text-center">Belum ada produk yang diupload.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {produkList.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group h-auto"
                                >
                                    <div className="relative w-full h-48 bg-gray-100">
                                        <Image
                                            src={item.imageUrl || "/images/no-image.png"}
                                            alt={item.judul}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                                            {item.judul}
                                        </h2>
                                        <p className="text-sm text-gray-500">Kategori: {item.kategori}</p>
                                        <p className="text-sm text-gray-500 line-clamp-2">{item.deskripsi}</p>
                                        <p className="text-emerald-700 font-bold">
                                            Rp {parseInt(item.harga).toLocaleString("id-ID")}
                                        </p>
                                        {item.kategori && item.kategori !== "rumah" && (
                                            <p className="text-xs text-gray-400">Stok: {item.stok}</p>
                                        )
                                        }
                                        <div className="flex justify-between items-center text-sm mt-3">
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Hapus
                                            </button>
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-emerald-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Modal Edit Produk */}
                {editing && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl space-y-4 text-black">
                            <h2 className="text-xl font-semibold text-gray-800">Edit Produk</h2>
                            <h4>Nama Produk</h4>
                            <input
                                type="text"
                                placeholder="Nama Produk"
                                className="w-full border rounded p-2"
                                value={form.judul || ""}
                                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                            />
                            <h4>Deskripsi</h4>
                            <textarea
                                placeholder="Deskripsi"
                                className="w-full border rounded p-2"
                                value={form.deskripsi || ""}
                                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                            />
                            <h4>Harga</h4>
                            <input
                                type="number"
                                placeholder="Harga"
                                className="w-full border rounded p-2"
                                value={form.harga || ""}
                                onChange={(e) => setForm({ ...form, harga: e.target.value })}
                            />
                            <h4>Quantity</h4>
                            <input
                                type="number"
                                placeholder="Stok"
                                className="w-full border rounded p-2"
                                value={form.stok?.toString() || ""}
                                onChange={(e) => setForm({ ...form, stok: parseInt(e.target.value) })}
                                disabled={form.kategori == "rumah"}
                            />
                            <h4>Kategory</h4>
                            <select
                                value={form.kategori}
                                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                                className="w-full border border-gray-800 rounded px-4 py-2 focus:outline-none text-black"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="benih">Bibit</option>
                                <option value="kayu">Kayu</option>
                                <option value="olahan">Olahan alam</option>
                                <option value="rumah">Rumah Sewa</option>
                            </select>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    onClick={() => setEditing(null)}
                                    className="px-4 py-2 rounded border text-gray-600"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
