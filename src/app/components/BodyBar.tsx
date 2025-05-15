'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, googleProvider } from '@/lib/firebase'
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { getAuth, getRedirectResult, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import firebase from 'firebase/compat/app';

export default function BodyBar() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [text, setText] = useState('Perhutani Ecommerce')
  const texts = ['Perhutani Ecommerce', 'Toko Perhutani']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) router.push('/ShopMenu')
    })

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
      setText(texts[(index + 1) % texts.length])
    }, 3000)

    return () => {
      unsub()
      clearInterval(interval)
    }
  }, [index])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/ShopMenu')
      console.log("Login sukses")
    } catch (err: any) {
      alert('Login gagal: ' + err.message)
    }
  }

const handleGoogleLogin = async () => {
  try {
    // Coba login dengan popup (desktop-friendly)
    await signInWithPopup(auth, googleProvider);
    console.log("Google login success");
  } catch (error: any) {
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
      // Jika popup gagal (misalnya di mobile browser), fallback ke redirect
      await signInWithRedirect(auth, googleProvider);
    } else {
      console.error("Google login failed:", error);
    }
  }
};

useEffect(() => {
  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        console.log("Google login berhasil", result.user);
        router.push('/ShopMenu');
      }
    } catch (err) {
      alert("Terjadi masalah saat redirect: " + err);
    }
  }
  handleRedirectResult();
}, [router]);


  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 bg-[url('/images/topography.svg')] bg-cover">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 w-full max-w-6xl bg-white/50 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-lg">
        
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-emerald-800 transition-all duration-500">
            {text}
          </h1>
          <p className="text-gray-700 text-base md:text-lg font-medium">
            Menyediakan berbagai jenis kayu dan produk unggulan lainnya
          </p>
        </div>

        {/* Login Form */}
        <div className="flex-1 w-full max-w-md bg-gray-900/80 rounded-xl p-6 md:p-8 text-white shadow-xl">
          <h2 className="text-center text-2xl font-bold mb-6">Selamat Datang!</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm mb-1 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring focus:ring-blue-500"
                placeholder="namakamu@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm mb-1 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 py-2 px-4 rounded-md font-semibold"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-500" />
            <span className="mx-3 text-gray-400 text-sm">atau</span>
            <div className="flex-grow border-t border-gray-500" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-white text-black rounded-md hover:bg-gray-100 transition font-semibold border"
          >
            <img
              src="/images/google-icon-logo-svgrepo-com.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login dengan Google
          </button>
        </div>
      </div>
    </div>
  )
}
