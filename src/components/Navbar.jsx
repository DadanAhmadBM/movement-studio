import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import logoImage from '../assets/logo-image.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 transition-all duration-300 ${
        scrolled ? 'py-4 bg-black/75 backdrop-blur-md' : 'py-8 bg-transparent'
      }`}
    >
      {/* Logo */}
      <a href="#home" className="flex items-center gap-3 cursor-pointer">
        <img src={logoImage} alt="Movement Logo" className="h-8 object-contain" />
      </a>

      {/* Nav Links */}
      <div className="flex items-center gap-14">
        {['HOME', 'ABOUT', 'SERVICES', 'WORKS'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[#cccccc] text-xs font-semibold tracking-widest hover:text-white transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Contact Button */}
      <a
        href="#contact"
        className="flex items-center group overflow-hidden rounded-md"
      >
        <div className="bg-[#1c1c1c] text-white/90 text-xs font-semibold tracking-widest px-6 py-3 transition-colors group-hover:bg-[#252525]">
          CONTACT
        </div>
        <div className="bg-[#C8FF00] text-black px-4 py-3 transition-colors group-hover:bg-[#d4ff33] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </a>
    </motion.nav>
  )
}
