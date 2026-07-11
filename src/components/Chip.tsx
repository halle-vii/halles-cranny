import { useRef } from 'react'

export interface ChipProps {
  label: string
  /** Background color (Tailwind class or hex) */
  bgColor?: string
  /** Text color (Tailwind class or hex) */
  textColor?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Optional icon before the label */
  icon?: string
  /** Optional sound file path to play on click */
  clickSound?: string
  /** Optional click handler */
  onClick?: () => void
  /** Additional CSS classes */
  className?: string
  /** Hover animation variant */
  hoverEffect?: 'scale' | 'bounce' | 'wiggle' | 'none'
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm',
  md: 'px-3 py-1.5 text-sm sm:px-4 sm:py-2.5 sm:text-base',
  lg: 'px-4 py-2 text-base sm:px-8 sm:py-3 sm:text-lg',
}

const hoverEffects = {
  scale: 'hover:scale-110',
  bounce: 'hover:animate-bounce',
  wiggle: 'hover:animate-wiggle',
  none: '',
}

export function Chip({
  label,
  bgColor = 'bg-[#FFEECE]',
  textColor = 'text-[#725d42]',
  size = 'md',
  icon,
  clickSound,
  onClick,
  className = '',
  hoverEffect = 'scale',
}: ChipProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleClick = () => {
    // Play sound if provided
    if (clickSound) {
      if (!audioRef.current) {
        audioRef.current = new Audio(clickSound)
      }
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }

    // Call onClick handler if provided
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-full font-roboto font-medium
        shadow-[inset_0_-3px_0_rgba(0,0,0,0.1)]
        transition-all duration-200 
        active:scale-95 active:shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]
        ${sizeClasses[size]}
        ${bgColor}
        ${textColor}
        ${hoverEffects[hoverEffect]}
        ${className}
      `}
    >
      {icon && (
        <img 
          src={icon} 
          alt="" 
          className="h-5 w-5 object-contain"
        />
      )}
      {label}
    </button>
  )
}
