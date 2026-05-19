import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

export default function WhoWeAre() {
  const containerRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Mengambil progress scroll khusus untuk area penjelas ini
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })

  // Kalimat utuh sesuai dengan desain gambar Anda
  const paragraphText = 
    "Movement Studio was built to help businesses move faster in the digital era. We believe a website should do more than simply look good — it should strengthen credibility, improve user experience, and support business growth."

  // Memecah teks menjadi deretan kata agar transisi warna per kata terasa halus saat di-scroll
  const words = paragraphText.split(" ")

  return (
    <section 
      id="about" 
      className="w-full bg-[#080808] px-6 md:px-16 py-20 md:py-32 flex flex-col items-start"
    >
      {/* --- BADGE --- */}
      <div className="mb-8">
        <span
          className="font-mono px-3 py-1 text-[11px] font-bold tracking-widest text-black uppercase rounded-[3px]"
          style={{ backgroundColor: '#C8FF00' }}
        >
          Who We Are
        </span>
      </div>

      {/* --- DESCRIPTION WITH SCROLL REVEAL ANIMATION --- */}
      <div ref={containerRef} className="w-full mb-16 md:mb-24 max-w-6xl">
        <p 
          className="font-sans font-medium leading-[1.3] text-left tracking-tight flex flex-wrap"
          style={{ fontSize: 'clamp(22px, 3.5vw, 42px)' }}
        >
          {words.map((word, index) => {
            // Menghitung jangkauan scroll mask untuk setiap kata secara proporsional
            const start = index / words.length
            const end = start + (1 / words.length)
            
            // Mengubah opacity kata dari 25% (redup) menjadi 100% (putih bersih) saat di-scroll
            const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1])

            return (
              <motion.span 
                key={index} 
                style={{ opacity }}
                className="text-white mr-[0.22em] inline-block select-none"
              >
                {word}
              </motion.span>
            )
          })}
        </p>
      </div>

      {/* --- VIDEO PLACEHOLDER --- */}
      <div 
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer group bg-[#0D0D0D] border border-white/5 shadow-2xl"
        style={{ aspectRatio: '16/9' }}
        onClick={() => setPlaying(!playing)}
      >
        {!playing ? (
          <>
            {/* Efek gradasi cahaya hijau samar di balik tombol play */}
            <div
              className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
              style={{ background: 'radial-gradient(circle 400px at 50% 50%, rgba(200, 255, 0, 0.04), transparent)' }}
            />

            {/* Tombol Play Sesuai Desain (Kotak dengan border putih tipis & segitiga di tengah) */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-14 h-14 border border-white/40 rounded-md flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:border-[#C8FF00] group-hover:scale-105 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-[#C8FF00] transition-colors duration-300 ml-0.5">
                  <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Thumbnail Poster Kustom (Bisa Anda ganti jalurnya ke file gambar Anda jika ada) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </>
        ) : (
          /* Elemen video asli yang aktif saat placeholder diklik */
          <div className="absolute inset-0 w-full h-full bg-black">
            <video 
              src="YOUR_VIDEO_URL_HERE.mp4" // <--- Ganti dengan path file video Anda di sini
              className="w-full h-full object-cover"
              controls
              autoPlay
            />
          </div>
        )}
      </div>

    </section>
  )
}