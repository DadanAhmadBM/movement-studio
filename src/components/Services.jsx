import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    title: "Landing Page",
    description:
      "High-converting landing pages designed to capture attention, communicate value clearly, and drive action.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Business Website",
    description:
      "Professional business websites that strengthen credibility and create a modern online presence.",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Custom Website",
    description:
      "Fully customized web solutions built around your business needs and more features.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=400&auto=format&fit=crop",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" ref={ref} className="w-full py-24 bg-[#0a0a0a]">
      {/* Top bar: badge + heading */}
      <div className="flex items-start gap-12 px-16 mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span
            className="font-mono px-4 py-1.5 text-xs font-bold tracking-widest text-black rounded whitespace-nowrap"
            style={{ backgroundColor: "#C8F04E" }}
          >
            OUR SERVICES
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white font-semibold leading-tight"
          style={{ fontSize: "clamp(18px, 2.5vw, 34px)", maxWidth: 600 }}
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
            // Interaksi Hover
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative cursor-pointer border-t transition-colors duration-300 min-h-[160px]"
            style={{
              borderColor:
                hoveredIndex === i
                  ? "rgba(200,240,78,0.2)"
                  : "rgba(255,255,255,0.07)",
              backgroundColor: hoveredIndex === i ? "#ffffff" : "transparent",
            }}
          >
            {/* Layout 3 Kolom yang presisi (w-full). 
              Masing-masing kolom menggunakan lebar w-1/3 (33.3%) 
            */}
            <div className="flex items-center px-16 py-10 w-full h-full relative z-10">
              {/* Kolom 1 (Kiri): Service name */}
              <div className="w-1/3 flex justify-start pr-4">
                <h3
                  className="font-bold leading-none transition-colors duration-300"
                  style={{
                    fontSize: "clamp(28px, 4.5vw, 64px)",
                    color:
                      hoveredIndex === i ? "#000000" : "rgba(255,255,255,0.25)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {svc.title}
                </h3>
              </div>

              {/* Kolom 2 (Tengah): Description */}
              <div className="w-1/3 flex justify-center px-4">
                <p
                  className="text-xl leading-relaxed transition-colors duration-300 max-w-[280px]"
                  style={{
                    color:
                      hoveredIndex === i ? "#000000" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {svc.description}
                </p>
              </div>

              {/* Kolom 3 (Kanan): Spacer untuk menjaga batas area */}
              <div className="w-1/3 flex justify-end pl-4">
                <div className="w-[200px]" />
              </div>
            </div>

            {/* Gambar Placeholder (Floating & Absolut ditengah baris) */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      y: [0, -12, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="w-[200px] h-[210px] rounded-[10px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
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
