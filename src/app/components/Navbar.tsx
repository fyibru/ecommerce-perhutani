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
        <nav className="bg-transparent backdrop-blur-xs fixed top-0 w-full z-50">
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
          </div>
        </div>
      </nav>
      </>
    )
}