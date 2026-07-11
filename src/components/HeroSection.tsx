import { assets } from '../assets'
import { NameTag } from './NameTag'
import { useState, useRef } from 'react'
import { UnicornScene } from 'unicornstudio-react'
import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion';

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)
  const amazedSfxRef = useRef<HTMLAudioElement | null>(null)

  return (
    <section
      id="home"
      className="relative min-h-[50vh] lg:min-h-screen bg-gradient-to-b from-sky-top to-sky-bottom to-[50%] px-4 pb-4 pt-20 sm:pb-12 sm:pt-28"
    >
      {/* Unicorn Studio Background Scene */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <UnicornScene
          jsonFilePath="/watercolor.json"
          width="100%"
          height="100%"
          scale={1}
          dpi={1.5}
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.6/dist/unicornStudio.umd.js"
        />
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-sky-bottom to-transparent pointer-events-none" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-10 lg:justify-between mt-4 sm:mt-10 mb-16 lg:mb-60">
        <motion.div 
          className="relative mx-auto w-full sm:w-[75%] min-w-[320px]" 
        >
          <NameTag label="Halle" size="responsive" className="absolute left-0 top-4 translate-x-5 z-10" />

          <div className="relative mt-8 mb-8">
            <img
              src={assets.dialogBox}
              alt=""
              aria-hidden
              className="h-auto w-full sm:min-w-[80%] xl:min-w-full mx-auto min-h-[200px] sm:min-h-[200px] md:min-h-[250px]"
            />
            <div className="absolute left-8 sm:left-12 md:left-12 lg:left-17 top-[18%]  max-w-[70%] pr-[5%]">
              <p className="font-roboto text-2xl sm:text-3xl font-bold leading-[1.43] text-dialog-text sm:text-2xl md:text-3xl lg:text-4xl xl:text-[48px] mt-4">
                Welcome to
              </p>
              <TypeAnimation 
                sequence={[
                  "Halle's Portfolio!",
                  1000,
                  "Halle's Island!",
                  1000,
                  "はりしょうてん！",
                  2000,
                  "Halle's Cranny!",
                  2000
                ]}
                cursor={false}
                className="mt-1 font-roboto text-[2.5rem] font-bold leading-[1.1] text-leaf-green whitespace-nowrap sm:mt-2  sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px]"
              />
            </div>
            <img
              src={assets.heroPointer}
              alt=""
              aria-hidden
              className="absolute bottom-0 left-1/2 h-4 w-16 -translate-x-1/2 translate-y-1/2 animate-bounce"
            />
            
            {/* Avatar face at top right of dialog */}
            <div 
              className="absolute right-0 top-0 translate-x-[24%] -translate-y-[15%] h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[350px] transition-transform duration-300 hover:scale-110 cursor-pointer"
              onMouseEnter={() => {
                setIsHovered(true)
                
                if (!amazedSfxRef.current) {
                  amazedSfxRef.current = new Audio("/sounds/RosieAmazed.mp3")
                }
                amazedSfxRef.current.currentTime = 0
                amazedSfxRef.current.volume = 0.2
                amazedSfxRef.current.play()
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={isHovered ? assets.avatarFaceShocked : assets.avatarFace}
                alt="Halle avatar"
                className="h-full w-full rotate-[11deg] object-contain animate-wiggle"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cloud marquee - Framer Motion */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
        <motion.div 
          className="flex"
          animate={{ x: ['-100%', '0%'] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 40, 
            ease: 'linear', 
            repeat: Infinity 
          }}
        >
          {/* First set of clouds */}
          {[...Array(20)].map((_, i) => (
            <img 
              key={i}
              src={assets.clouds}
              alt=""
              className="h-20 w-auto flex-shrink-0 object-contain sm:h-24 md:h-32 lg:h-100 -mx-10"
            />
          ))}
          {/* Duplicate for seamless loop */}
          {[...Array(20)].map((_, i) => (
            <img 
              key={`duplicate-${i}`}
              src={assets.clouds}
              alt=""
              className="h-20 w-auto flex-shrink-0 object-contain sm:h-24 md:h-32 lg:h-100 -mx-10"
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
