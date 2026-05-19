import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// --- IMPORT SVG ANDA DI SINI ---
// Sesuaikan nama file 'footer-wordmark.svg' dengan nama asli file Anda di folder assets
import footerWordmark from '../assets/dark-headline.svg' 

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" ref={ref} className="w-full relative overflow-hidden pt-24 pb-0 bg-[#080808]">
      
      {/* Content grid */}
      <div className="px-6 md:px-12 flex flex-col md:flex-row items-start justify-between gap-12 md:gap-16 mb-16 md:mb-24">
        
        {/* Left: CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2
            className="text-white font-black leading-none mb-10 tracking-tighter"
            style={{ fontSize: 'clamp(36px, 6vw, 90px)' }}
          >
            Ready to build<br />
            something better?
            <span style={{ color: '#C8FF00' }}>.</span>
          </h2>

          <a
            href="mailto:workwithmovement@gmail.com"
            className="inline-flex items-center gap-4 border border-white/20 rounded-full pl-6 pr-2 py-2 text-xs font-bold tracking-widest text-white hover:border-[#C8FF00] hover:text-[#C8FF00] transition-all duration-300 group"
          >
            GET IN TOUCH
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold group-hover:scale-110 transition-transform duration-200"
              style={{ backgroundColor: '#C8FF00' }}
            >
              →
            </span>
          </a>
        </motion.div>

        {/* Right: Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex gap-16 md:gap-24 pt-2"
        >
          {/* Social links */}
          <div className="flex flex-col gap-4">
            {['FIVERR', 'INSTAGRAM'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/60 text-xs font-semibold tracking-widest hover:text-[#C8FF00] transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-4">
            <p className="text-white/60 text-xs font-semibold tracking-widest">BANDUNG, INDONESIA</p>
            <div className="h-2" />
            <p className="text-white/60 text-xs font-semibold tracking-widest">+62 851-6261-3933</p>
            <p className="text-white/60 text-xs font-semibold tracking-widest">WORKWITHMOVEMENT@GMAIL.COM</p>
          </div>
        </motion.div>
      </div>

      {/* --- BIG MOVEMENT WORDMARK (SVG FULL WIDTH) --- */}
      {/* Container diatur w-full tanpa padding horizontal agar SVG bisa menempel rapat ke ujung tepi kanan-kiri layar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.15 }}
        className="w-full overflow-hidden block"
      >
        <img 
          src={footerWordmark} 
          alt="Movement Wordmark" 
          className="w-full h-auto block select-none pointer-events-none" 
        />
      </motion.div>
      
    </section>
  )
}
