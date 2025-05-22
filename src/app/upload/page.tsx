'use client';

import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function UploadBarang() {
    const router = useRouter();
    const [pembuat, setPembuat] = useState('')
    const [stok, setStok] = useState('')
    const [judul, setJudul] = useState('');
    const [whatsApp, setWhatsApp] = useState('')
    const [harga, setHarga] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [kategori, setKategori] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    const [isRumah, setIsRumah] = useState('')
    const [otherPreview, setOtherPreview] = useState<string[] | null>(null);
    const [OtherImage, setOtherImage] = useState<File[]>([]);
    const [limit, setLimit] = useState(0)

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!image) {
            alert('Silakan pilih gambar terlebih dahulu!');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'ai_preset'); // pastikan ini benar

            const res = await fetch('https://api.cloudinary.com/v1_1/ddxpdgmuf/image/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (!res.ok || !data.secure_url) {
                throw new Error('Gagal upload ke Cloudinary: ' + JSON.stringify(data));
            }

            const imageUrl = data.secure_url;

            // other image
            var otherImageUrls: string[] = [];
            for (const file of OtherImage) {
                formData.append('file', file);
                formData.append('upload_preset', 'ai_preset');
                const res = await fetch('https://api.cloudinary.com/v1_1/ddxpdgmuf/image/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (!res.ok || !data.secure_url) {
                    throw new Error('Gagal upload ke Cloudinary: ' + JSON.stringify(data));
                }

                const result = data.secure_url;
                otherImageUrls.push(result);
            }

            await addDoc(collection(db, 'produk'), {
                pembuat,
                judul,
                stok,
                whatsApp,
                harga: parseInt(harga),
                kategori,
                deskripsi,
                imageUrl,
                otherImageUrls,
                uid: auth.currentUser?.uid || 'anon',
                createdAt: new Date(),
            });

            alert('Produk berhasil diupload!');
            router.push('/ShopMenu')
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan saat upload produk.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (kategori == "rumah") {
            setIsRumah("Rumah tidak memiliki unit!")
        } else {
            setIsRumah("1")
        }

        console.log(otherPreview?.length)
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleOtherImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (!file) return;

        const fileArray = Array.from(file);
        setOtherImage((prev) => [...prev, ...fileArray]);

        const readers = fileArray.map((files) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(files);
            });
        });

        Promise.all(readers)
            .then((results) => setOtherPreview((prev) => [...(prev || []), ...results]))
            .catch((err) => console.error(err));

        console.log(otherPreview);
    }

    const handleRemoveImage = (index: number) => {
        setOtherPreview(prev => {
            // Pastikan prev tidak null
            if (!prev) return [];
            return prev.filter((_, i) => i !== index);
        });

        setOtherImage(prev => {
            // Type guard untuk otherImage
            if (!prev) return [];
            return prev.filter((_, i) => i !== index);
        });

        setLimit(setOtherPreview?.length)
    };


    if (!loading) return LoadingSpinner();
    return (
        <div className="max-w-2xl mx-auto px-4 py-8 text-white">
            <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>

            <form
                className="bg-white shadow-md rounded-2xl p-6 space-y-5 text-black"
            >
                <div>
                    <label className="block font-medium mb-1">Atas nama</label>
                    <input
                        type="text"
                        value={pembuat}
                        onChange={(e) => setPembuat(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                        placeholder="Contoh: Pak John"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Nama Produk</label>
                    <input
                        type="text"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                        placeholder="Contoh: Kayu Jati"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Kategori</label>
                    <select
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                        required
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="benih">Bibit</option>
                        <option value="kayu">Kayu</option>
                        <option value="olahan">Olahan alam</option>
                        <option value="rumah">Rumah Sewa</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">Harga (Rp)</label>
                    <input
                        type="number"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                        placeholder="120000"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Stok</label>
                    <input
                        type="number"
                        value={stok}
                        onChange={
                            (e) => setStok(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                        placeholder={isRumah}
                        required
                        disabled={kategori == "rumah"}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Nomor HP (Whatsapp)</label>
                    <div className='flex gap-2'>
                        <div className='border border-gray-300 rounded-xl px-4 py-2 focus:outline-none'>
                            +62
                        </div>
                        <input
                            type="text"
                            value={whatsApp}
                            onChange={(e) => setWhatsApp(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                            placeholder="812456789"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">Deskripsi</label>
                    <textarea
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                        rows={3}
                        placeholder="Masukkan detail produk seperti ukuran, bahan, dll"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Foto Produk</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-3 h-48 object-contain rounded-lg border"
                        />
                    )}
                </div>

                <div>
                    <label className="block font-medium mb-1">Foto Produk lainnya. Max: 5 (<span>
                        {(otherPreview?.length || 0)}
                    </span>)</label>
                    <input
                        type="file"
                        disabled={(otherPreview?.length || 0) >= 5}
                        multiple
                        accept="image/*"
                        onChange={handleOtherImageChange}
                        className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                    <div className='grid grid-cols-2 w-full gap-3'>
                        {otherPreview?.map((idx, id) => (
                            <div className='relative'>
                                <img
                                    key={id}
                                    src={idx}
                                    alt={`preview ${id}`}
                                    className="mt-3 h-48 object-contain rounded-lg border"
                                />
                                <button onClick={() =>
                                    handleRemoveImage(id)
                                } className='absolute right-0 bottom-0'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className={"w-8 h8 p-2 bg-red-500 rounded-full"}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>


                <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-lg transition"
                    onClick={handleUpload}
                >
                    Upload Produk
                </button>
            </form>
        </div>
    );
}


export const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 font-medium">Memuat...</p>
    </div>
  </div>
);

const optimizeImageUrl = (originalUrl: string, width: number = 800) => {
  // Jika URL sudah mengandung parameter optimasi
  if (originalUrl.includes('q_auto') || originalUrl.includes('width=')) {
    return originalUrl;
  }

  // Firebase Storage URL pattern
  if (originalUrl.includes('firebasestorage.googleapis.com')) {
    const url = new URL(originalUrl);
    url.searchParams.set('alt', 'media');
    url.searchParams.set('q', 'auto');
    url.searchParams.set('width', width.toString());
    return url.toString();
  }

  // Cloudinary/Imgix URL pattern
  if (originalUrl.match(/cloudinary\.com|imgix\.net/)) {
    return originalUrl.replace(/(\.jpg|\.png)/, (match) => 
      `,q_auto,f_auto,w_${width}${match}`
    );
  }

  return originalUrl; // Fallback ke URL asli
};