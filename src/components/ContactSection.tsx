import { assets } from '../assets'
import { IsabelleModel } from './IsabelleModel'
import { UnicornScene } from 'unicornstudio-react'
import { useState, useRef, useEffect } from "react"
import { motion } from 'framer-motion'
import { useSound } from '../contexts/SoundContext'
import { useTheme } from '../contexts/ThemeContext'

type ContactApp = {
  label: string
  href: string
  color: string
  icon?: string
  emoji?: string
  iconSize?: string
  iconColor?: string
}

const contactApps: ContactApp[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/halle-vii',
    color: 'bg-app-blue',
    icon: assets.github,
    iconSize: 'h-16 w-16',
  },
  {
    label: 'Email',
    href: 'mailto:hallevillegas28@gmail.com',
    color: 'bg-app-purple',
    icon: assets.mail,
    iconSize: 'h-20 w-20',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alyssa-vii/',
    color: 'bg-app-yellow',
    icon: assets.linkedin,
    iconSize: 'h-16 w-16',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/halle.vii/',
    color: 'bg-app-orange',
    icon: assets.instagram,
    iconSize: 'h-18 w-18',
  },
  {
    label: 'My Art ‪‪❤︎',
    href: 'https://www.instagram.com/hawiart/',
    color: 'bg-app-pink',
    icon: assets.design,
    iconSize: 'h-20 w-20',
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/user/12136969718?si=43c823dfec2041ee',
    color: 'bg-app-teal',
    icon: assets.spotify,
    iconSize: 'h-20 w-20',
  },
]

function ContactAppButton({ 
  app, 
  onHover, 
  onLeave,
  onClick,
}: { 
  app: ContactApp 
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}) {
  return (
    <a
      href={app.href}
      target={app.href.startsWith('http') ? '_blank' : undefined}
      rel={app.href.startsWith('http') ? 'noreferrer' : undefined}
      aria-label={app.label}
      className={`relative flex h-[100px] w-[100px] items-center justify-center rounded-[35px] ${app.color} shadow-[inset_0_-4px_0_rgba(0,0,0,0.08)] transition-transform hover:scale-105 `}
      onMouseEnter={
        onHover
      }
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {app.icon ? (
        <img src={app.icon} alt="" className={`transition-transform hover:scale-120 hover:-rotate-6 transition-all duration-300 object-contain ${app.iconSize || 'h-20 w-20'}`} />
      ) : (
        <span className="text-4xl">{app.emoji}</span>
      )}
    </a>
  )
}

export function ContactSection() {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)
  const clickSound = useRef(new Audio("/sounds/UI_Cancel.wav"))
  const hoverSound = useRef(new Audio("/sounds/UI_Cmn_Open_Small_Short.wav"))
  const [time, setTime] = useState("")
  const [isMediumScreen, setIsMediumScreen] = useState(() => {
    // Initialize based on current screen size
    return typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  })
  const { isMuted } = useSound()
  const { isDarkMode } = useTheme()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMediumScreen(window.innerWidth >= 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
  const updateTime = () => {
  const now = new Date();

    setTime(
      now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
        })
      );
    };

    updateTime(); 

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const playClickSound = () => {
    if (isMuted) return
    clickSound.current.currentTime = 0;
    clickSound.current.play();
  }

  const playHoverSound = () => {
    if (isMuted) return
    hoverSound.current.currentTime = 0;
    hoverSound.current.play();
  }

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-b from-sky-top to-sky-bottom px-4 pb-24 pt-16"
    >
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
        {/* Gradient fade at top and bottom */}
        <div 
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: isDarkMode 
              ? 'linear-gradient(to bottom, #021533, transparent)'
              : 'linear-gradient(to bottom, var(--color-sky-top), transparent)'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: isDarkMode 
              ? 'linear-gradient(to top, #0F2A47, transparent)'
              : 'linear-gradient(to top, var(--color-sky-bottom), transparent)'
          }}
        />
      </div>
      
      
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 lg:grid lg:grid-cols-[1fr_1fr] lg:items-end">
        <div className="flex w-full items-center justify-center lg:w-auto lg:items-end lg:justify-self-end">
          <IsabelleModel />
        </div>

        <motion.div 
          initial={isMediumScreen ? { opacity: 0, scale: 0.2 } : { opacity: 1, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          viewport={{ once: true }}
          className="w-full max-w-[450px] lg:justify-self-start">
          <div className="relative rounded-[120px] bg-phone-bg px-8 pb-12 pt-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="mb-8 flex items-center justify-between px-2 text-[#dddbcc]">
              <span className="text-sm font-medium tracking-widest">
                <img 
                  src={assets.wifi}
                />
              </span>
              <span className="font-roboto text-2xl font-medium md:text-[32px] mr-2">{time}</span>
              <span className="text-xl mr-5">
                <img 
                  src={assets.location}
                />
              </span>
            </div>

            <h2 className="mb-10 text-center font-roboto text-4xl font-bold text-dialog-text md:text-5xl">
              {hoveredApp ?? "Contact Me!"}
            </h2>

            <div className="w-fit mx-auto grid grid-cols-3 gap-x-6 gap-y-6 justify-items-center">
              {contactApps.map((app) => (
                <ContactAppButton 
                key={app.label} 
                app={app} 
                onHover={() => {
                  setHoveredApp(app.label);
                  playHoverSound();
                }}
                onLeave={() => setHoveredApp(null)}
                onClick={() => playClickSound()}
                  />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Credits Footer Bar - At bottom of contact section */}
      <div className="absolute bottom-0 left-0 right-0 z-50 border-t-2 border-dialog-text/20 bg-dialog-text/90 backdrop-blur-md py-2 shadow-lg">
        <div className="mx-auto max-w-7xl px-2">
          <p className="mb-2 text-center font-roboto text-xs font-medium text-tan md:text-sm">
            Made with love! (and cheese) | ACNH Elements credited to{' '}
              <a 
                href="https://manaloka.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-tan transition-colors"
              >
                manaloka.com
              </a> | &quot;Isabelle - animal crossing&quot; 3D Model (
              <a 
                href="https://skfb.ly/pHYPL" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-tan transition-colors"
              >
                skfb.ly/pHYPL
              </a>
              ) by Xetrev is licensed under{' '}
              <a 
                href="http://creativecommons.org/licenses/by/4.0/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-tan transition-colors"
              >
                Creative Commons Attribution
              </a>
          </p>
          <div className="flex flex-col gap-1 text-center font-roboto text-[10px] font-medium text-tan/80 md:text-xs">
            <p>
              
            </p>
             
            <p>
             
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
