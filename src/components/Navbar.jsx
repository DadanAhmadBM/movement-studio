import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logoImage from "../assets/logo-image.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // DIUBAH: z-50 diganti menjadi z-[9999] agar berada paling depan
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        scrolled ? "bg-[#0A0A0A]/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className={`flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${scrolled ? "py-4" : "py-6 md:py-8"}`}>
      {/* Logo */}
      <a href="#home" className="flex items-center gap-3 cursor-pointer">
        <img
          src={logoImage}
          alt="Movement Logo"
          className="h-8 object-contain"
        />
      </a>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-12 lg:gap-24">
        {["HOME", "ABOUT", "SERVICES", "WORKS"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[#cccccc] font-mono font-medium tracking-widest hover:text-white transition-colors duration-200"
            style={{ fontSize: 14 }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Desktop Contact Button */}
      <a
        href="#contact"
        className="hidden md:flex items-center group overflow-hidden rounded-md"
      >
        <div className="bg-[#1c1c1c] text-white/90 font-mono text-xs font-semibold tracking-widest px-6 py-3 transition-colors group-hover:bg-[#252525]">
          CONTACT
        </div>
        <div className="bg-[#C8F04E] text-black px-4 py-3 transition-colors group-hover:bg-[#d4ff33] flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </a>

      {/* Mobile Hamburger Menu Icon */}
      <button 
        className="md:hidden text-white p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isMobileMenuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? "auto" : 0, 
          opacity: isMobileMenuOpen ? 1 : 0 
        }}
        className="md:hidden overflow-hidden bg-[#0A0A0A] border-t border-white/10"
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {["HOME", "ABOUT", "SERVICES", "WORKS"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#cccccc] font-mono font-medium tracking-widest hover:text-white transition-colors duration-200 text-sm py-2"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center bg-[#C8F04E] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest px-6 py-4 rounded-md"
          >
            GET IN TOUCH
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}