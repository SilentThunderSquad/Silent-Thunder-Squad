import { useEffect } from 'react'
import { useLenis } from './hooks/useLenis'
import { useSoundManager, useScrollSounds, useThunderSounds } from './hooks/useSounds'

// Import sections
import HeroSection from './components/sections/HeroSection'
import WhoWeAreSection from './components/sections/WhoWeAreSection'
import WhatWeDoSection from './components/sections/WhatWeDoSection'
import ProjectShowcaseSection from './components/sections/ProjectShowcaseSection'
import TeamMembersSection from './components/sections/TeamMembersSection'
import CallToActionSection from './components/sections/CallToActionSection'
import Footer from './components/sections/Footer'

// Import common components
import ScrollProgress from './components/common/ScrollProgress'
import SoundToggle from './components/common/SoundToggle'

function App() {
  // Initialize smooth scrolling
  const { scrollTo } = useLenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    mouseMultiplier: 1,
    touchMultiplier: 2,
  })

  // Initialize sound management
  const { isMuted, toggleMute } = useSoundManager()
  const { playThunder } = useThunderSounds()

  // Add scroll sounds
  useScrollSounds()

  useEffect(() => {
    // Play initial thunder sound after a short delay
    const timer = setTimeout(() => {
      if (!isMuted) {
        playThunder()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [isMuted, playThunder])

  return (
    <div className="min-h-screen bg-gradient-bg text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Sound Toggle */}
      <SoundToggle isMuted={isMuted} onToggle={toggleMute} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="hero" className="relative">
          <HeroSection />
        </section>

        {/* Who We Are Section */}
        <section id="who-we-are" className="relative">
          <WhoWeAreSection />
        </section>

        {/* What We Do Section */}
        <section id="what-we-do" className="relative">
          <WhatWeDoSection />
        </section>

        {/* Project Showcase Section */}
        <section id="projects" className="relative">
          <ProjectShowcaseSection />
        </section>

        {/* Team Members Section */}
        <section id="team" className="relative">
          <TeamMembersSection />
        </section>

        {/* Call to Action Section */}
        <section id="cta" className="relative">
          <CallToActionSection />
        </section>

        {/* Footer */}
        <Footer scrollTo={scrollTo} />
      </main>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-noise opacity-5 mix-blend-multiply" />
      </div>
    </div>
  )
}

export default App