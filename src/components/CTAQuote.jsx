import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Ganti ekstensi atau nama file di bawah ini sesuai dengan nama gambar di folder assets Anda
import bgImage from "../assets/bg-image.png";

export default function CTAQuote() {
  const containerRef = useRef(null);

  // Menggunakan target ke outer container (track)
  // offset ["start start", "end end"] memastikan animasi BERJALAN HANYA saat posisi section memenuhi 100% layar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Memecah teks menjadi dua baris
  const line1 = "Your website is more than a digital presence.".split(" ");
  const line2 = "It is how people see, trust, and remember your brand.".split(
    " ",
  );
  const totalWords = line1.length + line2.length;

  return (
    /* 1. OUTER TRACK CONTAINER: Menentukan seberapa lama/panjang scroll saat halaman terkunci.
       Makin besar nilainya (misal h-[300vh]), scroll akan terasa semakin pelan dan padat. */
    <div ref={containerRef} className="relative w-full h-[250vh]">
      {/* 2. INNER STICKY CONTAINER: Bagian yang mengunci di layar (100vh) */}
      <section className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* --- BACKGROUND IMAGE DENGAN OPACITY --- */}
        <div
          className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Overlay hitam tipis tambahan untuk memperhalus kontras */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#0a0a0a]/80" />

        {/* --- KONTEN TEKS --- */}
        <div className="relative z-10 text-center px-16 w-full max-w-5xl mx-auto">
          <p
            className="font-sans font-medium tracking-tight"
            style={{ fontSize: "clamp(20px, 3.8vw, 52px)", lineHeight: "1.3" }}
          >
            {/* Render Baris Pertama */}
            <span className="block mb-2 md:mb-1">
              {line1.map((word, i) => {
                const start = i / totalWords;
                const end = start + 1 / totalWords;
                // Opacity teks bergerak dari 0.25 (samar) menuju 1 (putih terang) seiring scroll berjalan
                const opacity = useTransform(
                  scrollYProgress,
                  [start, end],
                  [0.25, 1],
                );

                return (
                  <span key={`l1-${i}`}>
                    <motion.span
                      style={{ opacity }}
                      className="text-white inline"
                    >
                      {word}
                    </motion.span>
                    {i === line1.length - 1 ? "" : " "}
                  </span>
                );
              })}
            </span>

            {/* Render Baris Kedua */}
            <span className="block">
              {line2.map((word, i) => {
                const globalIndex = i + line1.length;
                const start = globalIndex / totalWords;
                const end = start + 1 / totalWords;
                const opacity = useTransform(
                  scrollYProgress,
                  [start, end],
                  [0.25, 1],
                );

                return (
                  <span key={`l2-${i}`}>
                    <motion.span
                      style={{ opacity }}
                      className="text-white inline"
                    >
                      {word}
                    </motion.span>
                    {i === line2.length - 1 ? "" : " "}
                  </span>
                );
              })}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
