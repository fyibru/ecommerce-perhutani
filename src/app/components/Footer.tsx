export default function Footer() {
  return (
    <div className="bg-gray-900 ">
    <footer className=" text-gray-300 px-4 pt-16 pb-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo dan Deskripsi */}
        <div className="sm:col-span-2">
          <div className="flex items-center">
            <img 
              src="/images/kph.png" 
              alt="Logo Perhutani" 
              className="w-30 h-15"
            />
            <span className="ml-2 text-xl font-bold tracking-wide text-white uppercase">
              Perhutani
            </span>
          </div>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm">
              Perusahaan Umum Kehutanan Negara atau biasa disingkat menjadi Perum Perhutani, 
              adalah sebuah badan usaha milik negara Indonesia yang bergerak di bidang kehutanan.
            </p>
          </div>
        </div>

        {/* Kontak */}
        <div className="space-y-2 text-sm">
          <h3 className="text-base font-bold tracking-wide text-white">Kontak</h3>
          <div className="flex items-start">
            <span className="mr-2">📞</span>
            <a 
              href="tel:812-3281-5497" 
              className="hover:text-emerald-400 transition-colors"
            >
              (62) 812-3281-5497
            </a>
          </div>
          <div className="flex items-start">
            <span className="mr-2">✉️</span>
            <a 
              href="mailto:yansarprajtr@gmail.com" 
              className="hover:text-emerald-400 transition-colors"
            >
              yansarprajtr@gmail.com
            </a>
          </div>
          <div className="flex items-start">
            <span className="mr-2">📍</span>
            <a 
              href="https://maps.app.goo.gl/JC5oGYCEjAqVsHYu5" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors hover:underline"
            >
              Jl. Raya Barat No.17, Klangon, Wotsogo, Kec. Jatirogo, Kabupaten Tuban, Jawa Timur 62362
            </a>
          </div>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-base font-bold tracking-wide text-white">Sosial Media</h3>
          <div className="flex items-center mt-4 space-x-4">
            <SocialIcon 
              href="https://x.com/PerumPerhutani" 
              icon={
                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
              }
              label="Twitter"
            />
            
            <SocialIcon 
              href="https://www.instagram.com/perumperhutani/" 
              icon={
                <>
                  <circle cx="15" cy="15" r="4" />
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10 C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                </>
              }
              label="Instagram"
            />
            
            <SocialIcon 
              href="https://www.facebook.com/perumperhutani" 
              icon={
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              }
              label="Facebook"
            />
          </div>
          <p className="mt-4 text-sm">
            Ikuti Sosial Media kami
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-5 border-t border-gray-800">
        <p className="text-sm text-center">
          Sarpra ,IT & Pengembangan Opset
        </p>
      </div>
    </footer>
    </div>
  )
}

// Komponen Icon Sosial Media yang bisa dipakai ulang
function SocialIcon({ href, icon, label }: { 
  href: string, 
  icon: React.ReactNode, 
  label: string 
}) {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-400 hover:text-white transition-colors"
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="h-5 w-5"
      >
        {icon}
      </svg>
    </a>
  )
}