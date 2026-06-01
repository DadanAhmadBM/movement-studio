import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const services = [
  {
    title: "Landing Page",
    part1: "Landing",
    part2: "Page",
    description:
      "Convert visitors into customers with high-performing, one-page websites designed to capture attention and drive action. Ideal for campaigns, product launches, or limited offers.",
    lottie: "/lotties/lottie-landing-page.json",
  },
  {
    title: "Business Website",
    part1: "Business",
    part2: "Website",
    description:
      "Establish trust and authority with a robust, multi-page digital presence. Built for companies looking to showcase their services, values, and portfolio professionally.",
    lottie: "/lotties/lottie-business-website.json",
  },
  {
    title: "Custom Web App",
    part1: "Custom",
    part2: "Web App",
    description:
      "Complex problems need elegant solutions. We build highly interactive, scalable, and data-driven web applications tailored to your specific operational workflows.",
    lottie: "/lotties/lottie-custom-web-app.json",
  },
];

// --- KOMPONEN SLOT MACHINE TEXT (Tetap Sama) ---
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
          {/* LAPISAN 1: Huruf Asli */}
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

          {/* LAPISAN 2: Huruf Kloningan */}
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
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "0px" });
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <motion.section
      id="services"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="w-full py-16 md:py-24 bg-[#0A0A0A]"
    >
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
            <div className="flex flex-col md:flex-row md:justify-around md:items-center lg:flex-row lg:items-center px-6 md:px-16 py-8 lg:py-10 w-full h-full relative z-10 gap-4 md:gap-0 lg:gap-0">
              {/* Kolom 1 (Kiri): Judul */}
              <div className="w-full md:w-auto lg:w-1/3 flex justify-start md:justify-center lg:justify-start pr-4 md:pr-0 lg:pr-4">
                <h3
                  className="font-bold text-[clamp(28px,4.5vw,64px)] md:text-[clamp(24px,3.5vw,38px)] lg:text-[clamp(28px,4.5vw,64px)] leading-[1.4] md:leading-[1.15] lg:leading-[1.4]"
                  style={{
                    letterSpacing: "-0.02em",
                  }}
                >
                  <CasinoText
                    text={svc.part1}
                    isActive={hoveredIndex === i}
                    isFaded={hoveredIndex !== null && hoveredIndex !== i}
                  />
                  <span className="inline md:hidden lg:inline">&nbsp;</span>
                  <br className="hidden md:inline lg:hidden" />
                  <CasinoText
                    text={svc.part2}
                    isActive={hoveredIndex === i}
                    isFaded={hoveredIndex !== null && hoveredIndex !== i}
                  />
                </h3>
              </div>

              {/* Kolom 2 (Tengah): Deskripsi */}
              <div className="w-full md:w-auto lg:w-1/3 flex justify-start md:justify-center lg:justify-center px-0 md:px-0 lg:px-4">
                <p
                  className="text-xl md:text-lg lg:text-xl leading-relaxed transition-colors duration-300 max-w-[280px] lg:max-w-[450px]"
                  style={{
                    color:
                      hoveredIndex === i ? "#0A0A0A" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {svc.description}
                </p>
              </div>

              {/* Kolom 3 (Kanan): Spacer & Animasi Lottie */}
              <div className="hidden md:flex lg:flex w-auto md:w-[200px] lg:w-1/3 justify-end pl-4 md:pl-0 lg:pl-4 relative z-50">
                <div className="w-[200px] lg:w-[260px]" />
                
                {/* Animasi Lottie */}
                <div className="absolute right-0 lg:right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
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
                        className="w-[200px] h-[250px] rounded-[12px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
                      >
                        <Player
                          autoplay
                          loop={false}
                          keepLastFrame={true}
                          src={svc.lottie}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <div
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        />
      </div>
    </motion.section>
  );
}