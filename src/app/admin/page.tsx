'use client'
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Admin(){
    const router = useRouter()
      useEffect(() => {
        if (!auth.currentUser)
            router.push('/admin/login')
      }, [])
    return(
        <>
        <h1 className="text-white">Hai, ini hanya admin page biasa, lanjutkan untuk masuk</h1>
        </>
    );
}