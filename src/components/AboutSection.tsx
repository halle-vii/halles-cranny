import { assets } from '../assets'
import { NameTag } from './NameTag'
import { useState, useRef } from 'react'
import { Chip } from './Chip'
import { motion } from 'framer-motion';

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
}

function CompactACNav({ activeTab, setActiveTab, className = '' }: CompactACNavProps) {
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
        className="group flex h-15 w-15 lg:h-20 lg:w-20 cursor-pointer items-center justify-center rounded-full bg-[#FFFBE7] outline-none transition-all duration-200 first:ml-0 -ml-3  hover:scale-105 hover:brightness-105 active:scale-95"
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
            filter: 'brightness(0) saturate(100%) invert(51%) sepia(97%) saturate(2054%) hue-rotate(0deg) brightness(103%) contrast(101%)'
          } : undefined}
        />
      </button>

      {/* Tools Tab */}
      <button
        onClick={() => {
          setActiveTab('Tools')
          playClickSound()
        }}
        className="group flex  h-15 w-15 lg:h-20 lg:w-20 cursor-pointer items-center justify-center rounded-full bg-[#FFFBE7] outline-none transition-all duration-200 first:ml-0 -ml-3  hover:scale-105 hover:brightness-105 active:scale-95"
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
            filter: 'brightness(0) saturate(100%) invert(51%) sepia(97%) saturate(2054%) hue-rotate(0deg) brightness(103%) contrast(101%)'
          } : undefined}
        />
      </button>

      {/* Loves Tab */}
      <button
        onClick={() => {
          setActiveTab('Loves')
          playClickSound()
        }}
        className="group flex h-15 w-15 lg:h-20 lg:w-20 cursor-pointer items-center justify-center rounded-full bg-[#FFFBE7] outline-none transition-all duration-200 first:ml-0 -ml-3 hover:scale-105 hover:brightness-105 active:scale-95"
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
            filter: 'brightness(0) saturate(100%) invert(51%) sepia(97%) saturate(2054%) hue-rotate(0deg) brightness(103%) contrast(101%)'
          } : undefined}
        />
      </button>
    </div>
  );
}

function TechIcon({ tech, index, total, onHover }: { tech: typeof techStack[0]; index: number; total: number; onHover: () => void; }) {
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
        <img
          src={assets.weaponCircle}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full"
        />
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
      className="relative bg-gradient-to-b from-sky-bottom via-sky-bottom to-[#ffebb7] px-4 py-24"
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
          <NameTag label="About" size="responsive" className="absolute -left-2 -top-6 z-10" />

          <div 
            className="relative rounded-[92px] bg-[#FFFBE7] px-8 pb-10 pt-14 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">

            <p className="text-justify font-sans text-xl font-medium leading-[1.2] text-about-text md:text-2xl">
              Hiya! I&apos;m <span className="bg-about-bg rounded"> Alyssa Villegas!</span>&nbsp; 
              Driven by a passion for building meaningful &#40;and maybe whimsy!&#41; digital experiences, 
              I am currently a Computer Science student specializing in Data Science with interests
              spanning Software Engineering, Artificial Intelligence, and UI/UX Design. I am passionate about
              creating ❤︎⁠ whether it may be with developing software, painting art, or editing videos. I developed this
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
            />
          ))}
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-4xl items-start gap-8 md:grid-cols-[0.9fr_1.1fr]">
        {/*Avatar Phone*/}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5
            }}
            viewport={{ once: true }}
          className="relative w-full max-w-[300px] h-[400px] mx-auto bg-[#FFFBE7] border-10 border-[#F2E7BE] rounded-3xl overflow-hidden">
          {/* Scrolling background layer */}
          <div 
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage: "url('/scrollingbg.jpg')",
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
          className="relative mx-auto w-full max-w-[450px]">
          
          <NameTag label={activeTab} size="responsive" className="absolute translate-y-15 z-10" />
          
          <CompactACNav 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            className="relative translate-x-35 translate-y-24 sm:translate-x-70 lg:translate-x-60  sm:translate-y-20 -top-8 z-30" 
          />
          <div className="relative min-h-[300px] md:min-w-[450px] rounded-[92px] bg-[#FFFBE7] px-8 pb-10 pt-16 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
            
            {activeTab === 'Dev' && (
              <div className="animate-fade-in">
                <p className="text-justify font-sans text-sm font-medium leading-[1.2] text-about-text md:text-base mb-5 mt-5 lg:mt-0">
                  Languages and frameworks I'm currently learning!
                </p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="Java"  />
                  <Chip label="Python"  />
                  <Chip label="JavaScript" />
                  <Chip label="TypeScript" />
                  <Chip label="React" />
                  <Chip label="Next.js" />
                  <Chip label="Angular"/>
                  <Chip label="HTML/CSS" />
                </div>
              </div>
            )}

            {activeTab === 'Tools' && (
              <div className="animate-fade-in">
                <p className="text-justify font-sans text-sm font-medium leading-[1.2] text-about-text md:text-base mb-5 mt-5 lg:mt-0">
                  Tools that I usually use in my projects :&#41;
                </p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="Kiro / VS Code"  />
                  <Chip label="Figma"  />
                  <Chip label="Google Colab" />
                  <Chip label="Procreate" />
                  <Chip label="Clip Studio Paint" />
                  <Chip label="Adobe Photoshop" />
                  <Chip label="Adobe Premiere Pro" />
                  <Chip label="Adobe After Effects" />
                </div>
              </div>
            )}

            {activeTab === 'Loves' && (
              <div className="animate-fade-in">
                <p className="text-justify font-sans text-sm font-medium leading-[1.2] text-about-text md:text-base mb-5 mt-5 lg:mt-0">
                  I am a mosaic of everything I love ♥︎ 
                </p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="Cheese" />
                  <Chip label="Oil Painting" />
                  <Chip label="Digital Art" />
                  <Chip label="Final Fantasy VII"  />
                  <Chip label="ACNH (Obviously)"/>
                  <Chip label="Rock Music" />
                  <Chip label="One Piece" />
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
    </section>
  )
}
