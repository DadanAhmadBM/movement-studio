import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import * as THREE from 'three'

import bgImage from '../assets/bg-image.png'
import headlineHero from '../assets/headline-hero.svg'

export default function Hero() {
  const [time, setTime] = useState('')
  
  const mountRef = useRef(null)
  
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }, 
    uAspect: { value: 1.0 } 
  })

  useEffect(() => {
    // --- JAM DIGITAL ---
    const tick = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM'
      setTime(`${h}:${m}:${s} ${ampm}`)
    }
    tick()
    const id = setInterval(tick, 1000)

    // --- SETUP THREE.JS ---
    if (!mountRef.current) return
    const container = mountRef.current

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.pointerEvents = 'none' 
    container.appendChild(renderer.domElement)

    const texture = new THREE.TextureLoader().load(headlineHero)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    // --- GLSL SHADER ---
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: uniformsRef.current.uTime,
        uHover: uniformsRef.current.uHover,
        uMouse: uniformsRef.current.uMouse,
        uAspect: uniformsRef.current.uAspect
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uHover;
        uniform vec2 uMouse;
        uniform float uAspect;

        void main() {
          vec2 uv = vUv;

          vec2 aspectUv = vec2(uv.x * uAspect, uv.y);
          vec2 aspectMouse = vec2(uMouse.x * uAspect, uMouse.y);

          float dist = distance(aspectUv, aspectMouse);

          // PERUBAHAN: Radius dibesarkan menjadi 0.35 (sebelumnya 0.25)
          float radiusIntensity = smoothstep(0.35, 0.0, dist); 
          float finalIntensity = radiusIntensity * uHover;

          // PERUBAHAN: Amplitudo diubah menjadi 0.06 (sangat kuat) 
          // dan frekuensi diturunkan menjadi 10.0 agar lekukannya tebal seperti karet melar
          float waveX = sin(uv.y * 10.0 + uTime * 3.0) * 0.06 * finalIntensity;
          float waveY = cos(uv.x * 10.0 + uTime * 3.0) * 0.06 * finalIntensity;

          uv.x += waveX;
          uv.y += waveY;

          gl_FragColor = texture2D(uTexture, uv);
        }
      `,
      transparent: true
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation Loop
    const clock = new THREE.Clock()
    let reqId

    const animate = () => {
      uniformsRef.current.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      reqId = requestAnimationFrame(animate)
    }
    animate()

    // Resize Handling
    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniformsRef.current.uAspect.value = width / height
    })
    resizeObserver.observe(container)

    return () => {
      clearInterval(id)
      cancelAnimationFrame(reqId)
      resizeObserver.disconnect()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [])

  // --- MOUSE EVENT HANDLERS (DENGAN EFEK ELASTIS KARET) ---
  const handleMouseEnter = () => {
    // Memberikan animasi karet (elastic) saat membesar pertama kali
    gsap.to(uniformsRef.current.uHover, { 
      value: 1, 
      duration: 1.2, 
      ease: "elastic.out(1, 0.4)", // Pantulan karet
      overwrite: "auto"
    })
  }

  const handleMouseMove = (e) => {
    if (!mountRef.current) return
    const rect = mountRef.current.getBoundingClientRect()
    
    const targetX = (e.clientX - rect.left) / rect.width
    const targetY = 1.0 - ((e.clientY - rect.top) / rect.height)

    // Menggunakan GSAP agar efek air terseret perlahan mengikuti kursor (efek berat cair/karet)
    gsap.to(uniformsRef.current.uMouse.value, {
      x: targetX,
      y: targetY,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto"
    })
  }

  const handleMouseLeave = () => {
    // Delay 0.2 detik, lalu kembali dengan efek pantulan karet yang ekstrem (elastic.out)
    gsap.to(uniformsRef.current.uHover, { 
      value: 0, 
      duration: 1.5, 
      delay: 0.2, 
      ease: "elastic.out(1, 0.3)", 
      overwrite: "auto"
    })
  }

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden flex flex-col bg-[#0a0a0a] px-16 pb-6 pt-32 font-sans">

      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/90" />
      <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vh] bg-[#C8F04E] opacity-[0.08] blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full pointer-events-none">
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto items-center pointer-events-auto">

          {/* Left Column */}
          <div className="w-full md:w-1/2 flex flex-col gap-10 md:gap-14">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-mono text-[14px] text-white/70 tracking-[0.15em]"
            >
              {time}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="font-mono text-[14px] text-white/60 tracking-widest uppercase leading-loose">
                WEB DEVELOPMENT AGENCY —<br />
                BASED IN BANDUNG, INDONESIA
              </p>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            className="w-full md:w-1/2 flex items-center mt-12 md:mt-0 md:pl-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
          >
            <p className="text-xl md:text-[22px] font-medium leading-[1.4] max-w-xl text-white">
              <span className="text-[#a3a3a3]">Movement studio</span>
              {' '}helps startups, modern businesses,{' '}
              and creative brands build high-performance websites with{' '}
              <span className="text-[#a3a3a3]">premium</span>
              {' '}visuals and scalable user experiences.
            </p>
          </motion.div>

        </div>
      </div>

      {/* --- BOTTOM CONTENT --- */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: [0.5, 1, 0.3, 1] }}
        className="relative z-10 mt-auto mb-4 py-4"
      >
        <div 
          ref={mountRef}
          onMouseEnter={handleMouseEnter} 
          onMouseMove={handleMouseMove} 
          onMouseLeave={handleMouseLeave}
          className="relative block cursor-crosshair"
        >
          {/* Spacer Image */}
          <img 
            src={headlineHero} 
            alt="Spacer" 
            className="w-full h-auto block opacity-0 pointer-events-none" 
          />
        </div>
      </motion.div>

    </section>
  )
}