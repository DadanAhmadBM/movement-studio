import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function WhoWeAre() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [playing, setPlaying] = useState(false)

  return (
    <section id="about" ref={ref} className="w-full px-8 py-24">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span
          className="px-4 py-1.5 text-xs font-bold tracking-widest text-black rounded"
          style={{ backgroundColor: '#C8FF00' }}
        >
          WHO WE ARE
        </span>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="font-semibold leading-tight mb-16 max-w-5xl"
        style={{ fontSize: 'clamp(20px, 3vw, 40px)' }}
      >
        <span className="text-white">
          Movement Studio was built to help businesses move faster in the digital era. We believe a
          website should do more than simply look go
        </span>
        <span className="text-white/30">
          od — it should strengthen credibility, improve user experience, and support business growth.
        </span>
      </motion.p>

      {/* Video Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
        style={{ aspectRatio: '16/7', backgroundColor: '#0f0f0f', border: '1px solid rgba(255,255,255,0.06)' }}
        onClick={() => setPlaying(!playing)}
      >
        {/* Subtle inner glow */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(60, 130, 10, 0.4), transparent)' }}
        />

        {/* Play button */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-14 h-14 border border-white/30 flex items-center justify-center group-hover:border-[#C8FF00] transition-colors duration-300"
              style={{ clipPath: 'none' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="white" className="ml-1 group-hover:fill-[#C8FF00] transition-colors duration-300">
                <polygon points="2,1 16,9 2,17" />
              </svg>
            </div>
          </div>
        )}

        {playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/40 text-sm font-mono tracking-widest">VIDEO PLAYING...</p>
          </div>
        )}
      </motion.div>
    </section>
  )
}
