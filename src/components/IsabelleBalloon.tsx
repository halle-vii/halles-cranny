import { useEffect, useRef, useState } from 'react'
import { assets } from '../assets'

export function IsabelleBalloon() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isFlipped, setIsFlipped] = useState(false)
  const balloonRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const lastXRef = useRef(0)
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const section = document.getElementById('projects')
    if (!section) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      // Store target position relative to the section
      targetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      // Check if cursor moved left or right for flipping
      const deltaX = e.clientX - lastXRef.current
      if (Math.abs(deltaX) > 2) { // Threshold to avoid jitter
        setIsFlipped(deltaX < 0)
      }
      lastXRef.current = e.clientX
    }

    section.addEventListener('mousemove', handleMouseMove)

    // Smooth animation loop with easing (less springy)
    const animate = () => {
      const lagFactor = 0.03 // Much slower - reduced from 0.08
      
      // Simple linear interpolation - no spring physics
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lagFactor
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lagFactor

      setPosition({
        x: currentRef.current.x,
        y: currentRef.current.y,
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={balloonRef}
      className="absolute pointer-events-none z-30 transition-transform duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scaleX(${isFlipped ? -1 : 1})`,
        willChange: 'transform',
      }}
    >
      <img
        src={assets.isabelleBalloon}
        alt=""
        className="drop-shadow-lg object-contain"
        style={{
          width: '120px',
          height: 'auto',
        }}
        draggable={false}
      />
    </div>
  )
}
