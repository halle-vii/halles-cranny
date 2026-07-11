type NameTagProps = {
  label: string
  size?: 'sm' | 'md' | 'lg' | 'responsive'
  className?: string
}

const sizeClasses = {
  sm: 'px-6 py-1.5 text-[32px]',
  md: 'px-8 py-1.5 text-[40px]',
  lg: 'px-10 py-2 text-5xl',
  responsive: 'px-6 py-1.5 text-[32px] sm:px-10 sm:py-2 sm:text-5xl',
}

export function NameTag({ label, size = 'md', className = '' }: NameTagProps) {
  return (
    <span
      className={`inline-block -rotate-[7deg] rounded-[40px] bg-tag-orange font-roboto font-medium text-off-white shadow-sm ${sizeClasses[size]} ${className}`}
    >
      {label}
    </span>
  )
}
