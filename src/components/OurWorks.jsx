import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const projects = [
  {
    name: "Nova Energy",
    tags: ["Energy", "Startup"],
    image: "/project-nova-energy-image.png",
  },
  {
    name: "Pulse Band",
    tags: ["Music", "Event"],
    image: "/project-pulse-image.png",
  },
  {
    name: "Grander Builder",
    tags: ["Film", "Production"],
    image: "/project-grander-builder-image.png",
  },
  {
    name: "Nejtrip",
    tags: ["Travel", "App"],
    image: "/project-nejtrip-image.png",
  },
  {
    name: "Hi.tcg",
    tags: ["Gaming", "E-commerce"],
    image: "/project-hitcg-image.png",
  },
  {
    name: "Aurahome",
    tags: ["Interior", "Property"],
    image: "/project-aurahome-image.png",
  },
];

const CasinoText = ({ text, isActive, isFaded }) => {
  return (
    <motion.span
      animate={{
        color: isActive
          ? "#C8F04E"
          : isFaded
            ? "rgba(255,255,255,0.25)"
            : "#FFFFFF",
      }}
      transition={{ duration: 0.3 }}
      className="inline-flex overflow-hidden relative"
      style={{ verticalAlign: "bottom" }}
    >
      {text.split("").map((char, i) => (
        <span key={i} className="relative inline-block whitespace-pre">
          <motion.span
            className="inline-block"
            animate={{
              y: isActive ? "-100%" : "0%",
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.025,
            }}
          >
            {char}
          </motion.span>

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
  const ref = useRef(null);
  const imageRef = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Smooth cinematic image transition
  useEffect(() => {
    if (!imageRef.current) return;

    const image = imageRef.current;

    gsap.killTweensOf(image);

    gsap.fromTo(
      image,
      {
        scale: 1.08,
        filter: "blur(12px)",
        opacity: 0.65,
        x: 40,
      },
      {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        force3D: true,
      },
    );
  }, [activeIndex]);

  return (
    <section
      id="works"
      ref={ref}
      className="w-full bg-[#0A0A0A] px-6 md:px-16 py-16 md:py-24 font-sans overflow-hidden"
    >
      <div className="max-w-[1200px] mx-2">
        {/* HEADER */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span
              className="font-mono px-3 py-2 text-[14px] font-medium tracking-[0.15em] text-black uppercase rounded-[3px]"
              style={{ backgroundColor: "#C8F04E" }}
            >
              Our Works
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white font-medium tracking-tight"
            style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
          >
            Built for brands that want to stand out.
          </motion.h2>
        </div>

        {/* DESKTOP & TABLET CONTENT */}
        <div className="hidden md:flex flex-col xl:flex-row items-start gap-12 xl:gap-[120px]">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="w-full md:w-[572px] aspect-square rounded-[16px] overflow-hidden relative shrink-0 border border-white/10 bg-[#141414]"
          >
            <img
              ref={imageRef}
              key={projects[activeIndex].image}
              src={projects[activeIndex].image}
              alt={projects[activeIndex].name}
              className="w-full h-full object-cover will-change-transform"
              draggable={false}
            />

            {/* cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* TEXT */}
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
                  className="text-left font-medium block mb-2 will-change-transform"
                  style={{
                    fontSize: "clamp(36px, 4vw, 56px)",
                    letterSpacing: "-0.03em",
                    lineHeight: "1.3",
                  }}
                >
                  <CasinoText
                    text={project.name}
                    isActive={isActive}
                    isFaded={isFaded}
                  />
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* MOBILE CONTENT */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:hidden">
          {projects.map((project, i) => (
            <motion.div 
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
              className="flex flex-col"
            >
              <div className="w-full aspect-square rounded-[6px] overflow-hidden bg-[#141414] mb-4 relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <h3 className="text-white font-medium text-[16px] leading-tight">
                {project.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}