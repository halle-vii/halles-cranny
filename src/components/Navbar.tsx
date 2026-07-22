import type { SectionId } from '../assets'
import { navItems } from '../assets'
import { useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'

type NavbarProps = {
  activeSection: SectionId
}

export function Navbar({ activeSection }: NavbarProps) {
  const { isDarkMode } = useTheme()
  const clickSound = useRef(new Audio("./sounds/System_Camera_Move_Zoom_In.wav"))
  const hoverSound = useRef(new Audio("./sounds/UI_Cmn_Open_Small_Short.wav"))
  const playClickSound = () => {
    clickSound.current.currentTime = 0;
    clickSound.current.play();
  }
  const playHoverSound = () => {
    hoverSound.current.currentTime = 0;
    hoverSound.current.play();
  }
  return (
    <header className="fixed inset-x-0 top-0 z-50 block px-3 pt-4 sm:px-4 sm:pt-6">
      <nav
        aria-label="Primary"
        className={`relative mx-auto flex h-[55px] w-full max-w-[610px] items-center justify-between rounded-[50px] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-colors sm:h-[67px] sm:px-2 ${
          isDarkMode ? 'bg-dark-nav-bg' : 'bg-eggshell'
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative flex h-[47px] min-w-0 flex-1 items-center justify-center rounded-[50px] font-poppins text-[18px] font-bold tracking-tight transition-colors sm:h-[50px] sm:min-w-[109px] sm:flex-none sm:px-4 sm:text-2xl sm:tracking-[-0.67px] ${
                isDarkMode
                  ? isActive
                    ? 'bg-dark-nav-active-bg text-dark-nav-active-text'
                    : 'text-dark-nav-text hover:bg-dark-nav-text/10'
                  : isActive
                    ? 'bg-leaf-green text-eggshell'
                    : 'text-leaf-green hover:bg-leaf-green/10'
              }`}
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
            >
              {item.label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
