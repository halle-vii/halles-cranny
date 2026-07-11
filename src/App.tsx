import { navItems } from './assets'
import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'
import { HeroSection } from './components/HeroSection'
import { Navbar } from './components/Navbar'
import { ProjectsSection } from './components/ProjectsSection'
import { useScrollSpy } from './hooks/useScrollSpy'

function App() {
  const activeSection = useScrollSpy(navItems.map((item) => item.id))

  return (
    <div className="overflow-x-hidden">
      <Navbar activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
