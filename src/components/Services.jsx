import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    title: "Landing Page",
    description:
      "Convert visitors into customers with high-performing, one-page websites designed to capture attention and drive action. Ideal for campaigns, product launches, or limited offers.",
    image: "/landing-page-image.png",
  },
  {
    title: "Business Website",
    description:
      "Establish trust and authority with a robust, multi-page digital presence. Built for companies looking to showcase their services, values, and portfolio professionally.",
    image: "/business-website-image.png",
  },
  {
    title: "Custom Web App",
    description:
      "Complex problems need elegant solutions. We build highly interactive, scalable, and data-driven web applications tailored to your specific operational workflows.",
    image: "/custom-website-image.png",
  },
];

// --- KOMPONEN SLOT MACHINE TEXT ---
const CasinoText = ({ text, isActive, isFaded }) => {
  return (
    <motion.span
      animate={{
        color: isActive
          ? "#0A0A0A"
          : isFaded
            ? "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.25)",
      }}
      transition={{ duration: 0.3 }}
      className="inline-flex overflow-hidden relative"
      style={{ verticalAlign: "bottom" }}
    >
      {text.split("").map((char, i) => (
        <span key={i} className="relative inline-block whitespace-pre">
          {/* LAPISAN 1: Huruf Asli (Keluar ke atas) */}
          <motion.span
            className="inline-block"
            animate={{ y: isActive ? "-100%" : "0%" }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.02,
            }}
          >
            {char}
          </motion.span>

          {/* LAPISAN 2: Huruf Kloningan (Masuk dari bawah) */}
          <motion.span
            className="absolute left-0 top-0 inline-block text-black"
            initial={{ y: "100%" }}
            animate={{ y: isActive ? "0%" : "100%" }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.02,
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  // Inisialisasi state menjadi 0 agar "Landing Page" aktif secara default
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <section id="services" ref={ref} className="w-full py-16 md:py-24 bg-[#0A0A0A]">
      {/* DIUBAH: Menggunakan flex-col dan items-start agar tersusun atas-bawah dan rata kiri */}
      <div className="flex flex-col items-start w-full px-6 md:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span
            className="font-mono px-3 py-2 font-medium tracking-widest text-black rounded whitespace-nowrap"
            style={{ backgroundColor: "#C8F04E", fontSize: 14 }}
          >
            OUR SERVICES
          </span>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          /* DIUBAH: text-right dihapus, teks sekarang otomatis sejajar kiri di bawah tombol */
          className="text-white font-medium leading-tight max-w-full"
          style={{ fontSize: "clamp(28px, 2.5vw, 40px)" }}
        >
          Everything you need to build a stronger digital presence.
        </motion.p>
      </div>

      <div 
        className="mt-12"
        onMouseLeave={() => setHoveredIndex(0)}
      >
        {services.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
            onMouseEnter={() => setHoveredIndex(i)}
            className="relative cursor-pointer border-t transition-colors duration-300 min-h-[160px]"
            style={{
              borderColor:
                hoveredIndex === i
                  ? "rgba(200,240,78,0.2)"
                  : "rgba(255,255,255,0.07)",
              backgroundColor: hoveredIndex === i ? "#ffffff" : "transparent",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center px-6 md:px-16 py-8 lg:py-10 w-full h-full relative z-10 gap-4 lg:gap-0">
              {/* Kolom 1 (Kiri): Judul dengan Animasi Slot Machine */}
              <div className="w-full lg:w-1/3 flex justify-start pr-4">
                <h3
                  className="font-bold leading-none"
                  style={{
                    fontSize: "clamp(28px, 4.5vw, 64px)",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.4",
                  }}
                >
                  <CasinoText
                    text={svc.title}
                    isActive={hoveredIndex === i}
                    isFaded={hoveredIndex !== null && hoveredIndex !== i}
                  />
                </h3>
              </div>

              {/* Kolom 2 (Tengah): Deskripsi */}
              <div className="w-full lg:w-1/3 flex justify-start lg:justify-center lg:px-4">
                <p
                  className="text-xl leading-relaxed transition-colors duration-300 max-w-[280px]"
                  style={{
                    color:
                      hoveredIndex === i ? "#0A0A0A" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {svc.description}
                </p>
              </div>

              <div className="hidden lg:flex w-1/3 justify-end pl-4">
                <div className="w-[260px]" />
              </div>
            </div>

            {/* Gambar Placeholder (Sembunyikan di Mobile & Tablet) */}
            <div className="hidden lg:block absolute right-40 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, -12, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="w-[260px] h-[270px] rounded-[12px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
                  >
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
        <div
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        />
      </div>
    </section>
  );
}