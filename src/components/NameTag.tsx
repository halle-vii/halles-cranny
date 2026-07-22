type NameTagProps = {
  label: string
  size?: 'sm' | 'md' | 'lg' | 'responsive'
  className?: string
  isDarkMode?: boolean
  darkBgColor?: string
  darkTextColor?: string
}

const sizeClasses = {
  sm: 'px-6 py-1.5 text-[32px]',
  md: 'px-8 py-1.5 text-[40px]',
  lg: 'px-10 py-2 text-5xl',
  responsive: 'px-6 py-1.5 text-[32px] sm:px-10 sm:py-2 sm:text-5xl',
}

export function NameTag({ 
  label, 
  size = 'md', 
  className = '',
  isDarkMode = false,
  darkBgColor = 'bg-tag-orange',
  darkTextColor = 'text-off-white'
}: NameTagProps) {
  return (
    <span
      className={`inline-block -rotate-[7deg] rounded-[40px] font-roboto font-medium shadow-sm transition-colors ${sizeClasses[size]} ${
        isDarkMode 
          ? `${darkBgColor} ${darkTextColor}` 
          : 'bg-tag-orange text-off-white'
      } ${className}`}
    >
      {label}
    </span>
  )
}
