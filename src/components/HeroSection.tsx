import { assets } from '../assets'
import { NameTag } from './NameTag'
import { useState, useRef, useEffect } from 'react'
import { UnicornScene } from 'unicornstudio-react'
import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import { useSound } from '../contexts/SoundContext'
import { useTheme } from '../contexts/ThemeContext'

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)
  const amazedSfxRef = useRef<HTMLAudioElement | null>(null)
  const [showMuteButton, setShowMuteButton] = useState(true)
  const { isMuted, toggleMute } = useSound()
  const { isDarkMode, toggleDarkMode } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        // Show button when hero section is at least 30% visible
        setShowMuteButton(rect.bottom > window.innerHeight * 0.3)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const playAmazedSound = () => {
    if (isMuted) return
    
    if (!amazedSfxRef.current) {
      amazedSfxRef.current = new Audio("/sounds/RosieAmazed.mp3")
    }
    amazedSfxRef.current.currentTime = 0
    amazedSfxRef.current.volume = 0.2
    amazedSfxRef.current.play()
  }

  return (
    <section
      id="home"
      className="relative min-h-[50vh] lg:min-h-screen bg-gradient-to-b from-sky-top to-sky-bottom to-[50%] px-4 pb-4 pt-20 sm:pb-12 sm:pt-28"
    >
      {/* Mute Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showMuteButton ? 1 : 0,
          scale: showMuteButton ? 1 : 0.8,
          pointerEvents: showMuteButton ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-eggshell/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all hover:scale-110 active:scale-95 lg:bottom-auto lg:left-auto lg:top-6 lg:right-8 lg:h-auto lg:w-auto lg:rounded-none lg:bg-transparent lg:shadow-none lg:backdrop-blur-none"
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7 lg:h-12 lg:w-12 lg:opacity-60 lg:hover:opacity-80 lg:transition-opacity">
            <path fill="#8B7B67" className="lg:hidden" d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
            <path fill="#FFFBE7" className="hidden lg:block" d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7 lg:h-12 lg:w-12 lg:opacity-60 lg:hover:opacity-80 lg:transition-opacity">
            <path fill="#8B7B67" className="lg:hidden" d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
            <path fill="#8B7B67" className="lg:hidden" d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            <path fill="#FFFBE7" className="hidden lg:block" d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
            <path fill="#FFFBE7" className="hidden lg:block" d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
          </svg>
        )}
      </motion.button>

      {/* Dark Mode Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showMuteButton ? 1 : 0,
          scale: showMuteButton ? 1 : 0.8,
          pointerEvents: showMuteButton ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        onClick={toggleDarkMode}
        className="fixed bottom-6 left-[88px] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-eggshell/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all hover:scale-110 active:scale-95 lg:bottom-auto lg:left-auto lg:top-6 lg:right-24 lg:h-auto lg:w-auto lg:rounded-none lg:bg-transparent lg:shadow-none lg:backdrop-blur-none"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7 lg:h-12 lg:w-12 lg:opacity-60 lg:hover:opacity-80 lg:transition-opacity">
            <path fill="#8B7B67" className="lg:hidden" d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            <path fill="#FFFBE7" className="hidden lg:block" d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7 lg:h-12 lg:w-12 lg:opacity-60 lg:hover:opacity-80 lg:transition-opacity">
            <path fill="#8B7B67" className="lg:hidden" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
            <path fill="#FFFBE7" className="hidden lg:block" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
          </svg>
        )}
      </motion.button>

      {/* Unicorn Studio Background Scene */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <UnicornScene
          jsonFilePath={isDarkMode ? "/watercolornight.json" : "/watercolor.json"}
          width="100%"
          height="100%"
          scale={1}
          dpi={1.5}
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.6/dist/unicornStudio.umd.js"
        />
        {/* Gradient fade at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: isDarkMode 
              ? 'linear-gradient(to top, #0F2A47, transparent)'
              : 'linear-gradient(to top, var(--color-sky-bottom), transparent)'
          }}
        />
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
                playAmazedSound()
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
