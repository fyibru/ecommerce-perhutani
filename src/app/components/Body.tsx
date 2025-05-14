export default function Body() {
    return (
      <div className="h-min bg-white">
        {/* Title Section */}
        <div className="flex w-full h-5/12 items-center justify-center">
          <h1 className="font-bold text-3xl md:text-5xl pt-26 text-black">Kualitas produk kami</h1>
        </div>
  
        {/* Cards Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 justify-items-center">
          {/* Card 1 */}
          <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 hover:rounded-lg">
              <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-emerald-500 transition-all duration-300 group-hover:scale-[13]" />
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-500 transition-all duration-300 group-hover:bg-emerald-400">
                  <img src={'/images/quality-supervision-svgrepo-com.svg'} className="h-10 w-10 text-white transition-all"/>
                </span>
  
                <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <p>
                  Kami dengan bangga mempersembahkan produk-produk berkualitas tinggi yang melalui proses seleksi ketat. Setiap material dipilih dengan cermat dan diproses dengan teknologi terkini untuk memastikan daya tahan, keindahan, dan fungsionalitas yang optimal. Komitmen kami terhadap kualitas didukung dengan garansi kepuasan pelanggan.
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Card 2 */}
          <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
              <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-emerald-500 transition-all duration-300 group-hover:scale-[13]" />
  
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-500 transition-all duration-300 group-hover:bg-emerald-400">
                  <img src={'/images/wallet-svgrepo-com.svg'} className="h-10 w-10 text-white transition-all"/>
                </span>
  
                <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <p>
                  Sebagai produsen langsung dengan jaringan supplier terpercaya, kami mampu menawarkan struktur harga 20-30% lebih kompetitif dibandingkan pasar tradisional. Sistem manajemen material just-in-time dan produksi berbasis teknologi memungkinkan penghematan biaya operasional yang signifikan, tanpa mengurangi kualitas material kayu kelas premium yang kami gunakan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
              <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-emerald-500 transition-all duration-300 group-hover:scale-[13]" />
  
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-500 transition-all duration-300 group-hover:bg-emerald-400">
                  <img src={'/images/label-svgrepo-com.svg'} className="h-10 w-10 text-white transition-all"/>
                </span>
  
                <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <p>
                    Kami memiliki kapasitas persediaan produk dalam volume besar dengan ketersediaan stok yang terjamin, didukung oleh sistem manajemen rantai pasok terintegrasi yang memungkinkan pemenuhan permintaan dalam berbagai skala pembelian
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }