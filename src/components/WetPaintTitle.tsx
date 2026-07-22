import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

interface WetPaintTitleProps {
  title: string
  backgroundColor?: string
  textColor?: string
  dripCount?: number
  speed?: number
}

interface DripConfig {
  left: string
  height: number
  delay: number
}

export function WetPaintTitle({
  title,
  backgroundColor = '#ffebb7',
  textColor = '#eee9ca',
  dripCount = 4,
  speed = 1.5
}: WetPaintTitleProps) {
  const dripConfigs: DripConfig[] = [
    { left: '10%', height: 40, delay: 0.5 },
    { left: '25%', height: 15, delay: 3 },
    { left: '68%', height: 12, delay: 4.25 },
    { left: '88%', height: 40, delay: 1.5 }
  ]

  const visibleDrips = dripConfigs.slice(0, dripCount)
  const { isDarkMode } = useTheme()

  return (
    <div className="relative mx-auto mb-12 w-fit">
      <div className="relative">
        <img
          src={isDarkMode ? "/projectBubbleDark.svg" : "/projectBubble.svg"}
          alt=""
          aria-hidden
          className="h-[115px] w-[287px]"
        />
        {/* Drips positioned on the dialog box */}
        {visibleDrips.map((config, index) => (
          <Drip
            key={index}
            left={config.left}
            height={config.height}
            delay={config.delay}
            color={backgroundColor}
            speed={speed}
          />
        ))}
      </div>
      <h2 className="absolute inset-0 flex items-center justify-center font-roboto text-5xl font-bold md:text-5xl" style={{ color: textColor }}>
        {title}
      </h2>
    </div>
  )
}

interface DripProps {
  left: string
  height: number
  delay: number
  color: string
  speed: number
}

function Drip({ left, height, delay, color, speed }: DripProps) {
  const duration = 2 / speed
  const repeatDelay = 2 / speed

  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: -10,
        left,
        transformOrigin: 'top'
      }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration,
        times: [0, 0.25, 1],
        delay,
        ease: 'easeIn',
        repeat: Infinity,
        repeatDelay
      }}
    >
      {/* Main drip body */}
      <div
        style={{
          height,
          width: 14,
          borderBottomLeftRadius: 9999,
          borderBottomRightRadius: 9999,
          background: color
        }}
      />
      
      {/* Right corner */}
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          left: '100%',
          top: 0
        }}
      >
        <g clipPath="url(#clip-right)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip-right">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* Left corner */}
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          right: '100%',
          top: 0,
          transform: 'rotate(90deg)'
        }}
      >
        <g clipPath="url(#clip-left)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip-left">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* Falling droplet */}
      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ 
          y: [-8, 50],
          opacity: [1, 0]
        }}
        transition={{
          duration,
          times: [0, 1],
          delay,
          ease: 'easeIn',
          repeat: Infinity,
          repeatDelay
        }}
        style={{
          position: 'absolute',
          top: '100%',
          height: 16,
          width: 16,
          borderRadius: 9999,
          background: color
        }}
      />
    </motion.div>
  )
}
