import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import bgImage from '../assets/bg-image.png'
import headlineHero from '../assets/headline-hero.svg'

export default function Hero() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM'
      setTime(`${h}:${m}:${s} ${ampm}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden flex flex-col bg-[#080808] px-6 md:px-12 pb-6 pt-32 font-sans">

      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#080808]/90" />

      {/* Fallback Green Glow (Opsional) */}
      <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vh] bg-[#C8FF00] opacity-[0.08] blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      {/* --- MAIN CONTENT (Tengah) --- */}
      {/* Wrapper ini (flex-1 & justify-center) akan otomatis meletakkan konten tepat di tengah layar vertikal */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full">
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto items-center">

          {/* Left Column: Clock & Agency Label */}
          <div className="w-full md:w-1/2 flex flex-col gap-10 md:gap-14">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-mono text-[13px] text-white/70 tracking-[0.15em]"
            >
              {time}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="font-mono text-[11px] text-white/60 tracking-widest uppercase leading-loose">
                WEB DEVELOPMENT AGENCY —<br />
                BASED IN BANDUNG, INDONESIA
              </p>
            </motion.div>
          </div>

          {/* Right Column: Description */}
          <motion.div
            className="w-full md:w-1/2 flex items-center mt-12 md:mt-0 md:pl-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
          >
            <p className="text-xl md:text-[22px] font-medium leading-[1.4] max-w-xl text-white">
              <span className="text-[#a3a3a3]">Movement studio</span>
              {' '}helps startups, modern businesses,{' '}
              and creative brands build high-performance websites with{' '}
              <span className="text-[#a3a3a3]">premium</span>
              {' '}visuals and scalable user experiences.
            </p>
          </motion.div>

        </div>
      </div>

      {/* --- BOTTOM CONTENT (Headline Image) --- */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 -mx-6 md:-mx-12 mt-auto mb-4"
      >
        <img src={headlineHero} alt="Movement Headline" className="w-full h-auto block mx-4" />
      </motion.div>

    </section>
  )
}