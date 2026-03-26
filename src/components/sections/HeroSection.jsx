import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { useThunderSounds } from '../../hooks/useSounds'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  const containerRef = useRef()
  const thunderIconRef = useRef()
  const thunderOverlayRef = useRef()
  const teamDescriptionRef = useRef()
  const titleRef = useRef()

  // Individual section refs for creative animations
  const mainHeadingRef = useRef()
  const whoWeAreRef = useRef()
  const statsRef = useRef()
  const missionRef = useRef()
  const particlesRef = useRef()

  const { playThunder } = useThunderSounds()

  useEffect(() => {
    const thunder = thunderIconRef.current
    const thunderOverlay = thunderOverlayRef.current
    const description = teamDescriptionRef.current
    const title = titleRef.current
    const mainHeading = mainHeadingRef.current
    const whoWeAre = whoWeAreRef.current
    const stats = statsRef.current
    const mission = missionRef.current

    if (thunder && thunderOverlay && description && title) {

      // Main timeline for scroll-triggered animations
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
        }
      })

      // Phase 1: Thunder icon grows and covers screen gradually
      tl.to(thunder, {
        scale: 30,
        duration: 2,
        ease: "power2.out"
      })

      // Enhanced Title Disappearing Animation with Creative Effects
      .to(title, {
        opacity: 0,
        scale: 0.6,
        filter: "blur(10px)",
        y: -100,
        duration: 2.5,
        ease: "power2.out"
      }, 0)

      // Add floating particles effect during title fade
      .to('.title-particle', {
        opacity: 1,
        scale: 1,
        y: -200,
        x: "random(-200, 200)",
        rotation: "random(-360, 360)",
        duration: 3,
        ease: "power1.out",
        stagger: 0.1
      }, 0.5)

      // Phase 2: Thunder overlay appears to cover screen
      .to(thunderOverlay, {
        opacity: 1,
        duration: 0.8,
        ease: "power1.inOut"
      }, "-=0.5")

      // Phase 3: Hide original thunder
      .set(thunder, { opacity: 0 })

      // Phase 4: Fade out overlay gradually and reveal description
      .to(thunderOverlay, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut"
      })

      // Creative Description Animations
      .set(description, { opacity: 1 })

      // Main heading typewriter effect
      .fromTo(mainHeading, {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.5")

      // Who We Are cards with staggered wave animation
      .fromTo(whoWeAre.querySelectorAll('.feature-card'), {
        opacity: 0,
        y: 100,
        rotationX: -90
      }, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.3")

      // Stats with counting animation
      .fromTo(stats.querySelectorAll('.stat-number'), {
        opacity: 0,
        scale: 0,
        rotation: 180
      }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "bounce.out"
      }, "-=0.5")

      // Mission with glitch-like reveal
      .fromTo(mission, {
        opacity: 0,
        x: -50,
        skewX: 10
      }, {
        opacity: 1,
        x: 0,
        skewX: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.3")

    }

    // Typewriter effect for main heading text
    if (mainHeading) {
      const text = mainHeading.querySelector('h1')
      if (text) {
        const split = new SplitType(text, { types: 'chars' })
        gsap.set(split.chars, { opacity: 0 })

        ScrollTrigger.create({
          trigger: mainHeading,
          start: "top 80%",
          onEnter: () => {
            gsap.to(split.chars, {
              opacity: 1,
              duration: 0.05,
              stagger: 0.03,
              ease: "none"
            })
          }
        })
      }
    }

    // Wave effect for feature cards on hover
    if (whoWeAre) {
      const cards = whoWeAre.querySelectorAll('.feature-card')
      cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          })
          gsap.to(card.querySelector('.feature-icon'), {
            rotation: 360,
            duration: 0.6,
            ease: "back.out(1.7)"
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
        })
      })
    }

    // Floating animation for stats
    if (stats) {
      const statElements = stats.querySelectorAll('.stat-item')
      statElements.forEach((stat, index) => {
        gsap.to(stat, {
          y: -5,
          duration: 2 + (index * 0.2),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: index * 0.3
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleThunderClick = () => {
    playThunder()
    if (thunderIconRef.current) {
      gsap.to(thunderIconRef.current, {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-[300vh] overflow-hidden bg-black"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-blue-900" />

      {/* Floating particles for title disappearing effect */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-15">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="title-particle absolute w-1 h-1 bg-blue-400/60 rounded-full opacity-0"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${40 + Math.random() * 20}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="h-screen flex items-center justify-center relative">

        {/* Main Title - Silent Thunder with Lightning */}
        <div
          ref={titleRef}
          className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 whitespace-nowrap relative z-10"
        >
          {/* Silent */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black leading-none tracking-tight select-none"
            style={{
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: 900,
              color: '#ffffff'
            }}
          >
            Silent
          </h1>

          {/* Thunder Icon - Original */}
          <div
            ref={thunderIconRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl cursor-pointer select-none transition-all duration-300 hover:scale-110"
            onClick={handleThunderClick}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: '#3b82f6',
            }}
          >
            ⚡
          </div>

          {/* Thunder */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black leading-none tracking-tight select-none"
            style={{
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: 900,
              color: '#ffffff'
            }}
          >
            Thunder
          </h1>
        </div>

        {/* Thunder Screen Overlay */}
        <div
          ref={thunderOverlayRef}
          className="fixed inset-0 z-20 opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)'
          }}
        >
          {/* Large Thunder Icon in overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-[30rem] text-white/20 animate-pulse"
              style={{
                textShadow: '0 0 200px rgba(255, 255, 255, 0.5)'
              }}
            >
              ⚡
            </div>
          </div>
        </div>

        {/* Team Description - Creative animated layout */}
        <div
          ref={teamDescriptionRef}
          className="absolute inset-0 flex items-center justify-center z-25 opacity-0"
        >
          <div className="max-w-6xl mx-auto px-8 py-12 custom-scrollbar overflow-y-auto max-h-screen">

            {/* Main Heading with Typewriter Effect */}
            <div ref={mainHeadingRef} className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                Meet the Thunder Squad
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">
                A passionate collective of Computer Science students transforming ideas into digital reality through innovative technology solutions
              </p>
            </div>

            {/* Who We Are Section with Wave Animations */}
            <div ref={whoWeAreRef} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Who We Are</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="feature-card text-center cursor-pointer transition-all duration-300">
                  <div className="feature-icon w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Innovation Driven</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We transform complex problems into elegant digital solutions using cutting-edge technologies and creative thinking.
                  </p>
                </div>

                <div className="feature-card text-center cursor-pointer transition-all duration-300">
                  <div className="feature-icon w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Tech Enthusiasts</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our expertise spans web development, mobile applications, AI/ML, cloud technologies, and emerging tech stacks.
                  </p>
                </div>

                <div className="feature-card text-center cursor-pointer transition-all duration-300">
                  <div className="feature-icon w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Real Impact</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every project we build aims to solve real-world problems and create meaningful change in people's lives.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics Section with Bouncing Animations */}
            <div ref={statsRef} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Our Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="stat-item text-center cursor-pointer">
                  <div className="stat-number text-4xl md:text-5xl font-black text-blue-400 mb-2">6+</div>
                  <div className="text-gray-400 text-lg">Squad Members</div>
                </div>
                <div className="stat-item text-center cursor-pointer">
                  <div className="stat-number text-4xl md:text-5xl font-black text-blue-400 mb-2">15+</div>
                  <div className="text-gray-400 text-lg">Projects Built</div>
                </div>
                <div className="stat-item text-center cursor-pointer">
                  <div className="stat-number text-4xl md:text-5xl font-black text-blue-400 mb-2">25+</div>
                  <div className="text-gray-400 text-lg">Technologies</div>
                </div>
                <div className="stat-item text-center cursor-pointer">
                  <div className="stat-number text-4xl md:text-5xl font-black text-blue-400 mb-2">∞</div>
                  <div className="text-gray-400 text-lg">Passion</div>
                </div>
              </div>
            </div>

            {/* Mission Statement with Glitch Effect */}
            <div ref={missionRef} className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
              <div className="max-w-4xl mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg blur-sm"></div>
                <div className="relative bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
                  <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed italic mb-4">
                    "We believe in the power of code to change the world. As Silent Thunder Squad,
                    we don't just build applications — we craft experiences, solve problems,
                    and turn ambitious dreams into digital reality."
                  </blockquote>
                  <cite className="text-blue-400 font-semibold text-lg">— The Thunder Squad</cite>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center z-40">
        <div className="text-sm mb-2 opacity-70">Scroll to meet the squad</div>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      {/* Floating background elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-20 bg-blue-400/20 rotate-45 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-16 bg-purple-400/20 -rotate-45 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 left-1/3 w-2 h-12 bg-cyan-400/20 rotate-12 animate-pulse" style={{ animationDelay: '2s' }} />

    </div>
  )
}

export default HeroSection