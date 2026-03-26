import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '../../hooks/useGSAP'
import { useThunderSounds } from '../../hooks/useSounds'
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Heart,
  ArrowUp,
  Code,
  Coffee,
  MapPin,
  Calendar
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

gsap.registerPlugin(ScrollTrigger)

const Footer = ({ scrollTo }) => {
  const footerRef = useRef()
  const contentRef = useRef()

  const { playClick, playHover } = useThunderSounds()

  // Footer animation
  useGSAP(() => {
    gsap.fromTo(contentRef.current.children,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true
        }
      }
    )
  }, [])

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", id: "who-we-are" },
        { name: "Our Work", id: "what-we-do" },
        { name: "Projects", id: "projects" },
        { name: "Team", id: "team" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Web Development", external: true },
        { name: "Mobile Apps", external: true },
        { name: "AI/ML Solutions", external: true },
        { name: "DevOps", external: true }
      ]
    },
    {
      title: "Connect",
      links: [
        { name: "GitHub", url: "https://github.com/silent-thunder-squad" },
        { name: "LinkedIn", url: "https://linkedin.com/company/silent-thunder-squad" },
        { name: "Twitter", url: "https://twitter.com/silentthundersquad" },
        { name: "Email", url: "mailto:contact@silentthundersquad.com" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", external: true },
        { name: "Blog", external: true },
        { name: "Open Source", url: "https://github.com/silent-thunder-squad" },
        { name: "Community", external: true }
      ]
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/silent-thunder-squad",
      color: "hover:text-gray-300"
    },
    {
      icon: Twitter,
      label: "Twitter",
      url: "https://twitter.com/silentthundersquad",
      color: "hover:text-blue-400"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/company/silent-thunder-squad",
      color: "hover:text-blue-500"
    },
    {
      icon: Mail,
      label: "Email",
      url: "mailto:contact@silentthundersquad.com",
      color: "hover:text-green-400"
    }
  ]

  const handleNavClick = (sectionId) => {
    playClick()
    const element = document.getElementById(sectionId)
    if (element && scrollTo) {
      scrollTo(element, { offset: -80 })
    }
  }

  const handleExternalClick = (url) => {
    playClick()
    window.open(url, '_blank')
  }

  const scrollToTop = () => {
    playClick()
    if (scrollTo) {
      scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer
      ref={footerRef}
      className="relative bg-black/40 border-t border-white/10 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div ref={contentRef}>
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6 group">
                <div className="text-3xl group-hover:animate-thunder transition-all duration-300">
                  ⚡
                </div>
                <div className="font-bold text-xl">
                  <span className="text-gradient-primary">Silent</span>
                  <span className="text-white mx-1">Thunder</span>
                  <span className="text-gradient-secondary">Squad</span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                A passionate collective of Computer Science students building innovative solutions
                for real-world problems. We transform ideas into powerful digital experiences
                through cutting-edge technology and creative thinking.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 glass rounded-lg">
                  <div className="text-2xl font-bold text-gradient-primary">6+</div>
                  <div className="text-xs text-gray-400">Team Members</div>
                </div>
                <div className="text-center p-3 glass rounded-lg">
                  <div className="text-2xl font-bold text-gradient-secondary">15+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <Button
                      key={index}
                      variant="glass"
                      size="icon"
                      onClick={() => handleExternalClick(social.url)}
                      onMouseEnter={() => playHover()}
                      className={`transition-all duration-200 hover:scale-110 ${social.color}`}
                      title={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.id ? (
                        <button
                          onClick={() => handleNavClick(link.id)}
                          onMouseEnter={() => playHover()}
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </button>
                      ) : link.url ? (
                        <button
                          onClick={() => handleExternalClick(link.url)}
                          onMouseEnter={() => playHover()}
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                        >
                          {link.name}
                          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ) : (
                        <span className="text-gray-500 text-sm cursor-default">
                          {link.name} <span className="text-xs">(Coming Soon)</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="glass-card p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-400">
                  Get notified about our latest projects, blog posts, and open source contributions.
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
                <Button
                  variant="thunder"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>© 2024 Silent Thunder Squad.</span>
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>by passionate developers</span>
              </div>

              {/* Tech Stack */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm">Built with:</span>
                <div className="flex space-x-2">
                  <Badge variant="tech" className="text-xs">React</Badge>
                  <Badge variant="skill" className="text-xs">GSAP</Badge>
                  <Badge variant="tech" className="text-xs">Tailwind</Badge>
                </div>
              </div>

              {/* Back to Top */}
              <Button
                variant="glass"
                size="sm"
                onClick={scrollToTop}
                onMouseEnter={() => playHover()}
                className="hover:scale-110 transition-transform duration-200"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Back to Top
              </Button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-500 text-xs">
                <MapPin className="w-3 h-3" />
                <span>Remote & Global Team</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-500 text-xs">
                <Code className="w-3 h-3" />
                <span>Open Source Friendly</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-500 text-xs">
                <Coffee className="w-3 h-3" />
                <span>Fueled by Coffee & Passion</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/4 right-12 w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-16 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </footer>
  )
}

export default Footer