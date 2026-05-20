import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// --- IMPORT SVG ANDA DI SINI ---
import footerWordmark from '../assets/dark-headline.svg' 

export default function Footer() {
  // Ref untuk memicu teks CTA dan Info Kontak di atas
  const sectionRef = useRef(null)
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-60px' })

  // Ref khusus untuk memicu SVG Wordmark di bawah
  const wordmarkRef = useRef(null)
  // 'amount: 0.3' memastikan animasi baru berjalan saat 30% area gambar sudah terlihat di layar
  const isWordmarkInView = useInView(wordmarkRef, { once: true, amount: 0.3 })

  return (
    <section id="contact" ref={sectionRef} className="w-full relative overflow-hidden pt-24 pb-0 bg-[#0a0a0a]">
      
      {/* Content grid */}
      <div className="px-16 flex flex-col md:flex-row items-start justify-between gap-12 md:gap-16 mb-16 md:mb-24">
        
        {/* Left: CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2
            className="text-white font-black leading-none mb-10 tracking-tighter"
            style={{ fontSize: 'clamp(36px, 6vw, 90px)' }}
          >
            Ready to build<br />
            something better?
            <span style={{ color: '#C8F04E' }}>.</span>
          </h2>

          <a
            href="mailto:workwithmovement@gmail.com"
            className="inline-flex items-center group overflow-hidden rounded-md"
          >
            <div className="bg-[#1c1c1c] text-white/90 font-mono text-xs font-semibold tracking-widest px-6 py-3 transition-colors group-hover:bg-[#252525]">
              GET IN TOUCH
            </div>
            <div className="bg-[#C8F04E] text-black px-4 py-3 transition-colors group-hover:bg-[#d4ff33] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </motion.div>

        {/* Right: Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex gap-16 md:gap-24 pt-2"
        >
          {/* Social links */}
          <div className="flex flex-col gap-4">
            {['FIVERR', 'INSTAGRAM'].map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-white/60 text-xs font-semibold tracking-widest hover:text-[#C8F04E] transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-white/60 text-xs font-semibold tracking-widest">BANDUNG, INDONESIA</p>
            <div className="h-2" />
            <p className="font-mono text-white/60 text-xs font-semibold tracking-widest">+62 851-6261-3933</p>
            <p className="font-mono text-white/60 text-xs font-semibold tracking-widest">WORKWITHMOVEMENT@GMAIL.COM</p>
          </div>
        </motion.div>
      </div>

      {/* --- BIG MOVEMENT WORDMARK (SVG FULL WIDTH) --- */}
      {/* Container ini sekarang memiliki Ref tersendiri (wordmarkRef) */}
      <div ref={wordmarkRef} className="w-full overflow-hidden block">
        <motion.img 
          initial={{ y: "100%" }}
          // Sekarang kita menggunakan isWordmarkInView sebagai trigger
          animate={isWordmarkInView ? { y: 0 } : {}}
          // Delay saya ubah menjadi 0 agar saat terlihat langsung merespon dengan cepat
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          src={footerWordmark} 
          alt="Movement Wordmark" 
          className="w-full h-auto block select-none pointer-events-none" 
        />
      </div>
      
    </section>
  )
}