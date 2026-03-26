import { useRef } from 'react'
import SplitType from 'split-type'
import { useGSAP, useFadeInUp } from '../../hooks/useGSAP'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, Users, Lightbulb, Target } from 'lucide-react'
import { Badge } from '../ui/badge'

gsap.registerPlugin(ScrollTrigger)

const WhoWeAreSection = () => {
  const sectionRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const featuresRef = useRef()

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

    // Animate feature cards
    gsap.fromTo(featuresRef.current.children,
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
          trigger: featuresRef.current,
          start: "top 80%",
          once: true
        }
      }
    )

  }, [])

  const features = [
    {
      icon: Code,
      title: "Computer Science Students",
      description: "We are passionate CS students with a deep understanding of modern technologies and programming paradigms.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Tech Enthusiasts",
      description: "Our love for technology drives us to constantly learn, experiment, and push the boundaries of what's possible.",
      color: "purple"
    },
    {
      icon: Lightbulb,
      title: "Innovation Focused",
      description: "We believe in the power of creative thinking and innovative solutions to tackle complex challenges.",
      color: "cyan"
    },
    {
      icon: Target,
      title: "Solution Oriented",
      description: "Every project we undertake aims to solve real-world problems and create meaningful impact.",
      color: "pink"
    }
  ]

  const getGlowClass = (color) => {
    switch (color) {
      case 'blue': return 'glow-blue'
      case 'purple': return 'glow-purple'
      case 'cyan': return 'glow-cyan'
      default: return 'glow-blue'
    }
  }

  const getGradientClass = (color) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-cyan-500'
      case 'purple': return 'from-purple-500 to-pink-500'
      case 'cyan': return 'from-cyan-500 to-blue-500'
      case 'pink': return 'from-pink-500 to-purple-500'
      default: return 'from-blue-500 to-purple-500'
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 lg:py-32 overflow-hidden flex items-center"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <Badge variant="thunder" className="text-sm px-4 py-2">
              About Us
            </Badge>
          </div>

          <h2
            ref={titleRef}
            className="text-5xl lg:text-7xl font-black mb-8 text-gradient-primary leading-tight"
          >
            Who We Are
          </h2>

          <p
            ref={descriptionRef}
            className="text-xl lg:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed"
          >
            We are a collective of Computer Science students who are passionate about technology
            and committed to building innovative solutions that address real-world challenges.
            Our diverse skills and shared vision drive us to create meaningful impact through code.
          </p>
        </div>

        {/* Feature Grid */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Card */}
                <div className="glass-card p-8 h-full text-center relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer">
                  {/* Background glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(feature.color)} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${getGradientClass(feature.color)} p-0.5 group-hover:${getGlowClass(feature.color)} transition-all duration-300`}>
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gradient-primary transition-all duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover effect line */}
                  <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${getGradientClass(feature.color)} group-hover:w-full transition-all duration-500`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="group">
            <div className="text-4xl lg:text-5xl font-black text-gradient-primary mb-2">6+</div>
            <div className="text-gray-400 text-lg group-hover:text-white transition-colors">Team Members</div>
          </div>
          <div className="group">
            <div className="text-4xl lg:text-5xl font-black text-gradient-secondary mb-2">10+</div>
            <div className="text-gray-400 text-lg group-hover:text-white transition-colors">Projects Completed</div>
          </div>
          <div className="group">
            <div className="text-4xl lg:text-5xl font-black text-white mb-2">100%</div>
            <div className="text-gray-400 text-lg group-hover:text-white transition-colors">Passion Driven</div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/3 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 right-16 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  )
}

export default WhoWeAreSection