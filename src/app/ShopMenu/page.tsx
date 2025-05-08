"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import  CategoryItem  from "../components/Shop/CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './carousel.css';

export type UserData = {
    createdAt: String,
    deskripsi: String,
    harga: String,
    imageUrl: String,
    judul: String,
    kategori: String,
    pembuat: String,
    uid: String,
    whatsApp: String,
}

export default function ShopMenu() {
    const router = useRouter()
    const user = auth.currentUser
    // State management
    const [countedChips, setCountedChips] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [users, setUsers] = useState<UserData[]>([])

    // Refs
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);


    const promos = [
        {
            title: "Kayu Jati",
            description: "Diskon spesial untuk semua kategori produk.",
            image: "/images/image.png",
        },
        {
            title: "Kayu Sengon",
            description: "Promo besar-besaran bulan ini.",
            image: "/images/Sengon.jpg",
        },
        {
            title: "Benih Unggul",
            description: "Beli 1 gratis 1 untuk benih pilihan.",
            image: "/images/image.png",
        },
    ];
    // Handle click outside dropdown
    useEffect(() => {
        if (!user){
            router.push("/Home")
        }


        const fetchUser = async () => {
            const querySnapshot = await getDocs(collection(db, "produk"));
            const usersData: UserData[] = []
            querySnapshot.forEach((doc) => {
                usersData.push(doc.data() as UserData)
                console.log(doc.id, "=>", doc.data)
            });
            setUsers(usersData)
        }
        fetchUser();
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        fetchUser();
    }, []);

    // Toggle dropdown
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
                    <form className="w-full p-2 md:w-6/12 mx-auto">
                        <label htmlFor="sidebar-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="sidebar-search"
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Cari produk..."
                                required
                            />
                            <button
                                type="submit"
                                className="text-white absolute right-2 bottom-1.5 bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-3 py-1"
                            >
                                Cari
                            </button>
                        </div>
                    </form>

                    {/* Mobile Sidebar Toggle */}
                    <button
                        className="md:hidden text-emerald-700"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        aria-label="Toggle sidebar"
                    >
                        ☰
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative flex pr-7">
                        <button
                            ref={buttonRef}
                            onClick={toggleDropdown}
                            className="hidden md:block text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                            type="button"
                            aria-label="User menu"
                            aria-expanded={isDropdownOpen}
                        >
                            <img className="w-8 h-8 rounded-full" src={`${user?.photoURL ? '/images/user.svg' : "url('/images/user.svg')"}`} alt="User profile" />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="hidden md:block absolute right-0 z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md"
                            >
                                <div className="px-4 py-3 text-sm text-gray-900">
                                    <div className="font-medium truncate">{user?.email}</div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700">
                                </ul>
                                <div className="py-2">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link href="/upload" className="ml-4">
                        <button className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition-all">
                            <img src="/images/upload.svg" className="w-9 h-5 md:w-5" alt="Upload" />
                            <span className="hidden sm:inline">Upload Produk</span>
                        </button>
                    </Link>
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

                    {/* Mobile Profile Dropdown */}
                    <div className="md:hidden mb-6 relative">
                        <button
                            onClick={toggleDropdown}
                            className="text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                            type="button"
                            aria-label="User menu"
                            aria-expanded={isDropdownOpen}
                        >
                            <img className="w-8 h-8 rounded-full" src="/images/Sengon.jpg" alt="User profile" />
                        </button>

                        {isDropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute left-0 z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md"
                            >
                                <div className="px-4 py-3 text-sm text-gray-900">
                                    <div>Bonnie Green</div>
                                    <div className="font-medium truncate">name@flowbite.com</div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Earnings</a>
                                    </li>
                                </ul>
                                <div className="py-2">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-black">Kategori</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            {["Kayu", "Olahan", "Benih", "Rumah sewa"].map((cat) => (
                                <label key={cat} className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-emerald-600" /> {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Rating</h3>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className="accent-emerald-600" /> ⭐ 4 ke atas
                        </label>
                    </div>

                    {/* Promo Banner */}
                    <div className="bg-emerald-100 p-4 rounded-lg text-center shadow-inner">
                        <h4 className="text-emerald-800 font-bold mb-2">Dapatkan Diskon 30%</h4>
                        <p className="text-sm text-gray-700 mb-3">Gunakan kode referral kamu dan hemat lebih banyak!</p>
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded">
                            Bagikan
                        </button>
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
                                            <div className="w-full md:w-1/2 flex justify-center">
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
                                                <button className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                                                    Belanja Sekarang
                                                </button>
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
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['Baru', 'Populer', 'Promo'].map((label, idx) => (
                            <button
                                key={label}
                                className={`rounded-full border border-slate-300 py-2 px-2.5 text-center text-sm transition-all shadow-sm ${countedChips === idx
                                    ? "bg-emerald-600 text-white border-emerald-600"
                                    : "bg-white text-black hover:bg-emerald-100"
                                    }`}
                                onClick={() => setCountedChips(idx)}
                            >
                                {label}
                            </button>
                        ))}
                        <div className="relative rounded-md flex bg-slate-800 py-0.5 pl-2.5 pr-8 border border-transparent text-sm text-white shadow-sm items-center">
                            Filter
                            <button
                                className="flex items-center justify-center transition-all p-1 rounded-md text-white hover:bg-white/10 absolute top-0.5 right-0.5"
                                type="button"
                                aria-label="Remove filter"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Product List */}
                    <h2 className="font-bold text-black text-3xl pt-5">Baru Dirilis</h2>
                    <CategoryItem itemName={users} />
                </main>
            </div>

        </div>
    );
}