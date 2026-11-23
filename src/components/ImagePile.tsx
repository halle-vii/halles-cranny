import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type ProjectImage = { src: string; alt: string }

export function ImagePile({
  images,
  projectName,
}: {
  images: readonly ProjectImage[]
  projectName: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [removedCount, setRemovedCount] = useState(0)
  const [expandedImage, setExpandedImage] = useState<ProjectImage | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/sounds/UI_MessageWindow_Open.wav')
    audioRef.current.volume = 0.5
  }, [])

  // Predefined subtle rotation angles for variety
  const rotations = [-3, 2, -4, 3, -2, 4, -1, 1]

  const handleClick = () => {
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(err => console.log('Audio play failed:', err))
    }
    
    setRemovedCount((prev) => prev + 1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handleExpand = (e: React.MouseEvent, image: ProjectImage) => {
    e.stopPropagation()
    setExpandedImage(image)
  }

  const handleCloseModal = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setExpandedImage(null)
  }

  // Calculate which images to show (current + next 3)
  const visibleImages = Array.from({ length: 4 }, (_, i) => {
    const index = (currentIndex + i) % images.length
    const image = images[index]
    const rotationIndex = (removedCount + i) % rotations.length
    const rotation = rotations[rotationIndex]
    return { image, rotation, zIndex: 4 - i, index }
  })

  const modalContent = expandedImage && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/80 p-4"
        style={{ zIndex: 999999, pointerEvents: 'auto' }}
        onClick={handleCloseModal}
      >
        {/* Close button - absolutely positioned at top right of viewport */}
        <div 
          className="fixed top-4 right-4"
          style={{ zIndex: 1000001, pointerEvents: 'auto' }}
        >
          <button
            type="button"
            onClick={handleCloseModal}
            onPointerDown={(e) => {
              e.stopPropagation()
              handleCloseModal()
            }}
            className="flex items-center justify-center w-12 h-12 text-white bg-black/70 hover:bg-black/90 transition-colors rounded-full border-2 border-white/20"
            aria-label="Close preview"
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative max-w-5xl max-h-[90vh] w-full"
          onClick={(e) => e.stopPropagation()}
          style={{ pointerEvents: 'auto' }}
        >
          {/* Expanded image with polaroid styling */}
          <div 
            className="bg-white rounded-lg p-8 shadow-2xl"
          >
            <img
              src={expandedImage.src}
              alt={expandedImage.alt}
              className="w-full h-full object-contain rounded-md max-h-[75vh]"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return (
    <>
      <div 
        className="relative w-full flex items-center justify-center"
        style={{ minHeight: '450px' }}
      >
        <div className="relative w-full max-w-[550px] aspect-[4/3]">
          <AnimatePresence mode="popLayout">
            {visibleImages.map(({ image, rotation, zIndex, index }, stackIndex) => {
              const isTop = stackIndex === 0
              
              return (
                <motion.div
                  key={`${index}-${removedCount + stackIndex}`}
                  initial={{ 
                    scale: 0.95,
                    opacity: 0,
                    rotate: rotation,
                    y: 20
                  }}
                  animate={{ 
                    scale: 1 - stackIndex * 0.02,
                    opacity: 1,
                    rotate: rotation,
                    y: stackIndex * 4,
                    x: stackIndex * 2
                  }}
                  exit={{ 
                    scale: 1.05,
                    opacity: 0,
                    rotate: rotation + (rotation > 0 ? 15 : -15),
                    x: rotation > 0 ? 300 : -300,
                    y: -100,
                    transition: { duration: 0.4 }
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className={`absolute inset-0 ${isTop ? 'cursor-pointer' : 'pointer-events-none'}`}
                  style={{ 
                    zIndex,
                  }}
                  onClick={isTop ? handleClick : undefined}
                  role={isTop ? "button" : undefined}
                  aria-label={isTop ? `View next ${projectName} image` : undefined}
                  tabIndex={isTop ? 0 : undefined}
                  onKeyDown={isTop ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleClick()
                    }
                  } : undefined}
                >
                  {/* Polaroid frame with white border and rounded corners */}
                  <div 
                    className="w-full h-full bg-white rounded-lg flex flex-col relative group"
                    style={{
                      padding: '24px 24px 56px 24px',
                      boxShadow: '0 8px 30px #C7A569',
                    }}
                  >
                    <div className="flex-1 overflow-hidden bg-gray-100 rounded-md">
                      <img
                        src={image?.src}
                        alt={image?.alt || `${projectName} screenshot`}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                    
                    {/* Expand button - only on top image */}
                    {isTop && (
                      <button
                        onClick={(e) => handleExpand(e, image!)}
                        className="absolute top-6 right-6 bg-white/90 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        aria-label="Expand image"
                      >
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Instruction text */}
        <p 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm whitespace-nowrap font-roboto font-bold"
          style={{ color: '#897C65' }}
        >
          Click to view next
        </p>
      </div>

      {/* Modal rendered via portal to document.body */}
      {expandedImage && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  )
}
