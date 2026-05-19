import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

// 1. Array Proyek (Tambahkan properti 'image' dengan placeholder atau URL gambar Anda)
const projects = [
  { name: 'Nova Energy', tags: ['Energy', 'Startup'], image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Pulse Band', tags: ['Music', 'Event'], image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Hazen Pictures', tags: ['Film', 'Production'], image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Nejtrip', tags: ['Travel', 'App'], image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Hi.tcg', tags: ['Gaming', 'E-commerce'], image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Aurahome', tags: ['Interior', 'Property'], image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop' },
]

export default function OurWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="works" ref={ref} className="w-full bg-[#080808] px-6 md:px-16 py-24 font-sans">
      <div className="max-w-[1200px] mx-2">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span
              className="font-mono px-3 py-1.5 text-[11px] font-bold tracking-[0.15em] text-black uppercase rounded-[3px]"
              style={{ backgroundColor: '#C8FF00' }}
            >
              Our Works
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white font-medium tracking-tight"
            style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
          >
            Built for brands that want to stand out.
          </motion.h2>
        </div>

        {/* --- CONTENT SECTION --- */}
        {/* Menggunakan gap-[120px] sesuai permintaan */}
        <div className="flex flex-col xl:flex-row items-start gap-12 xl:gap-[120px]">
          
          {/* LEFT: Dynamic Image (572x572) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            // Mengatur ukuran absolut 572px, namun tetap responsif di layar kecil (w-full max-w-...)
            className="w-full max-w-[572px] aspect-square rounded-[20px] overflow-hidden relative shrink-0 border border-white/10"
            style={{ backgroundColor: '#141414' }}
          >
            <motion.img
              key={activeIndex} // Kunci untuk memicu animasi saat index berubah
              src={projects[activeIndex].image}
              alt={projects[activeIndex].name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* RIGHT: Project List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col justify-start"
          >
            {projects.map((project, i) => (
              <button
                key={project.name}
                onMouseEnter={() => setActiveIndex(i)} // Mengubah gambar saat di-hover
                onClick={() => setActiveIndex(i)} // Fallback untuk mobile/tablet
                className="text-left font-medium transition-colors duration-300 block"
                style={{
                  fontSize: 'clamp(36px, 4vw, 56px)', // Ukuran font besar menyesuaikan desain
                  color: i === activeIndex ? '#C8FF00' : '#8A8A8A', // Hijau saat aktif, abu-abu saat pasif
                  letterSpacing: '-0.03em',
                  lineHeight: '1.2',
                }}
              >
                {project.name}
              </button>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}