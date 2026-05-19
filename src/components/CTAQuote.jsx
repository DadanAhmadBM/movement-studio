import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Ganti ekstensi atau nama file di bawah ini sesuai dengan nama gambar di folder assets Anda
import bgImage from '../assets/bg-image.png' 

export default function CTAQuote() {
  const containerRef = useRef(null)

  // Mengambil progress scroll untuk memicu animasi perubahan warna teks secara bertahap
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "center center"] 
  })

  // Memecah teks menjadi dua baris
  const line1 = "Your website is more than a digital presence.".split(" ")
  const line2 = "It is how people see, trust, and remember your brand.".split(" ")
  const totalWords = line1.length + line2.length

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* --- BACKGROUND IMAGE DENGAN OPACITY --- */}
      <div 
        // Tambahkan opacity-40 (atau opacity-30 / opacity-50) di sini untuk meredupkan gambar
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Overlay hitam tipis tambahan untuk memperhalus kontras (opsional) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#080808]/80" />

      {/* --- KONTEN TEKS & ANIMASI LOAD --- */}
      <motion.div
        className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="font-sans font-medium tracking-tight"
          style={{ fontSize: 'clamp(20px, 3.8vw, 52px)', lineHeight: '1.3' }}
        >
          {/* Render Baris Pertama */}
          <span className="block mb-2 md:mb-1">
            {line1.map((word, i) => {
              const start = i / totalWords
              const end = start + (1 / totalWords)
              const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1])

              return (
                <span key={`l1-${i}`}>
                  <motion.span style={{ opacity }} className="text-white inline">
                    {word}
                  </motion.span>
                  {i === line1.length - 1 ? '' : ' '}
                </span>
              )
            })}
          </span>

          {/* Render Baris Kedua */}
          <span className="block">
            {line2.map((word, i) => {
              const globalIndex = i + line1.length
              const start = globalIndex / totalWords
              const end = start + (1 / totalWords)
              const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1])

              return (
                <span key={`l2-${i}`}>
                  <motion.span style={{ opacity }} className="text-white inline">
                    {word}
                  </motion.span>
                  {i === line2.length - 1 ? '' : ' '}
                </span>
              )
            })}
          </span>
        </p>
      </motion.div>
    </section>
  )
}