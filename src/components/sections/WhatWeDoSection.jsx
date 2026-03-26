import { useRef } from 'react'
import SplitType from 'split-type'
import { useGSAP } from '../../hooks/useGSAP'
import { useThunderSounds } from '../../hooks/useSounds'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Laptop,
  Smartphone,
  Globe,
  Database,
  Cpu,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ThunderCard } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

gsap.registerPlugin(ScrollTrigger)

const WhatWeDoSection = () => {
  const sectionRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const servicesRef = useRef()

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

    // Animate service cards with stagger
    gsap.fromTo(servicesRef.current.querySelectorAll('.service-card'),
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotationY: -15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          once: true
        }
      }
    )

  }, [])

  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive web applications built with cutting-edge technologies",
      features: ["React/Next.js", "Node.js/Express", "MongoDB/PostgreSQL", "RESTful APIs"],
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Cross-platform mobile apps that deliver exceptional user experiences",
      features: ["React Native", "Flutter", "iOS/Android", "Push Notifications"],
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Database,
      title: "Backend Systems",
      description: "Scalable backend architectures and robust database solutions",
      features: ["Microservices", "API Design", "Database Optimization", "Cloud Integration"],
      color: "cyan",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Cpu,
      title: "AI/ML Solutions",
      description: "Intelligent systems powered by machine learning and artificial intelligence",
      features: ["Data Analysis", "Predictive Models", "Computer Vision", "NLP"],
      color: "pink",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      icon: Laptop,
      title: "Desktop Applications",
      description: "Native desktop solutions for enhanced productivity and performance",
      features: ["Electron", "Desktop UI", "File Management", "System Integration"],
      color: "green",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Automation & Tools",
      description: "Custom tools and automation solutions to streamline workflows",
      features: ["Workflow Automation", "DevOps Tools", "CI/CD", "Monitoring"],
      color: "orange",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 lg:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <Badge variant="thunder" className="text-sm px-4 py-2">
              Our Services
            </Badge>
          </div>

          <h2
            ref={titleRef}
            className="text-5xl lg:text-7xl font-black mb-8 text-gradient-secondary leading-tight"
          >
            What We Do
          </h2>

          <p
            ref={descriptionRef}
            className="text-xl lg:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed"
          >
            We specialize in building innovative solutions using modern technologies.
            From web applications to AI systems, we create software that solves real problems
            and drives meaningful impact in the digital world.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <ThunderCard
                key={index}
                className="service-card p-6 group cursor-pointer transition-all duration-300 hover:scale-105"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
              >
                {/* Card Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} p-0.5 mr-4 group-hover:glow-${service.color} transition-all duration-300`}>
                    <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-gradient-primary transition-all duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                  <span className="text-sm font-medium mr-2">Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Bottom border effect */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${service.gradient} group-hover:w-full transition-all duration-500`} />
              </ThunderCard>
            )
          })}
        </div>

        {/* Process Section */}
        <div className="text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8">Our Process</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Process Steps */}
            {[
              { step: "01", title: "Discovery", desc: "Understanding your needs and requirements" },
              { step: "02", title: "Design", desc: "Creating user-centric designs and architecture" },
              { step: "03", title: "Development", desc: "Building with modern tools and best practices" },
              { step: "04", title: "Delivery", desc: "Testing, deployment, and ongoing support" }
            ].map((process, index) => (
              <div key={index} className="relative group">
                <div className="glass-card p-6 text-center hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-black text-gradient-primary mb-3">
                    {process.step}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {process.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {process.desc}
                  </p>
                </div>

                {/* Connecting line (hidden on mobile) */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass-card max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-400 mb-6">
              Let's discuss how we can help bring your ideas to life with cutting-edge technology.
            </p>
            <Button
              variant="thunder"
              size="lg"
              onClick={() => {
                playClick()
                document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
              }}
              onMouseEnter={() => playHover()}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/4 right-12 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-16 w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  )
}

export default WhatWeDoSection