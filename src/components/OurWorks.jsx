import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  { name: 'Nova Energy', tags: ['Energy', 'Startup'] },
  { name: 'Pulse Band', tags: ['Music', 'Event'] },
  { name: 'Hazen Pictures', tags: ['Film', 'Production'] },
  { name: 'Nejtrip', tags: ['Travel', 'App'] },
  { name: 'Hi.tcg', tags: ['Gaming', 'E-commerce'] },
  { name: 'Aurahome', tags: ['Interior', 'Property'] },
]

export default function OurWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="works" ref={ref} className="w-full px-8 py-24">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span
          className="px-4 py-1.5 text-xs font-bold tracking-widest text-black rounded"
          style={{ backgroundColor: '#C8FF00' }}
        >
          OUR WORKS
        </span>
      </motion.div>

      {/* Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-white font-bold mb-16"
        style={{ fontSize: 'clamp(22px, 3vw, 42px)' }}
      >
        Built for brands that want to stand out.
      </motion.h2>

      {/* Two-column layout */}
      <div className="flex gap-16 items-start">
        {/* Left: Image / mockup */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-[45%] rounded-2xl overflow-hidden"
          style={{ aspectRatio: '1/0.85', backgroundColor: '#141414', border: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}
        >
          {/* Mockup placeholder with subtle design */}
          <div className="w-full h-full relative flex items-end justify-center p-8"
            style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)' }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 70% 70% at 60% 40%, rgba(30, 60, 5, 0.3), transparent)' }}
            />
            {/* Simulated card mockup */}
            <div
              className="relative w-4/5 rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, #1e1e1e, #141414)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                transform: 'perspective(800px) rotateY(-8deg) rotateX(4deg)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#C8FF00', opacity: 0.8 }} />
                <div>
                  <div className="h-2 w-24 rounded-full bg-white/20 mb-1.5" />
                  <div className="h-1.5 w-16 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full rounded-full bg-white/10" />
                <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
                <div className="h-1.5 w-5/6 rounded-full bg-white/10" />
              </div>
              <p className="text-white/20 text-xs font-mono mt-4 tracking-widest">
                {projects[activeIndex]?.name ?? 'Nova Energy'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: Project list */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex flex-col gap-2 pt-2"
        >
          {projects.map((project, i) => (
            <motion.button
              key={project.name}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              onClick={() => setActiveIndex(i)}
              className="text-left font-bold transition-all duration-300 hover:translate-x-2"
              style={{
                fontSize: 'clamp(24px, 4vw, 56px)',
                color: i === activeIndex ? '#C8FF00' : i < activeIndex ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.35)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              {project.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
