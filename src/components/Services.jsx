import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const services = [
  {
    title: 'Landing Page',
    description: 'High-converting landing pages designed to capture attention, communicate value clearly, and drive action.',
  },
  {
    title: 'Business Website',
    description: 'Professional business websites that strengthen credibility and create a modern online presence.',
  },
  {
    title: 'Custom Website',
    description: 'Fully customized web solutions built around your business needs and more features.',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="services" ref={ref} className="w-full py-24">
      {/* Top bar: badge + heading */}
      <div className="flex items-start gap-12 px-8 mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span
            className="font-mono px-4 py-1.5 text-xs font-bold tracking-widest text-black rounded whitespace-nowrap"
            style={{ backgroundColor: '#C8FF00' }}
          >
            OUR SERVICES
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white font-semibold leading-tight"
          style={{ fontSize: 'clamp(18px, 2.5vw, 34px)', maxWidth: 600 }}
        >
          Everything you need to build a stronger digital presence.
        </motion.p>
      </div>

      {/* Service rows */}
      <div className="mt-12">
        {services.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
            onClick={() => setActiveIndex(i)}
            className="cursor-pointer border-t transition-colors duration-300"
            style={{
              borderColor: activeIndex === i ? 'rgba(200,255,0,0.2)' : 'rgba(255,255,255,0.07)',
              backgroundColor: activeIndex === i ? '#ffffff' : 'transparent',
            }}
          >
            <div className="flex items-center px-8 py-8 gap-8">
              {/* Service name */}
              <div className="flex-1">
                <h3
                  className="font-bold leading-none transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(28px, 4.5vw, 64px)',
                    color: activeIndex === i ? '#000000' : 'rgba(255,255,255,0.25)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {svc.title}
                </h3>
              </div>

              {/* Description (only for active) */}
              <div className="w-72">
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-black/70 leading-relaxed"
                    >
                      {svc.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Plus button (only for active) */}
              <div className="ml-auto">
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-24 h-24 rounded-2xl flex items-center justify-center text-black text-5xl font-thin"
                      style={{ backgroundColor: '#C8FF00' }}
                    >
                      +
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
      </div>
    </section>
  )
}
