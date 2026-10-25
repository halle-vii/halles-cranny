import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from './ui/carousel'

type ProjectImage = { src: string; alt: string; caption?: string }

export function ProjectCarousel({
  projectName,
  images,
  aspectRatio = '2 / 1',
}: {
  projectName: string
  images: readonly ProjectImage[]
  aspectRatio?: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  const reduceMotion = useReducedMotion()
  const { isDarkMode } = useTheme()
  const hasMultipleImages = images.length > 1
  const activeImage = images[activeIndex] ?? images[0]

  useEffect(() => {
    if (!api) return

    const syncSelection = () => setActiveIndex(api.selectedScrollSnap())
    syncSelection()
    api.on('select', syncSelection)
    api.on('reInit', syncSelection)

    return () => {
      api.off('select', syncSelection)
      api.off('reInit', syncSelection)
    }
  }, [api])

  if (!activeImage) return null

  const buttonClass = `static h-11 w-11 translate-x-0 translate-y-0 shrink-0 border-0 shadow-none items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
    isDarkMode ? 'bg-dark-hero-nametag-bg text-dark-about-text hover:bg-dark-about-chip-bg' : 'bg-tan text-about-text hover:bg-off-white'
  }`

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: hasMultipleImages, duration: reduceMotion ? 0 : 25, watchDrag: hasMultipleImages }}
      aria-label={`${projectName} screenshots`}
      tabIndex={hasMultipleImages ? 0 : undefined}
      onKeyDown={(event) => {
        if (!hasMultipleImages) return
        if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault()
          api?.scrollTo(event.key === 'Home' ? 0 : images.length - 1)
        }
      }}
      className={`min-w-0 rounded-[32px] focus-visible:outline-2 focus-visible:outline-offset-8 ${isDarkMode ? 'text-dark-about-text' : 'text-about-text'}`}
    >
      <div className="overflow-hidden rounded-[32px] bg-off-white shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
        <CarouselContent className="ml-0 touch-pan-y pinch-zoom">
          {images.map((image, index) => (
            <CarouselItem
              key={image.src}
              aria-label={`${index + 1} of ${images.length}: ${image.caption ?? image.alt}`}
              className="pl-0"
              style={{ aspectRatio }}
            >
              <img
                src={image.src}
                alt={image.alt}
                draggable={false}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      {(hasMultipleImages || activeImage.caption) && <div className="mt-4 flex items-center gap-2 sm:gap-3">
        {hasMultipleImages && (
          <CarouselPrevious type="button" aria-label={`Previous ${projectName} screenshot`} className={buttonClass} />
        )}
        <div className="min-w-0 flex-1 text-center">
          <p aria-live="polite" aria-atomic="true" className="text-sm font-bold">
            {activeImage.caption}
            {hasMultipleImages && <span className="ml-2 font-normal">{activeIndex + 1} / {images.length}</span>}
          </p>
          {hasMultipleImages && (
            <div className="flex justify-center" role="group" aria-label="Choose screenshot">
              {images.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  aria-label={`Show ${projectName} screenshot ${index + 1}: ${item.caption ?? item.alt}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => api?.scrollTo(index)}
                  className="flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <span className={`h-2 rounded-full bg-current transition-[width,opacity] motion-reduce:transition-none ${index === activeIndex ? 'w-5' : 'w-2 opacity-40'}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        {hasMultipleImages && (
          <CarouselNext type="button" aria-label={`Next ${projectName} screenshot`} className={buttonClass} />
        )}
      </div>}
    </Carousel>
  )
}
