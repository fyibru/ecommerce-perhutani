"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import CategoryItem from "../components/Shop/CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './carousel.css';

export type UserData = {
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

export default function ShopMenu() {
    const router = useRouter();
    const [pencarian, setPencarian] = useState('');
    const [category, setCategory] = useState('');
    const [countedChips, setCountedChips] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const [userProvider, setUserProvider] = useState('');
    const isDisabled = userProvider !== "password";

    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const promos = [
        { title: "Kayu", description: "Produk Kayu Olahan Terbaik", image: "/images/image.png" },
        { title: "Kayu Sengon", description: "Promo besar-besaran bulan ini.", image: "/images/Sengon.jpg" },
        { title: "Benih Unggul", description: "Beli 1 gratis 1 untuk benih pilihan.", image: "/images/image.png" },
    ];

    const label = [
        { title: "Rumah", image: "/images/house.svg" },
        { title: "Olahan", image: "/images/bee.svg" },
        { title: "Kayu", image: "/images/wood.svg" },
        { title: "Benih", image: "/images/seed.svg" }
    ];

    // Handle sign out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push("/Home");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    useEffect(() => {
        if (countedChips === 0) {
            setCategory('rumah');
        } else if (countedChips === 1) {
            setCategory('olahan');
        } else if (countedChips === 2) {
            setCategory('kayu');
        } else if (countedChips === 3) {
            setCategory('benih');
        }
    }, [countedChips]);

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            if (user){
                const providers = user.providerData.map((profile) => profile.providerId);
                setUserProvider(providers[0]);
            }else{
                setUserProvider('Anonymous');
            }
        });
        return ()  => unsubscribe();
    }, []);

    useEffect(() => {
        if (!auth.currentUser) {
            router.push("/Home");
        }

        const fetchUser = async () => {
            const querySnapshot = await getDocs(collection(db, "produk"));
            const usersData: UserData[] = [];
            querySnapshot.forEach((doc) => {
                usersData.push(doc.data() as UserData);
            });
            setUsers(usersData);

        };

        fetchUser();

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [router]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Navbar */}
            <header className="bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-emerald-700">KPH Jatirogo</h1>

                    {/* Search Form */}
                    <form className="w-2/5 p-2 md:w-full mx-auto">
                        <label htmlFor="sidebar-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                value={pencarian}
                                onChange={(e) => setPencarian(e.target.value)}
                                type="search"
                                id="sidebar-search"
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Cari produk..."
                                required
                            />
                        </div>
                    </form>

                    {/* Profile Dropdown */}
                    <div className="relative flex pr-4">
                        <button
                            ref={buttonRef}
                            onClick={toggleDropdown}
                            className="text-sm bg-white border border-gray-300 rounded-full p-1 focus:ring-2 focus:ring-emerald-500"
                            aria-label="User menu"
                            aria-expanded={isDropdownOpen}
                        >
                            <img
                                className="w-8 h-7 rounded-full"
                                src={auth.currentUser?.photoURL ?? "/images/user.svg"}
                                alt="User profile"
                            />
                        </button>

                        {/* Mobile Sidebar Toggle */}
                        <button
                            className="md:hidden text-emerald-700 pl-4"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            aria-label="Toggle sidebar"
                        >
                            ☰
                        </button>
                        {isDropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 mt-12 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-50"
                            >
                                <div className="px-4 py-3 text-sm text-gray-900">
                                    <div className="font-medium truncate">{auth.currentUser?.email}</div>
                                </div>
                                <div className="py-2">
                                    <button
                                        onClick={handleSignOut}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Overlay when sidebar is open on mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex flex-col md:flex-row gap-6 p-4">
                {/* Sidebar */}
                <aside
                    className={`fixed z-40 md:z-20 md:static inset-y-0 left-0 w-64 bg-white p-6 rounded-none md:rounded-lg shadow-md transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0 overflow-y-auto`}
                >
                    {/* Close button on mobile */}
                    <div className="md:hidden flex justify-end mb-4">
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-gray-600 text-xl"
                            aria-label="Close sidebar"
                        >
                            ✕
                        </button>
                    </div>

    <div className="relative bg-emerald-50 p-6 rounded-2xl text-center shadow-lg overflow-hidden">
      {/* Optional Overlay jika disabled */}
      {isDisabled && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 rounded-2xl flex items-center justify-center">
          <p className="text-emerald-900 font-semibold">Fitur upload hanya tersedia untuk akun @perhutani.com</p>
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
                </aside>

                {/* Main Content */}
                <main className="flex-1 container mx-auto px-4">
                    <section className="bg-emerald-100 py-10 px-4 rounded-lg mb-6">
                        <div className="max-w-4xl mx-auto swiper-container">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={30}
                                slidesPerView={1}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                                pagination={{
                                    clickable: true,
                                    el: '.swiper-pagination',
                                    type: 'bullets',
                                }}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false
                                }}
                                loop={true}
                                className="my-custom-swiper"
                            >
                                {promos.map((promo, idx) => (
                                    <SwiperSlide key={idx} className="swiper-slide-custom">
                                        <div className="flex flex-col md:flex-row items-center gap-6 h-full p-4">
                                            <div className="w-full md:w-2/2 flex justify-center">
                                                <img
                                                    src={promo.image}
                                                    alt={promo.title}
                                                    className="rounded-lg object-cover max-h-64 md:max-h-96 w-full"
                                                />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <h2 className="text-3xl font-bold text-emerald-800">Pilihan Terbaik</h2>
                                                <h3 className="text-2xl font-bold text-gray-700 mt-2">{promo.title}</h3>
                                                <p className="mt-2 text-gray-700">{promo.description}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                                {/* Custom Navigation */}
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-button-next"></div>
                                <div className="swiper-pagination"></div>
                            </Swiper>
                        </div>
                    </section>

                    {/* Filter Chips */}
                    <h1 className="text-emerald-900 font-bold text-2xl pt-6 text-start pb-12">
                        Kategori
                    </h1>

                    <div className="w-full flex justify-center">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-6 w-full max-w-7xl px-4">
                            {label.map((label, idx) => (
                                <div key={label.title} className="flex flex-col items-center">
                                    <button
                                        onClick={() => setCountedChips(idx)}
                                        className={`flex items-center justify-center w-full max-w-[100px] aspect-square p-4 border rounded-2xl cursor-pointer transition-all ${countedChips === idx
                                            ? "bg-emerald-200 text-white border-emerald-50"
                                            : "bg-white text-black border-emerald-100 hover:bg-emerald-100"
                                            }`}
                                    >
                                        <img
                                            src={label.image}
                                            alt={label.title}
                                            className="h-10 w-10 object-contain"
                                        />
                                    </button>
                                    <span className="mt-2 text-sm text-black text-center">{label.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product List */}
                    <h2 className="font-bold text-emerald-900 text-2xl pt-10 pb-7">Jelajahi</h2>
                    <CategoryItem search={`${pencarian || category}`} />
                </main>
            </div>
        </div>
        
    );
}


