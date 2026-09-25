import { assets } from '../assets'
import { NameTag } from './NameTag'
import { useState, useRef } from 'react'
import { Chip } from './Chip'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const techStack = [
  { name: 'Java', icon: assets.tech.java },
  { name: 'JavaScript', icon: assets.tech.javascript },
  { name: 'React', icon: assets.tech.react },
  { name: 'Next.js', icon: assets.tech.next },
  { name: 'CSS', icon: assets.tech.css },
  { name: 'Angular', icon: assets.tech.angular },
  { name: 'TypeScript', icon: assets.tech.typescript },
  { name: 'Python', icon: assets.tech.python },
]

type NavTab = 'Dev' | 'Tools' | 'Loves'

interface CompactACNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  className?: string;
  isDarkMode?: boolean;
}

function CompactACNav({ activeTab, setActiveTab, className = '', isDarkMode = false }: CompactACNavProps) {
  const clickSound = useRef(new Audio("/sounds/UI_Check.wav"))
  const playClickSound = () => {
    clickSound.current.currentTime = 0;
    clickSound.current.play();
  }
  return (
    <div className={`relative z-20 flex items-center ${className}`}>
      {/* Dev Tab */}
      <button
        onClick={() => {
          setActiveTab('Dev')
          playClickSound()
        }}
        className={`group flex h-15 w-15 lg:h-20 lg:w-20 cursor-pointer items-center justify-center rounded-full outline-none transition-all duration-200 first:ml-0 -ml-3 hover:scale-105 hover:brightness-105 active:scale-95 ${
          isDarkMode ? 'bg-dark-about-dialog-bg' : 'bg-[#FFFBE7]'
        }`}
      >
        <img 
          src={assets.dev} 
          alt="Dev"
          className={`h-8 w-8 lg:h-10 lg:w-10 object-contain transition-all duration-300 ${
            activeTab === 'Dev' 
              ? 'scale-110 -rotate-6 opacity-100' 
              : 'scale-90 grayscale opacity-40'
          }`}
          style={activeTab === 'Dev' ? {
            filter: isDarkMode 
              ? 'brightness(0) saturate(100%) invert(87%) sepia(72%) saturate(6289%) hue-rotate(123deg) brightness(103%) contrast(106%)'
              : 'brightness(0) saturate(100%) invert(51%) sepia(97%) saturate(2054%) hue-rotate(0deg) brightness(103%) contrast(101%)'
          } : undefined}
        />
      </button>

      {/* Tools Tab */}
      <button
        onClick={() => {
          setActiveTab('Tools')
          playClickSound()
        }}
        className={`group flex h-15 w-15 lg:h-20 lg:w-20 cursor-pointer items-center justify-center rounded-full outline-none transition-all duration-200 first:ml-0 -ml-3 hover:scale-105 hover:brightness-105 active:scale-95 ${
          isDarkMode ? 'bg-dark-about-dialog-bg' : 'bg-[#FFFBE7]'
        }`}
      >
        <img 
          src={assets.tool} 
          alt="Tools"
          className={` h-8 w-8 lg:h-10 lg:w-10 object-contain transition-all duration-300 ${
            activeTab === 'Tools' 
              ? 'scale-110 -rotate-6 opacity-100' 
              : 'scale-90 grayscale opacity-40'
          }`}
          style={activeTab === 'Tools' ? {
            filter: isDarkMode 
              ? 'brightness(0) saturate(100%) invert(87%) sepia(72%) saturate(6289%) hue-rotate(123deg) brightness(103%) contrast(106%)'
              : 'brightness(0) saturate(100%) invert(51%) sepia(97%) saturate(2054%) hue-rotate(0deg) brightness(103%) contrast(101%)'
          } : undefined}
        />
      </button>

      {/* Loves Tab */}
      <button
        onClick={() => {
          setActiveTab('Loves')
          playClickSound()
        }}
        className={`group flex h-15 w-15 lg:h-20 lg:w-20 cursor-pointer items-center justify-center rounded-full outline-none transition-all duration-200 first:ml-0 -ml-3 hover:scale-105 hover:brightness-105 active:scale-95 ${
          isDarkMode ? 'bg-dark-about-dialog-bg' : 'bg-[#FFFBE7]'
        }`}
      >
        <img 
          src={assets.star} 
          alt="Loves"
          className={`h-8 w-8 lg:h-10 lg:w-10 object-contain transition-all duration-300 ${
            activeTab === 'Loves' 
              ? 'scale-110 -rotate-6 opacity-100' 
              : 'scale-90 grayscale opacity-40'
          }`}
          style={activeTab === 'Loves' ? {
            filter: isDarkMode 
              ? 'brightness(0) saturate(100%) invert(87%) sepia(72%) saturate(6289%) hue-rotate(123deg) brightness(103%) contrast(106%)'
              : 'brightness(0) saturate(100%) invert(51%) sepia(97%) saturate(2054%) hue-rotate(0deg) brightness(103%) contrast(101%)'
          } : undefined}
        />
      </button>
    </div>
  );
}

