import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTAQuote() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Green diagonal glow - matches the design */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 80% 80% at 60% 40%, rgba(30, 80, 5, 0.8) 0%, transparent 65%),
              radial-gradient(ellipse 40% 50% at 70% 30%, rgba(50, 110, 5, 0.5) 0%, transparent 55%)
            `,
            transform: 'rotate(-20deg) scale(1.3)',
          }}
        />
        {/* Dark corners */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, #080808 85%)' }} />
      </div>

      <motion.div
        className="relative z-10 text-center px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="font-semibold leading-snug"
          style={{ fontSize: 'clamp(22px, 3.5vw, 48px)' }}
        >
          <span className="text-white">Your website is more than a digital presence.</span>
          <br />
          <span className="text-white">It is how people see, trust, a</span>
          <span className="text-white/35">nd remember your brand.</span>
        </p>
      </motion.div>
    </section>
  )
}
