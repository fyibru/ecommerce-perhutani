'use client'
import Link from "next/link";
import Image from "next/image"
import { useEffect } from "react";

export default function Navbar(){
    useEffect(() => {
            const button = document.querySelector('.mobile-menu-button');
            const menu = document.querySelector('.mobile-menu');
    
            button?.addEventListener('click', () => {
                menu?.classList.toggle('hidden');
            })
        }, []);
    return(
      <>
        <nav className="bg-white shadow-sm relative top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Image 
                className="p-6"
                src="/images/kph.png" 
                alt="Logo"
                width={120}
                height={50}
                priority
            />
              <Link href="/" className="text-xl text-black">
                Ecommerce
              </Link>
            </div>
  
            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="underline text-emerald-400 hover:underline hover:text-emerald-400">
                Beranda
              </Link>
              <Link href="/services" className="text-black hover:underline hover:text-emerald-400">
                Services
              </Link>
              <Link href="/contact" className="text-black hover:underline hover:text-emerald-400">
                Contact
              </Link>
            </div>
            
        <div className="md:flex hidden items-center">
            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 h-10 rounded-full">Masuk</button>
            <div className="pr-2"></div>
            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 h-10 rounded-full">Daftar</button>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button className="mobile-menu-button">
                <svg className="w-6 h-6 text-black" fill="" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu (Toggle) */}
        <div className="md:hidden mobile-menu hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/about" className="block px-3 py-2 text-black hover:bg-emerald-500">
              About
            </Link>
            <Link href="/services" className="block px-3 py-2 text-black hover:bg-emerald-500">
              Services
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-black hover:bg-emerald-500">
              Contact
            </Link>
            <div className="flex">
            <button className="md:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 rounded-full">Masuk</button>
            <div className="pr-2"></div>
            <button className="md:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 rounded-full">Daftar</button>
            </div>
          </div>
        </div>
      </nav>
      </>
    )
}