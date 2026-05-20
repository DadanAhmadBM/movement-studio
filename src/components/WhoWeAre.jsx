import {
  motion,
  useScroll,
  useTransform,
  useInView as useFramerInView,
} from "framer-motion";
import { useRef, useEffect } from "react";

// Mengimpor file video dari folder assets Anda
import videoSrc from "../assets/Scene.mp4";

export default function WhoWeAre() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Mengambil progress scroll untuk animasi transisi warna kata
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Mendeteksi apakah container video sudah masuk ke dalam viewport
  const isVideoInView = useFramerInView(videoRef, { amount: 0.2 });

  // Efek untuk mengontrol Autoplay dan Pause berdasarkan posisi viewport
  useEffect(() => {
    if (!videoRef.current) return;

    if (isVideoInView) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay dicegah oleh browser:", err);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isVideoInView]);

  const paragraphText =
    "Movement Studio was built to help businesses move faster in the digital era. We believe a website should do more than simply look good — it should strengthen credibility, improve user experience, and support business growth.";

  const words = paragraphText.split(" ");

  return (
    <section
      id="about"
      className="w-full bg-[#0a0a0a] px-16 py-20 md:py-32 flex flex-col items-start"
    >
      {/* --- BADGE --- */}
      <div className="mb-8">
        <span
          className="font-mono px-3 py-2 text-[14px] font-medium tracking-widest text-black uppercase rounded-[3px]"
          style={{ backgroundColor: "#C8F04E" }}
        >
          Who We Are
        </span>
      </div>

      {/* --- DESCRIPTION WITH SCROLL REVEAL ANIMATION --- */}
      <div ref={containerRef} className="w-full mb-16 md:mb-24 max-w-6xl">
        <p
          className="font-sans font-medium leading-[1.3] text-left tracking-tight flex flex-wrap"
          style={{ fontSize: "clamp(22px, 3.5vw, 42px)" }}
        >
          {words.map((word, index) => {
            const start = index / words.length;
            const end = start + 1 / words.length;

            const opacity = useTransform(
              scrollYProgress,
              [start, end],
              [0.25, 1],
            );

            return (
              <motion.span
                key={index}
                style={{ opacity }}
                className="text-white mr-[0.22em] inline-block select-none"
              >
                {word}
              </motion.span>
            );
          })}
        </p>
      </div>

      {/* --- AUTOMATIC VIDEO PLAYER SECTION (NO CONTROLS) --- */}
      {/* pointer-events-none ditambahkan agar browser tidak memicu shortcut klik kanan bawaan video */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-[#0D0D0D] border border-white/5 shadow-2xl pointer-events-none"
        style={{ aspectRatio: "16/9" }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          // Atribut 'controls' telah dihapus sepenuhnya di sini
        />
      </div>
    </section>
  );
}
