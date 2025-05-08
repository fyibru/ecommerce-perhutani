'use client'
import { useEffect } from "react";

export default function NavigationBar(){
    useEffect(() => {
        const button = document.querySelector('.mobile-menu-button');
        const menu = document.querySelector('.mobile-menu');

        button?.addEventListener('click', () => {
            menu?.classList.toggle('hidden');
        })
    }, [])
}
