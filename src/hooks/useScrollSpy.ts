import { useEffect, useState } from 'react'
import type { SectionId } from '../assets'

export function useScrollSpy(sectionIds: SectionId[]) {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as SectionId)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
