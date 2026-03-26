import { useRef, useState } from 'react'
import SplitType from 'split-type'
import { useGSAP } from '../../hooks/useGSAP'
import { useThunderSounds } from '../../hooks/useSounds'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Send,
  Github,
  Twitter,
  Linkedin,
  ExternalLink,
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ThunderCard } from '../ui/card'

gsap.registerPlugin(ScrollTrigger)

const CallToActionSection = () => {
  const sectionRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const ctaCardsRef = useRef()
  const contactFormRef = useRef()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const { playClick, playHover } = useThunderSounds()

  // Text animation with SplitType
  useGSAP(() => {
    // Split title text
    const titleSplit = new SplitType(titleRef.current, { types: 'chars,words' })
    const descSplit = new SplitType(descriptionRef.current, { types: 'words' })

    // Animate title characters
    gsap.fromTo(titleSplit.chars,
      {
        opacity: 0,
        y: 100,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          once: true
        }
      }
    )

    // Animate description words
    gsap.fromTo(descSplit.words,
      {
        opacity: 0,
        y: 30,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 75%",
          once: true
        }
      }
    )

    // Animate CTA cards
    gsap.fromTo(ctaCardsRef.current.querySelectorAll('.cta-card'),
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaCardsRef.current,
          start: "top 80%",
          once: true
        }
      }
    )

    // Animate contact form
    gsap.fromTo(contactFormRef.current,
      {
        opacity: 0,
        x: 50
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactFormRef.current,
          start: "top 80%",
          once: true
        }
      }
    )

  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    playClick()

    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || "Inquiry from Silent Thunder Squad Website")
    const body = encodeURIComponent(
      `Hi Silent Thunder Squad,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`
    )
    const mailtoLink = `mailto:contact@silentthundersquad.com?subject=${subject}&body=${body}`

    window.location.href = mailtoLink

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const ctaOptions = [
    {
      icon: MessageSquare,
      title: "Start a Project",
      description: "Have an idea? Let's bring it to life together. We'll help you build something amazing.",
      action: "Get Started",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Github,
      title: "Collaborate",
      description: "Join us on open source projects and contribute to the developer community.",
      action: "View Projects",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      link: "https://github.com/silent-thunder-squad"
    },
    {
      icon: Mail,
      title: "Join the Team",
      description: "Looking for talented developers and designers to join our growing squad.",
      action: "Apply Now",
      color: "green",
      gradient: "from-green-500 to-emerald-500"
    }
  ]

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@silentthundersquad.com",
      link: "mailto:contact@silentthundersquad.com"
    },
    {
      icon: MessageSquare,
      label: "Discord",
      value: "Join our community",
      link: "https://discord.gg/silentthundersquad"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Remote & Global",
      link: null
    },
    {
      icon: Phone,
      label: "Response Time",
      value: "Within 24 hours",
      link: null
    }
  ]

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "https://github.com/silent-thunder-squad" },
    { icon: Twitter, label: "Twitter", url: "https://twitter.com/silentthundersquad" },
    { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/company/silent-thunder-squad" },
    { icon: ExternalLink, label: "Website", url: "https://silentthundersquad.com" }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 lg:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <Badge variant="thunder" className="text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Let's Connect
            </Badge>
          </div>

          <h2
            ref={titleRef}
            className="text-5xl lg:text-7xl font-black mb-8 leading-tight"
          >
            Ready to Build <span className="text-gradient-primary">Together</span>?
          </h2>

          <p
            ref={descriptionRef}
            className="text-xl lg:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed"
          >
            Whether you have a project idea, want to collaborate, or are interested in joining our team,
            we'd love to hear from you. Let's create something extraordinary together.
          </p>
        </div>

        {/* CTA Cards */}
        <div
          ref={ctaCardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {ctaOptions.map((cta, index) => {
            const Icon = cta.icon
            return (
              <ThunderCard
                key={index}
                className="cta-card group cursor-pointer p-8 text-center transition-all duration-500 hover:scale-105"
                onMouseEnter={() => playHover()}
                onClick={() => {
                  playClick()
                  if (cta.link) {
                    window.open(cta.link, '_blank')
                  } else if (index === 0 || index === 2) {
                    // Scroll to contact form
                    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cta.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`} />

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${cta.gradient} p-0.5 group-hover:glow-${cta.color} transition-all duration-300`}>
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient-primary transition-all duration-300">
                    {cta.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {cta.description}
                  </p>
                  <div className="flex items-center justify-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-300">
                    <span className="mr-2">{cta.action}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Bottom border */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${cta.gradient} group-hover:w-full transition-all duration-500`} />
              </ThunderCard>
            )
          })}
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-gray-400 leading-relaxed">
                We're always excited to discuss new projects, creative opportunities, or just chat about technology.
                Reach out through any of these channels and we'll get back to you soon.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div
                    key={index}
                    className={`flex items-center p-4 glass rounded-lg transition-all duration-300 hover:bg-white/5 ${
                      method.link ? 'cursor-pointer group' : ''
                    }`}
                    onClick={() => method.link && window.open(method.link, '_blank')}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-0.5 mr-4">
                      <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">{method.label}</p>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        {method.value}
                      </p>
                    </div>
                    {method.link && (
                      <ExternalLink className="w-4 h-4 ml-auto text-gray-500 group-hover:text-blue-400 transition-colors" />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <Button
                      key={index}
                      variant="glass"
                      size="icon"
                      onClick={() => {
                        playClick()
                        window.open(social.url, '_blank')
                      }}
                      onMouseEnter={() => playHover()}
                      title={social.label}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={contactFormRef}>
            <ThunderCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project or idea..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="thunder"
                  size="lg"
                  className="w-full"
                  onMouseEnter={() => playHover()}
                >
                  <Send className="mr-2 w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </ThunderCard>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-16 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  )
}

export default CallToActionSection