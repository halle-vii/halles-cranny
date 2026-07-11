import { assets } from '../assets'
import { NameTag } from './NameTag'
import { Chip } from './Chip'
import { TypeAnimation } from 'react-type-animation'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { WetPaintTitle } from './WetPaintTitle'
import { useRef, type MouseEvent } from 'react'

function ProjectScreenshot({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg'])
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="overflow-hidden rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] cursor-pointer"
    >
      <motion.img
        src={src}
        alt={alt}
        className="h-auto w-full object-cover"
        style={{
          transform: 'translateZ(20px)',
        }}
      />
    </motion.div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-projects-bg px-4 pt-24 pb-[120px] sm:pb-[100px]">
      <img
        src={assets.waveBorder}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-[70px] left-0 right-0 w-full object-cover"
      />

      <div className="relative mx-auto max-w-6xl z-10">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5
          }}
          viewport={{ once: true }}
        >
          <WetPaintTitle 
            title="Projects"
            backgroundColor="#79C4AE"
            textColor="#eee9ca"
            dripCount={4}
            speed={1}
          />
        </motion.div>

        {/* Novateur */}
        <motion.div 
          className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] ">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5
            }}
            viewport={{ once: true }}
            className="relative">
            <NameTag label="Halle" size="sm" className="absolute -left-2 -top-4 z-10" />
            <div className="relative">
              <img
                src={assets.dialogBoxProject}
                alt=""
                aria-hidden
                className="h-auto w-full min-h-[300px]"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
                <h3 className="mb-2 mt-4 font-roboto text-lg font-bold leading-[1.2] text-dialog-title sm:mb-3 sm:text-xl md:mb-4 md:text-2xl lg:text-[26px]">
                  Novateur Automated IT Ticketing System (2026)
                </h3>
                <TypeAnimation
                  sequence={[
                    "Designed and deployed a centralized IT ticketing system to streamline internal operations for a workforce of 100+ employees", 
                    100
                  ]}
                  cursor={false}
                  speed={80}
                  className="font-roboto text-sm font-bold leading-[1.2] text-dialog-text sm:text-base md:text-lg lg:text-[19px]"
                />
                <div className="flex flex-wrap gap-2 mt-4 ">
                  <Chip label="React"/>
                  <Chip label="Next.js"/>
                  <Chip label="Typescript" />
                  <Chip label="Azure"/>
                </div>
              </div>
              <img
                src={assets.heroPointer}
                alt=""
                aria-hidden
                className="absolute bottom-0 left-1/2 h-4 w-16 -translate-x-1/2 translate-y-1/2 animate-bounce"
              />
            </div>
            
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30}}
            whileInView={{ opacity: 1, x: 0}}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ProjectScreenshot 
              src={assets.projectScreenshot}
              alt="Novateur IT ticketing system dashboard screenshot"
            />
          </motion.div>
        </motion.div>

        {/* KitaKita */}
        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <motion.div 
            initial={{ opacity: 0, x: -30}}
            whileInView={{ opacity: 1, x: 0}}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1"
          >
            <ProjectScreenshot 
              src={assets.projectScreenshot2}
              alt="KitaKita accessibility assistant screenshot"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30}}
            whileInView={{ opacity: 1, x: 0}}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
            viewport={{ once: true, amount: 0.3 }}
            style={{ 
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              perspective: 1000
            }}
            className="relative order-1 lg:order-2">
            <NameTag label="Halle" size="sm" className="absolute -left-2 -top-4 z-10" />
            <div className="relative">
              <img
                src={assets.dialogBoxProject}
                alt=""
                aria-hidden
                className="h-auto w-full sm:min-h-[350px] min-h-[300px] "
              />
              <div className="absolute inset-0 flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
                <h3 className="mb-2 font-roboto text-lg font-bold leading-[1.2] text-dialog-title sm:mb-3 sm:text-xl md:mb-4 md:text-2xl lg:text-[26px] mt-5">
                  KitaKita: AI-Powered Accessibility Assistant
                </h3>
                <TypeAnimation
                  sequence={[
                    "Designed and developed the application&apos;s user interface and user experience, prioritizing accessibility, intuitive navigation, and ease of use for visually impaired users.",
                    1000
                  ]}
                  cursor={false}
                  speed={80}
                  className="font-roboto text-sm font-bold leading-[1.2] text-dialog-text sm:text-base md:text-lg lg:text-[19px]"
                />
                <div className="flex flex-wrap gap-2 mt-4 ">
                  <Chip label="Next.js"/>
                  <Chip label="Typescript" />
                  <Chip label="Capacitor"/>
                  <Chip label="TensorFlow.js"/>
                </div>
              </div>
              <img
                src={assets.heroPointer}
                alt=""
                aria-hidden
                className="absolute bottom-0 left-1/2 h-4 w-16 -translate-x-1/2 translate-y-1/2 animate-bounce"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <img
        src={assets.waveBottom}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-[1px] sm:-bottom-[70px] left-0 right-0 w-full object-cover z-20"
      />
    </section>
  )
}
