import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" ref={ref} className="w-full relative overflow-hidden pt-24 pb-0">
      {/* Content grid */}
      <div className="px-8 flex items-start gap-16 mb-12">
        {/* Left: CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2
            className="text-white font-black leading-none mb-10"
            style={{ fontSize: 'clamp(36px, 6vw, 90px)', letterSpacing: '-0.03em' }}
          >
            Ready to builld<br />
            something better?
            <span style={{ color: '#C8FF00' }}>.</span>
          </h2>

          <a
            href="mailto:workwithmovement@gmail.com"
            className="inline-flex items-center gap-4 border border-white/20 rounded-full px-6 py-3 text-xs font-bold tracking-widest text-white hover:border-[#C8FF00] hover:text-[#C8FF00] transition-all duration-300 group"
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
          className="flex gap-24 pt-2"
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

      {/* Big Movement wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.15 }}
        className="overflow-hidden"
      >
        <h2
          className="font-black leading-none select-none"
          style={{
            fontSize: 'clamp(80px, 15vw, 240px)',
            letterSpacing: '-0.03em',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            background: 'linear-gradient(to bottom, rgba(50, 90, 5, 0.8) 0%, rgba(20, 40, 2, 0.4) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            paddingLeft: '0.02em',
          }}
        >
          Movement
        </h2>
      </motion.div>
    </section>
  )
}
