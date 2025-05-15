"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import axios from "axios";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!image) return alert("Pilih gambar terlebih dahulu");

    setUploading(true);

    try {
      // Upload ke Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ai_preset");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/ddxpdgmuf/image/upload",
        formData
      );

      const imageUrl = res.data.secure_url;

      // Simpan ke Firestore
      await addDoc(collection(db, "iklan"), {
        title,
        image: imageUrl,
        createdAt: new Date(),
      });

      setTitle("");
      setImage(null);
      alert("Iklan berhasil ditambahkan!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload iklan.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-emerald-700">Kelola Iklan</h1>
      <input
        type="text"
        placeholder="Judul iklan"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
      >
        {uploading ? "Mengunggah..." : "Upload Iklan"}
      </button>
    </div>
  );
}
