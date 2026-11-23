export function AnimatedSandBackground({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Moving gradient waves - subtle sand dune effect */}
      <div
        className="absolute inset-0"
        style={{
          background: isDarkMode 
            ? `
              radial-gradient(ellipse 150% 100% at 20% 50%, rgba(127, 89, 65, 0.4) 0%, rgba(127, 89, 65, 0.2) 40%, transparent 70%),
              radial-gradient(ellipse 150% 100% at 80% 50%, rgba(100, 70, 50, 0.3) 0%, rgba(100, 70, 50, 0.15) 40%, transparent 70%)
            `
            : `
              radial-gradient(ellipse 150% 100% at 20% 50%, rgba(255, 220, 150, 0.4) 0%, rgba(255, 220, 150, 0.2) 40%, transparent 70%),
              radial-gradient(ellipse 150% 100% at 80% 50%, rgba(255, 200, 120, 0.3) 0%, rgba(255, 200, 120, 0.15) 40%, transparent 70%)
            `,
          backgroundSize: '200% 100%, 200% 100%',
          animation: 'sand-wave 20s ease-in-out infinite',
        }}
      />
      
      {/* Shimmer effect - like heat rising from sand */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: isDarkMode
            ? 'linear-gradient(90deg, transparent 0%, rgba(200, 180, 150, 0.15) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
          animation: 'shimmer 8s ease-in-out infinite',
          width: '50%',
          height: '100%',
        }}
      />
      
      {/* Second shimmer layer for more depth */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: isDarkMode
            ? 'linear-gradient(90deg, transparent 0%, rgba(180, 160, 130, 0.1) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 220, 0.3) 50%, transparent 100%)',
          animation: 'shimmer 12s ease-in-out infinite',
          animationDelay: '4s',
          width: '50%',
          height: '100%',
        }}
      />
    </div>
  )
}
