import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function BodyBar() {
    const router = useRouter()
    const text1 = "Perhutani Ecommerce";
    const text2 = "Toko Perhutani";

    const [displayedText, setDisplayedText] = useState(text1.padEnd(text2.length).split(""));
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(true); // true = text1 ➝ text2, false = text2 ➝ text1

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user){
                router.push('/ShopMenu')
            }
        })
        const from = direction ? text1.padEnd(text2.length) : text2.padEnd(text1.length);
        const to = direction ? text2.padEnd(text1.length) : text1.padEnd(text2.length);
        const fromChars = from.split("");
        const toChars = to.split("");

        const interval = setInterval(() => {
            if (step >= toChars.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setStep(0);
                    setDirection(!direction);
                }, 1500); // jeda sebelum ganti arah
                return;
            }

            const next = [...displayedText];
            next[step] = toChars[step];
            setDisplayedText(next);
            setStep((prev) => prev + 1);
        }, 120); // kecepatan ganti huruf

        return () => clearInterval(interval);
    }, [step, direction]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password)
            router.push('/ShopMenu')
        } catch(error: any){
            alert('Login gagal' + error.message)
        }
    };

    return (
        <div className="bg-white w-full h-screen bg-[url('/images/topography.svg')] bg-cover bg-center flex items-center justify-center px-4">
            <div className="flex flex-col lg:flex-row items-center bg-emerald-300/20 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg gap-6 sm:gap-8 w-full max-w-md sm:max-w-2xl lg:max-w-5xl backdrop-blur-md">

                {/* Text section */}
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold text-emerald-800 tracking-wide">
                        {displayedText.map((char, idx) => (
                            <span key={idx} className="inline-block transition-all duration-200">
                                {char}
                            </span>
                        ))}
                    </h1>
                    <span className="block text-black font-semibold opacity-80 mt-4 text-base md:text-lg">
                        menyediakan berbagai jenis kayu dan berbagai produk lainnya
                    </span>
                </div>

                {/* Login form section */}
                <div className="flex-1 bg-gray-800/90 p-6 md:p-8 rounded-xl w-full max-w-md backdrop-blur-md">
                    <h1 className="text-white font-bold text-2xl pb-7 text-center">
                        Selamat Datang!
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                placeholder="namakamu@gmail.com"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                placeholder="•••••••••"
                                required
                            />
                        </div>
                        <div className="flex justify-between pb-2">
                            <div>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" className=""/>
                        <label htmlFor="vehicle1" className="pl-1 font-thin">Ingat saya</label>
                        </div>
                        <h1>Lupa sandi?</h1>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
                        >
                            Login
                        </button>
                    </form>

                    {/* Divider line */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-500"></div>
                        <span className="mx-4 text-gray-400 text-sm">atau</span>
                        <div className="flex-grow border-t border-gray-500"></div>
                    </div>

                    {/* Google & Email login buttons */}
                    <div className="space-y-4">
                        <button
                            type="button"
                            className="w-full bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-3 border border-gray-300"
                        >
                            <img
                                src="/images/google-icon-logo-svgrepo-com.svg"
                                className="w-6 h-6"
                            />
                            <span className="whitespace-nowrap font-normal">
                                Login dengan Google
                            </span>
                        </button>

                        <button
                            type="button"
                            className="w-full bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-3 border border-gray-300"
                        >
                            <img
                                src="/images/facebook-color-svgrepo-com.svg"
                                className="w-6 h-6"
                            />
                            <span className="whitespace-nowrap font-normal">
                                Login dengan Facebook
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
