interface CurvedMarqueeBannerProps {
  text: string
  backgroundColor?: string
  textColor?: string
}

export function CurvedMarqueeBanner({ 
  text, 
  backgroundColor = '#78C3AE',
  textColor = '#eee9ca'
}: CurvedMarqueeBannerProps) {
  // Create a very long repeated string to avoid needing two layers
  const repeatedText = `${text} ✦ `.repeat(50)
  
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden mb-12">
      <svg 
        className="w-full"
        viewBox="0 0 2880 240"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Define the wave path for text to follow - positioned lower */}
          <path
            id="textPath"
            d="M 0,135 Q 360,85 720,135 Q 1080,185 1440,135 Q 1800,85 2160,135 Q 2520,185 2880,135"
            fill="none"
          />
        </defs>
        
        {/* Wave background ribbon - spans full width */}
        <path 
          d="M 0,80 Q 360,30 720,80 Q 1080,130 1440,80 Q 1800,30 2160,80 Q 2520,130 2880,80 L 2880,160 Q 2520,210 2160,160 Q 1800,110 1440,160 Q 1080,210 720,160 Q 360,110 0,160 Z" 
          fill={backgroundColor}
        />
        
        {/* Single text layer with very long string - no overlap */}
        <text 
          fill={textColor}
          fontSize="56"
          fontFamily="'Roboto Mono', monospace"
          fontWeight="700"
          letterSpacing="-2"
        >
          <textPath href="#textPath" startOffset="0%">
            <animate
              attributeName="startOffset"
              from="0%"
              to="-200%"
              dur="80s"
              repeatCount="indefinite"
            />
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
