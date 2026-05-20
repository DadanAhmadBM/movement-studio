import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'

const projects = [
  { name: 'Nova Energy', tags: ['Energy', 'Startup'], image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Pulse Band', tags: ['Music', 'Event'], image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Hazen Pictures', tags: ['Film', 'Production'], image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Nejtrip', tags: ['Travel', 'App'], image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Hi.tcg', tags: ['Gaming', 'E-commerce'], image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Aurahome', tags: ['Interior', 'Property'], image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop' },
]

// --- KOMPONEN SLOT MACHINE TEXT DUAL-LAYER ---
const CasinoText = ({ text, isActive, isFaded }) => {
  return (
    <motion.span
      animate={{
        color: isActive ? "#C8F04E" : isFaded ? "rgba(255,255,255,0.25)" : "#FFFFFF",
      }}
      transition={{ duration: 0.3 }}
      // overflow-hidden menutupi huruf yang berada di luar area baris
      className="inline-flex overflow-hidden relative"
      style={{ verticalAlign: "bottom" }}
    >
      {text.split("").map((char, i) => (
        <span key={i} className="relative inline-block whitespace-pre">
          
          {/* LAPISAN 1: Huruf Asli (Terdorong ke atas dan hilang saat di-hover) */}
          <motion.span
            className="inline-block"
            animate={{
              y: isActive ? "-100%" : "0%",
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1], // Custom kurva agar terasa berat dan mekanis
              delay: i * 0.025, // Stagger (huruf bergulung satu per satu)
            }}
          >
            {char}
          </motion.span>
          
          {/* LAPISAN 2: Huruf Kloningan (Berada di bawah, lalu naik mengisi saat di-hover) */}
          <motion.span
            className="absolute left-0 top-0 inline-block text-[#C8F04E]"
            initial={{ y: "100%" }}
            animate={{
              y: isActive ? "0%" : "100%",
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.05,
            }}
          >
            {char}
          </motion.span>

        </span>
      ))}
    </motion.span>
  );
};

export default function OurWorks() {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  
  const [activeIndex, setActiveIndex] = useState(0) 
  const [hoveredIndex, setHoveredIndex] = useState(null) 

  // GSAP Glitch Blur Effect (Gambar Kiri)
  useEffect(() => {
    if (!imgRef.current) return

    const img = imgRef.current
    const tl = gsap.timeline()

    gsap.killTweensOf(img)

    tl.fromTo(img,
      { filter: 'blur(25px) brightness(1.5)', opacity: 0, scale: 1.15, skewX: 12, x: 20 },
      { filter: 'blur(0px) brightness(1)', opacity: 1, scale: 1, skewX: 0, x: 0, duration: 0.25, ease: 'power4.out' }
    )
    .to(img, { x: -8, skewX: -4, filter: 'blur(6px)', duration: 0.04 })
    .to(img, { x: 8, skewX: 4, filter: 'blur(3px)', duration: 0.04 })
    .to(img, { x: 0, skewX: 0, filter: 'blur(0px)', duration: 0.04 })

  }, [activeIndex])

  return (
    <section id="works" ref={ref} className="w-full bg-[#0a0a0a] px-16 py-24 font-sans">
      <div className="max-w-[1200px] mx-2">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span
              className="font-mono px-3 py-1.5 text-[11px] font-bold tracking-[0.15em] text-black uppercase rounded-[3px]"
              style={{ backgroundColor: '#C8F04E' }}
            >
              Our Works
            </span>
          </motion.div>

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
        <div className="flex flex-col xl:flex-row items-start gap-12 xl:gap-[120px]">
          
          {/* LEFT: Dynamic Image (572x572) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="w-full max-w-[572px] aspect-square rounded-[20px] overflow-hidden relative shrink-0 border border-white/10"
            style={{ backgroundColor: '#141414' }}
          >
            <img
              ref={imgRef}
              src={projects[activeIndex].image}
              alt={projects[activeIndex].name}
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
            {projects.map((project, i) => {
              const isActive = hoveredIndex === i;
              const isFaded = hoveredIndex !== null && hoveredIndex !== i;

              return (
                <button
                  key={project.name}
                  onMouseEnter={() => {
                    setHoveredIndex(i); 
                    setActiveIndex(i);  
                  }} 
                  onMouseLeave={() => setHoveredIndex(null)} 
                  className="text-left font-medium block mb-2"
                  style={{
                    fontSize: 'clamp(36px, 4vw, 56px)', 
                    letterSpacing: '-0.03em',
                    lineHeight: '1.3'
                  }}
                >
                  <CasinoText text={project.name} isActive={isActive} isFaded={isFaded} />
                </button>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  )
}