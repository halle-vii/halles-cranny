import { UnicornScene } from 'unicornstudio-react'
import { memo, useEffect, useRef, useState } from 'react'

interface StableUnicornSceneProps {
  jsonFilePath: string
  width?: string
  height?: string
  scale?: number
  dpi?: number
  sdkUrl?: string
}

// Memoized component that only re-renders when jsonFilePath changes
export const StableUnicornScene = memo(function StableUnicornScene({
  jsonFilePath,
  width = "100%",
  height = "100%",
  scale = 1,
  dpi = 1.5,
  sdkUrl = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.6/dist/unicornStudio.umd.js"
}: StableUnicornSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Debounce resize events to prevent flickering
  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        // Force a small layout recalc without remounting
        if (containerRef.current) {
          containerRef.current.style.opacity = '0.99'
          requestAnimationFrame(() => {
            if (containerRef.current) {
              containerRef.current.style.opacity = '1'
            }
          })
        }
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!isLoaded) {
    return <div style={{ width, height }} />
  }

  return (
    <div 
      ref={containerRef}
      style={{ 
        width, 
        height,
        transition: 'opacity 0.1s ease-out'
      }}
    >
      <UnicornScene
        jsonFilePath={jsonFilePath}
        width={width}
        height={height}
        scale={scale}
        dpi={dpi}
        sdkUrl={sdkUrl}
      />
    </div>
  )
}, (prevProps, nextProps) => {
  // Only re-render if jsonFilePath changes
  return prevProps.jsonFilePath === nextProps.jsonFilePath
})
