/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // penting!
  images: {
    unoptimized: true, // karena next/image tidak didukung saat export
  },
}

module.exports = nextConfig