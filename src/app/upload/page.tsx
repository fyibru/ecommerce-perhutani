'use client';

import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useState } from 'react';

export default function UploadBarang() {
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
      
          await addDoc(collection(db, 'produk'), {
            pembuat,
            judul,
            stok,
            whatsApp,
            harga: parseInt(harga),
            kategori,
            deskripsi,
            imageUrl,
            uid: auth.currentUser?.uid || 'anon',
            createdAt: new Date(),
          });
      
          alert('Produk berhasil diupload!');
        } catch (err) {
          console.error(err);
          alert('Terjadi kesalahan saat upload produk.');
        } finally {
          setLoading(false);
        }
      };
        

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file); // ✅ penting!
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Produk "${judul}" berhasil disiapkan untuk di-upload.`);
        // Simpan ke backend bisa ditambahkan di sini
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 text-white">
            <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>

            <form
                onSubmit={handleSubmit}
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
                        onChange={(e) => setStok(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                        placeholder="29"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Nomor HP (Whatsapp)</label>
                    <input
                        type="text"
                        value={whatsApp}
                        onChange={(e) => setWhatsApp(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                        placeholder="0812456789"
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
                        <option value="bibit">Bibit</option>
                        <option value="kayu">Kayu</option>
                        <option value="olahan">Olahan alam</option>
                        <option value="rumah">Rumah Sewa</option>
                    </select>
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
