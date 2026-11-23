import { motion } from 'framer-motion'
import { useMemo } from 'react'

export function SandParticles({ isDarkMode }: { isDarkMode?: boolean }) {
  // Generate random particle positions and properties
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1, // 1-4px
      delay: Math.random() * 8,
      duration: Math.random() * 3 + 4, // 4-7s
    }))
  }, [])

  // Generate random starfish positions and properties
  const starfish = useMemo(() => {
    const colors = isDarkMode 
      ? ['#E89A6B', '#A8D5E2', '#FFB88C'] 
      : ['#FF9B85', '#B8E6F0', '#FFC5A3']
    
    return Array.from({ length: 18 }, (_, i) => ({ // Increased from 12 to 18
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      rotation: Math.random() * 360,
      delay: Math.random() * 5,
      duration: Math.random() * 2 + 2,
      cycleDelay: Math.random() * 8 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }, [isDarkMode])

  // Generate random seashell positions and properties
  const seashells = useMemo(() => {
    const shellTypes = [
      { 
        baseColor: '#FFB6C1', 
        accentColor: '#FF8FA3',
        pattern: 'stripes' 
      },
      { 
        baseColor: '#D4A373', 
        accentColor: '#FFF5E1',
        pattern: 'spots' 
      },
      { 
        baseColor: '#FFE5B4', 
        accentColor: '#FFD700',
        pattern: 'zigzag' 
      },
      { 
        baseColor: '#E6E6FA', 
        accentColor: '#D8BFD8',
        pattern: 'gradient' 
      },
      { 
        baseColor: '#8B7355', 
        accentColor: '#D2B48C',
        pattern: 'bands' 
      },
      { 
        baseColor: '#B19CD9', 
        accentColor: '#E6E6FA',
        pattern: 'solid' 
      },
    ]
    
    return Array.from({ length: 15 }, (_, i) => { // Increased from 10 to 15
      const shell = shellTypes[Math.floor(Math.random() * shellTypes.length)]
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        rotation: Math.random() * 360,
        delay: Math.random() * 6,
        duration: Math.random() * 2 + 2,
        cycleDelay: Math.random() * 10 + 3,
        ...shell,
      }
    })
  }, [])

  const particleColor = isDarkMode ? 'rgba(200, 180, 140, 0.4)' : 'rgba(255, 230, 180, 0.6)'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating sand particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particleColor,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Emerging/submerging starfish */}
      {starfish.map((star) => (
        <motion.div
          key={`starfish-${star.id}`}
          className="absolute"
          style={{
            left: star.left,
            top: star.top,
          }}
          initial={{ scale: 0, opacity: 0, rotate: star.rotation }}
          animate={{
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
            y: [10, 0, 0, 10],
          }}
          transition={{
            duration: star.duration * 2,
            repeat: Infinity,
            delay: star.delay,
            repeatDelay: star.cycleDelay,
            times: [0, 0.2, 0.8, 1],
            ease: 'easeInOut',
          }}
        >
          {/* Starfish SVG with rounded points */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={star.color}
          >
            <path 
              d="M12 1.5C12.5 2 13 6.5 13.5 8C14 9 14.5 9.5 16 9.5C17.5 9.5 20.5 9 21.5 9C21 9.5 17.5 11.5 16.5 12.5C15.5 13.5 15.5 14.5 16 16C16.5 17.5 18 20.5 18.5 21.5C18 21 15 18.5 13.5 17.5C12.5 16.8 11.5 16.8 10.5 17.5C9 18.5 6 21 5.5 21.5C6 20.5 7.5 17.5 8 16C8.5 14.5 8.5 13.5 7.5 12.5C6.5 11.5 3 9.5 2.5 9C3.5 9 6.5 9.5 8 9.5C9.5 9.5 10 9 10.5 8C11 6.5 11.5 2 12 1.5Z"
            />
          </svg>
        </motion.div>
      ))}

      {/* Emerging/submerging seashells */}
      {seashells.map((shell) => (
        <motion.div
          key={`shell-${shell.id}`}
          className="absolute"
          style={{
            left: shell.left,
            top: shell.top,
          }}
          initial={{ scale: 0, opacity: 0, rotate: shell.rotation }}
          animate={{
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
            y: [8, 0, 0, 8],
          }}
          transition={{
            duration: shell.duration * 2,
            repeat: Infinity,
            delay: shell.delay,
            repeatDelay: shell.cycleDelay,
            times: [0, 0.2, 0.8, 1],
            ease: 'easeInOut',
          }}
        >
          {/* Seashell SVG */}
          <svg
            width="22"
            height="18"
            viewBox="0 0 24 20"
            fill="none"
          >
            <defs>
              <linearGradient id={`shellGradient-${shell.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={shell.baseColor} />
                <stop offset="100%" stopColor={shell.accentColor} />
              </linearGradient>
            </defs>
            {/* Shell base */}
            <ellipse cx="12" cy="14" rx="11" ry="6" fill={`url(#shellGradient-${shell.id})`} />
            {/* Shell ridges */}
            <path
              d="M12 2 L12 14 M8 4 L10 14 M16 4 L14 14 M5 8 L7 14 M19 8 L17 14 M3 11 L5 14 M21 11 L19 14"
              stroke={shell.accentColor}
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* Shell pattern overlay based on type */}
            {shell.pattern === 'spots' && (
              <>
                <circle cx="8" cy="10" r="1.5" fill={shell.accentColor} opacity="0.7" />
                <circle cx="16" cy="10" r="1.5" fill={shell.accentColor} opacity="0.7" />
                <circle cx="12" cy="12" r="1.2" fill={shell.accentColor} opacity="0.7" />
              </>
            )}
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
