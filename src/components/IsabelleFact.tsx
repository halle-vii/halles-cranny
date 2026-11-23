import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../assets'

const funFacts = [
  "Halle loves cheese!",
  "Halle's favorite color is green!",
  "Halle designed this whole website!",
  "Halle is a coffee enthusiast!",
  "Halle enjoys playing video games!",
  "Halle loves 5 Seconds of Summer",
  "Halle loves One Piece!",
  "Halle is passionate about making art!",
  "Halle loves a dog named Porky",
  "Halle has 5 birds",
]

export function IsabelleFact() {
  const [isHovered, setIsHovered] = useState(false)
  const [currentFact, setCurrentFact] = useState(() => 
    funFacts[Math.floor(Math.random() * funFacts.length)]
  )
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/Manpu_16_A.wav')
    audioRef.current.volume = 0.5
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    // Pick a new random fact on each hover
    setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)])
    
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(err => console.log('Audio play failed:', err))
    }
  }

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Isabelle face with wiggle animation and hover scale */}
      <motion.div 
        className={`relative z-10 cursor-pointer ${!isHovered ? 'animate-wiggle' : ''}`}
        animate={{ 
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        <img
          src={isHovered ? assets.isabelleTalk : assets.isabelleFace}
          alt="Isabelle"
          className="w-12 h-12 sm:w-14 sm:h-14"
          draggable={false}
        />
      </motion.div>

      {/* Speech bubble */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-12 sm:left-14 top-1/2 -translate-y-1/2 ml-2 z-20"
          >
            <div className="relative bg-white rounded-2xl shadow-lg px-4 py-2.5 max-w-xs">
              {/* Speech bubble tail */}
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2"
                style={{
                  width: 0,
                  height: 0,
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: '10px solid white',
                }}
              />
              
              {/* Fun fact text */}
              <p 
                className="text-sm sm:text-base font-roboto font-medium whitespace-nowrap"
                style={{ color: '#5C9461' }}
              >
                {currentFact}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
