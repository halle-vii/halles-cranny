import { motion, AnimatePresence } from 'framer-motion'

interface ThemeImageProps {
  lightSrc: string
  darkSrc: string
  isDarkMode: boolean
  alt?: string
  className?: string
  'aria-hidden'?: boolean
}

export function ThemeImage({ lightSrc, darkSrc, isDarkMode, alt = '', className = '', ...props }: ThemeImageProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={isDarkMode ? 'dark' : 'light'}
        src={isDarkMode ? darkSrc : lightSrc}
        alt={alt}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        {...props}
      />
    </AnimatePresence>
  )
}
