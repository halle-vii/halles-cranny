import { assets } from '../assets'
import { NameTag } from './NameTag'
import { Chip } from './Chip'
import { motion } from 'framer-motion'
import { CurvedMarqueeBanner } from './CurvedMarqueeBanner'
import { useTheme } from '../contexts/ThemeContext'
import { ImagePile } from './ImagePile'
import { AnimatedSandBackground } from './AnimatedSandBackground'
import { IsabelleBalloon } from './IsabelleBalloon'
import { SandParticles } from './SandParticles'
import { ThemeImage } from './ThemeImage'

export function ProjectsSection() {
  const { isDarkMode } = useTheme()
  return (
    <section id="projects" className={`relative px-4 pt-24 pb-[120px] sm:pb-[100px] ${
      isDarkMode ? 'bg-projects-bg-dark' : 'bg-projects-bg'
    }`}>
      {/* Animated sand background */}
      <AnimatedSandBackground isDarkMode={isDarkMode} />
      
      {/* Sand particles and starfish */}
      <SandParticles isDarkMode={isDarkMode} />
      
      {/* Isabelle balloon following cursor */}
      <IsabelleBalloon />
      
      <ThemeImage
        lightSrc={assets.waveBorder}
        darkSrc={assets.waveBorderDark}
        isDarkMode={isDarkMode}
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
          <CurvedMarqueeBanner 
            text="PROJECTS"
            backgroundColor={isDarkMode ? "#04463D" : "#7FD8BE" }
            textColor="#eee9ca"
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
            <NameTag label="Halle" size="sm" className="absolute -left-2 -top-4 z-10" isDarkMode={isDarkMode} darkBgColor="bg-dark-hero-nametag-bg" darkTextColor="text-dark-hero-nametag-text"/>
            <div className="relative">
              <img
                src={isDarkMode ? assets.dialogBoxProjectDark : assets.dialogBoxProject}
                alt=""
                aria-hidden
                className="h-auto w-full min-h-[300px]"
                style={{ transition: 'opacity 0.5s ease' }}
              />
              <div className="absolute inset-0 flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
                <h3 className="mb-2 mt-4 font-roboto text-lg font-bold leading-[1.2] text-dialog-title sm:mb-3 sm:text-xl md:mb-4 md:text-2xl lg:text-[26px]">
                  Novateur Automated IT Ticketing System (2026)
                </h3>
                <p
                  className={`font-roboto text-sm font-bold leading-[1.2] sm:text-base md:text-lg lg:text-[19px] ${
                    isDarkMode ? 'text-dark-about-text' : 'text-dialog-text'
                  }`}>
                  Designed and deployed a centralized IT ticketing system to streamline internal operations for a workforce of 100+ employees
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4 ">
                  <Chip label="React" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined}/>
                  <Chip label="Next.js" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined}/>
                  <Chip label="Typescript" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined}/>
                  <Chip label="Azure" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined}/>
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
            <ImagePile
              projectName="Novateur"
              images={[
                { src: assets.projectScreenshot, alt: 'Novateur IT ticketing system dashboard' },
                { src: assets.novateurCreateTicket, alt: 'Novateur ticket creation form with file upload' },
                { src: assets.novateurTicketDetails, alt: 'Novateur ticket details with comments and management controls' },
                { src: assets.novateur4, alt: 'Novateur application interface' },
                { src: assets.novateur5, alt: 'Novateur system features' },
              ]}
            />
          </motion.div>
        </motion.div>

        {/* KitaKita */}
        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1fr] mb-16">
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
            <ImagePile
              projectName="KitaKita"
              images={[
                { src: assets.projectScreenshot2, alt: 'KitaKita welcome screen, activity selection, and outdoor camera view' },
                { src: assets.kitakitaSS2, alt: 'KitaKita app interface' },
              ]}
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
            <NameTag label="Halle" size="sm" className="absolute -left-2 -top-4 z-10" isDarkMode={isDarkMode} darkBgColor="bg-dark-hero-nametag-bg" darkTextColor="text-dark-hero-nametag-text"/>
            <div className="relative">
              <img
                src={isDarkMode ? assets.dialogBoxProjectDark : assets.dialogBoxProject}
                alt=""
                aria-hidden
                className="h-auto w-full sm:min-h-[350px] min-h-[300px] "
                style={{ transition: 'opacity 0.5s ease' }}
              />
              <div className="absolute inset-0 flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
                <h3 className="mb-2 font-roboto text-lg font-bold leading-[1.2] text-dialog-title sm:mb-3 sm:text-xl md:mb-4 md:text-2xl lg:text-[26px] mt-5">
                  KitaKita: AI-Powered Accessibility Assistant
                </h3>
                <p
                  className={`font-roboto text-sm font-bold leading-[1.2] sm:text-base md:text-lg lg:text-[19px] ${
                    isDarkMode ? 'text-dark-about-text' : 'text-dialog-text'
                  }`}>
                  Designed and developed the application&apos;s user interface and user experience, prioritizing accessibility, intuitive navigation, and ease of use for visually impaired users.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 ">
                  <Chip label="Next.js" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined}/>
                  <Chip label="Typescript" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined}/>
                  <Chip label="Capacitor" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined}/>
                  <Chip label="TensorFlow.js" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined}/>
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

      <ThemeImage
        lightSrc={assets.waveBottom}
        darkSrc={assets.waveBottomDark}
        isDarkMode={isDarkMode}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-[1px] sm:-bottom-[70px] left-0 right-0 w-full object-cover z-20"
      />
    </section>
  )
}