function TechIcon({ tech, index, total, onHover, isDarkMode = false }: { tech: typeof techStack[0]; index: number; total: number; onHover: () => void; isDarkMode?: boolean }) {
  // Calculate position on circle
  const angle = (index * 360) / total - 90 // Start from top (-90 degrees)
  const radius = 36 // Percentage from center
  const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
  const y = 50 + radius * Math.sin((angle * Math.PI) / 180)

  return (
    <div
      onMouseEnter={onHover}
      className="absolute flex h-[88px] w-[88px] items-center justify-center sm:h-[100px] sm:w-[100px] transition-transform duration-300 hover:scale-110 cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div 
        className="relative flex h-full w-full items-center justify-center animate-counter-spin-slow">
        {isDarkMode ? (
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <circle cx="50" cy="50" r="48" fill="#0F1620" stroke="#0E1620" strokeWidth="2"/>
          </svg>
        ) : (
          <img
            src={assets.weaponCircle}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full"
          />
        )}
        <img
          src={tech.icon}
          alt={tech.name}
          title={tech.name}
          className="relative z-10 h-[60%] w-[60%] object-contain"
        />
      </div>
    </div>
  )
}

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<NavTab>('Dev')
  const { isDarkMode } = useTheme()

  const avatarMap = {
    Dev: assets.me1,
    Tools: assets.me3,
    Loves: assets.me2,
  }

  const charliSequence = [
    assets.charli.n1,
    assets.charli.n2,
    assets.charli.n3,
    assets.charli.n4,
    assets.charli.n5,
    assets.charli.n6,
    assets.charli.n7,
  ]

  const currentNoteIndex = useRef(0)

  const playNextNote = () => {
    const currentSound = charliSequence[currentNoteIndex.current];

    const audio = new Audio(currentSound);
    audio.volume = 0.02;

    audio.play().catch((err) => console.log("Waiting for user interaction to play audio", err));

    currentNoteIndex.current = (currentNoteIndex.current + 1) % charliSequence.length;
  }
  
  return (
    <section
      id="about"
      className={`relative px-4 py-24 transition-colors ${
        isDarkMode 
          ? 'bg-gradient-to-b from-dark-about-bg-start via-dark-about-bg-start to-dark-about-bg-end' 
          : 'bg-gradient-to-b from-sky-bottom via-sky-bottom to-[#ffebb7]'
      }`}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:ml-6 xl:ml-auto mb-10">
        <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5
            }}
            viewport={{ once: true }}
          className="relative">
          <NameTag 
            label="About" 
            size="responsive" 
            className="absolute -left-2 -top-6 z-10"
            isDarkMode={isDarkMode}
            darkBgColor="bg-dark-about-nametag-bg"
            darkTextColor="text-dark-about-text"
          />

          <div 
            className={`relative rounded-[92px] px-8 pb-10 pt-14 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-colors ${
              isDarkMode ? 'bg-dark-about-dialog-bg' : 'bg-[#FFFBE7]'
            }`}>

            <p className={`text-justify font-sans text-xl font-medium leading-[1.2] md:text-2xl transition-colors ${
              isDarkMode ? 'text-dark-about-text' : 'text-about-text'
            }`}>
              Hi! I&apos;m <span className={`rounded ${isDarkMode ? 'bg-dark-about-nametag-bg' : 'bg-about-bg'}`}> Alyssa Villegas!</span>&nbsp; 
              Driven by a passion for building meaningful &#40;and also whimsy!&#41; digital experiences, 
              I am a Computer Science student and frontend developer with a strong interest in UI/UX design. My current major is 
              Data Science and I am continuously expanding my knowledge in Software Engineering & Artificial Intelligence. 
              I am passionate about creating ❤︎⁠ whether it may be with developing digital experiences, painting art, or editing videos. I developed this
              site to not only showcase what I've built, but also to share a little bit of who I am and my personality :&#41;

            </p>
          </div>
          <img
              src={assets.heroPointer}
              alt=""
              aria-hidden
              className="absolute bottom-0 left-1/2 h-4 w-16 -translate-x-1/2 translate-y-1/2 animate-bounce"
            />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5
            }}
            viewport={{ once: true }}
          className="relative mx-auto aspect-square w-full max-w-[420px] animate-spin-slow">
          {techStack.map((tech, index) => (
            <TechIcon 
            key={tech.name} 
            tech={tech} 
            index={index} 
            total={techStack.length} 
            onHover={playNextNote}
            isDarkMode={isDarkMode}
            />
          ))}
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        {/*Avatar Phone*/}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5
            }}
            viewport={{ once: true }}
          className={`relative w-full max-w-[350px] h-[480px] mx-auto border-10 rounded-3xl overflow-hidden transition-colors shrink-0 mt-15 ${
            isDarkMode 
              ? 'bg-dark-about-dialog-bg border-dark-hero-dialog-bg' 
              : 'bg-[#FFFBE7] border-[#F2E7BE]'
          }`}>
          {/* Scrolling background layer */}
          <div 
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage: isDarkMode ? "url('/scrollingbgdark.png')" : "url('/scrollingbg.jpg')",
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
              width: "200%",
              height: "200%",
              animation: "scroll-bg-vertical 20s linear infinite"
            }}
          />
          {/* Static avatar layer */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="flex w-full items-center justify-center animate-wiggle">
            <img
              key={activeTab}
              src={avatarMap[activeTab]}
              alt=""
              className="h-auto w-7/8 animate-fade-in"
            />
            </div>
          </div>
        </motion.div>
        {/*Skills Screen*/}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5
            }}
            viewport={{ once: true }}
          className="relative mx-auto w-full max-w-[750px]">
          
          <NameTag 
            label={activeTab} 
            size="responsive" 
            className="absolute translate-y-15 z-10"
            isDarkMode={isDarkMode}
            darkBgColor="bg-dark-about-nametag-bg"
            darkTextColor="text-dark-about-text"
          />
          
          <CompactACNav 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            className="relative translate-x-35 translate-y-24 sm:translate-x-90 md:translate-x-140 lg:translate-x-130  sm:translate-y-20 -top-8 z-30"
            isDarkMode={isDarkMode}
          />
          <div className={`relative min-h-[300px] md:min-w-[750px] rounded-[92px] px-8 pb-10 pt-16 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-colors ${
            isDarkMode ? 'bg-dark-about-dialog-bg' : 'bg-[#FFFBE7]'
          }`}>
            
            {activeTab === 'Dev' && (
              <div className="animate-fade-in">
                <p className={`text-justify font-sans text-sm font-medium leading-[1.2] md:text-base mb-5 mt-5 lg:mt-0 transition-colors ${
                  isDarkMode ? 'text-dark-about-text' : 'text-about-text'
                }`}>
                  Languages and frameworks I'm currently learning!
                </p>
                
                {/* Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                  
                  {/* Programming Languages - Order 1 on mobile, Left column on desktop */}
                  <div className="order-1">
                    <h3 className={`font-roboto text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                      isDarkMode ? 'text-dark-about-chip-text/70' : 'text-about-text/60'
                    }`}>
                      Programming Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Java" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Python" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="JavaScript" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="TypeScript" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="SQL" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                    </div>
                  </div>

                  {/* Frontend - Order 2 on mobile, Right column on desktop */}
                  <div className="order-2">
                    <h3 className={`font-roboto text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                      isDarkMode ? 'text-dark-about-chip-text/70' : 'text-about-text/60'
                    }`}>
                      Frontend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="React" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Next.js" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Angular" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="HTML/CSS" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Tailwind CSS" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Three.js" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                    </div>
                  </div>

                  {/* Backend & Database - Order 3 on mobile, Left column on desktop */}
                  <div className="order-3">
                    <h3 className={`font-roboto text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                      isDarkMode ? 'text-dark-about-chip-text/70' : 'text-about-text/60'
                    }`}>
                      Backend & Database
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Node.js" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Express" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Supabase" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="PostgreSQL" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="MySQL" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Firebase" bgColor={isDarkMode ? 'bg-dark-about-chips-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                    </div>
                  </div>

                  {/* Data Science & AI - Order 4 on mobile, Right column on desktop */}
                  <div className="order-4">
                    <h3 className={`font-roboto text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                      isDarkMode ? 'text-dark-about-chip-text/70' : 'text-about-text/60'
                    }`}>
                      Data Science & AI
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Pandas" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="NumPy" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Scikit-learn" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="TensorFlow" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Jupyter" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Google Colab" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                    </div>
                  </div>

                  {/* Data Visualization & Analytics - Order 5 on mobile, Left column on desktop */}
                  <div className="order-5">
                    <h3 className={`font-roboto text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                      isDarkMode ? 'text-dark-about-chip-text/70' : 'text-about-text/60'
                    }`}>
                      Data Visualization & Analytics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Tableau" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Tableau Prep" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="SAS Viya" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                    </div>
                  </div>

                </div>
              </div>
            )}

            {activeTab === 'Tools' && (
              <div className="animate-fade-in">
                <p className={`text-justify font-sans text-sm font-medium leading-[1.2] md:text-base mb-5 mt-5 lg:mt-0 transition-colors ${
                  isDarkMode ? 'text-dark-about-text' : 'text-about-text'
                }`}>
                  Tools that I usually use in my projects :&#41;
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                  
                  {/* Development & Design */}
                  <div>
                    <h3 className={`font-roboto text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                      isDarkMode ? 'text-dark-about-chip-text/70' : 'text-about-text/60'
                    }`}>
                      Development & Design
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Cursor" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Kiro" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Figma" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Docker" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="pgAdmin" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Vercel" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                    </div>
                  </div>


                  {/* Digital Art & Video */}
                  <div>
                    <h3 className={`font-roboto text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                      isDarkMode ? 'text-dark-about-chip-text/70' : 'text-about-text/60'
                    }`}>
                      Digital Art & Video
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Procreate" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Clip Studio Paint" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Adobe Photoshop" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Adobe Premiere Pro" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Adobe After Effects" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                    </div>
                  </div>

                  {/* Data Visualization & Analytics */}
                  <div>
                    <h3 className={`font-roboto text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                      isDarkMode ? 'text-dark-about-chip-text/70' : 'text-about-text/60'
                    }`}>
                      Data Visualization & Analytics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Tableau" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="Tableau Prep" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                      <Chip label="SAS Viya" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                    </div>
                  </div>

                </div>
              </div>
            )}

            {activeTab === 'Loves' && (
              <div className="animate-fade-in">
                <p className={`text-justify font-sans text-sm font-medium leading-[1.2] md:text-base mb-5 mt-5 lg:mt-0 transition-colors ${
                  isDarkMode ? 'text-dark-about-text' : 'text-about-text'
                }`}>
                  I am a mosaic of everything I love ♥︎ 
                </p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="Cheese" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                  <Chip label="Oil Painting" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                  <Chip label="Digital Art" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                  <Chip label="Final Fantasy VII" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                  <Chip label="ACNH (Obviously)" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                  <Chip label="Rock Music" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                  <Chip label="One Piece" bgColor={isDarkMode ? 'bg-dark-about-chip-bg' : undefined} textColor={isDarkMode ? 'text-dark-about-chip-text' : undefined} />
                </div>
              </div>
            )}
            <img
              src={assets.heroPointer}
              alt=""
              aria-hidden
              className="absolute bottom-0 left-1/2 h-4 w-16 -translate-x-1/2 translate-y-1/2 animate-bounce"
            />

          </div>
        </motion.div>

      </div>

      {/* Design Principle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mx-auto mt-16 max-w-2xl"
      >
        <div className={`relative rounded-full    transition-colors flex items-center justify-center gap-4 ${
          isDarkMode ? 'bg-dark-about-dialog-bg' : 'bg-[#FFFBE7]'
        }`}>
          {/* Nooks Image */}
          <img 
            src="/nooks.png" 
            alt="Nooks"
            className="w-20 h-20 md:w-45 md:h-45 object-contain flex-shrink-0"
          />
          
          {/* Opening Quote Mark - Top Left */}
          <div className={`absolute -top-2 left-6 text-7xl font-light ${
              isDarkMode ? 'text-dark-about-text' : 'text-about-text'
            }`}>
            ❝
          </div>
          
          {/* Text */}
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className={`font-poppins text-lg md:text-2xl font-medium transition-colors ${
              isDarkMode ? 'text-dark-about-text' : 'text-about-text'
            }`}>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0, duration: 0.5 } }
                }}
                style={{ animation: 'text-rise 2s ease-in-out infinite 0.5s' }}
              >
                Design
              </motion.span>
              {' '}
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5 } }
                }}
                style={{ animation: 'text-rise 2s ease-in-out infinite 0.6s' }}
              >
                begins
              </motion.span>
              {' '}
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
                }}
                style={{ animation: 'text-rise 2s ease-in-out infinite 0.7s' }}
              >
                with
              </motion.span>
              {' '}
              <motion.span 
                className="inline-block bg-gradient-to-r from-red-500 to-orange-500 to-yellow-500 to-green-500 to-blue-500 to-purple-500 bg-[length:200%_auto] bg-clip-text text-transparent"
                variants={{
                  hidden: { opacity: 0, y: 0 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }
                }}
                style={{
                  backgroundImage: 'linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7, #ef4444)',
                  animation: 'text-rise 2s ease-in-out infinite 0.8s, gradient 3s ease infinite'
                }}
              >
                Empathy
              </motion.span>
            </p>
          </motion.div>
          
          {/* Closing Quote Mark - Bottom Right */}
          <div className={`absolute -bottom-4 right-4 text-7xl font-light ${
              isDarkMode ? 'text-dark-about-text' : 'text-about-text'
            }`}>
            ❞
          </div>
        </div>
      </motion.div>
    </section>
  )
}
