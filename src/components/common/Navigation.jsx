import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '../../hooks/useGSAP'
import { useThunderSounds } from '../../hooks/useSounds'
import { Button } from '../ui/button'
import { Menu, X, Github, ExternalLink } from 'lucide-react'

const Navigation = ({ scrollTo }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { playClick, playHover } = useThunderSounds()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animation for navigation
  useGSAP(() => {
    gsap.fromTo('.nav-logo',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.2 }
    )

    gsap.fromTo('.nav-links',
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.5 }
    )

    gsap.fromTo('.nav-cta',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.7 }
    )
  }, [])

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'who-we-are' },
    { name: 'Services', id: 'what-we-do' },
    { name: 'Projects', id: 'projects' },
    { name: 'Team', id: 'team' },
    { name: 'Contact', id: 'cta' }
  ]

  const handleNavClick = (sectionId) => {
    playClick()

    const element = document.getElementById(sectionId)
    if (element && scrollTo) {
      scrollTo(element, { offset: -80 })
    }

    setIsOpen(false)
  }

  const toggleMenu = () => {
    playClick()
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="nav-logo flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleNavClick('hero')}
            >
              <div className="text-3xl group-hover:animate-thunder transition-all duration-300">
                ⚡
              </div>
              <div className="font-bold text-xl">
                <span className="text-gradient-primary">Silent</span>
                <span className="text-white mx-1">Thunder</span>
                <span className="text-gradient-secondary">Squad</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className="nav-links text-white/80 hover:text-white transition-colors duration-200 font-medium relative group"
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => playHover()}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block nav-cta">
              <Button
                variant="thunder"
                onClick={() => {
                  playClick()
                  window.open('https://github.com/silent-thunder-squad', '_blank')
                }}
                onMouseEnter={() => playHover()}
              >
                <Github className="mr-2 w-4 h-4" />
                GitHub
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMenu}
              onMouseEnter={() => playHover()}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-80 glass border-l border-white/20 p-6">
            <div className="flex flex-col space-y-6 mt-20">
              {/* Mobile Navigation Links */}
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  className="text-left text-white/80 hover:text-white text-lg font-medium transition-colors duration-200 py-3 border-b border-white/10 hover:border-white/30"
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => playHover()}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.5s ease-out forwards'
                  }}
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile CTA */}
              <div className="pt-6">
                <Button
                  variant="thunder"
                  className="w-full"
                  onClick={() => {
                    playClick()
                    window.open('https://github.com/silent-thunder-squad', '_blank')
                    setIsOpen(false)
                  }}
                >
                  <Github className="mr-2 w-4 h-4" />
                  View on GitHub
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 pt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    playClick()
                    window.open('https://twitter.com/silentthundersquad', '_blank')
                  }}
                >
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyframes for mobile menu animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default Navigation