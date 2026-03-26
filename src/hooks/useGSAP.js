import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useGSAP = (callback, dependencies = []) => {
  const elementRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(callback, elementRef.current)
    return () => ctx.revert()
  }, dependencies)

  return elementRef
}

export const useFadeInUp = (options = {}) => {
  const {
    duration = 1,
    delay = 0,
    distance = 50,
    trigger = null,
    start = "top 80%",
    end = "bottom 20%",
    scrub = false,
    stagger = 0.1,
    once = true
  } = options

  return useGSAP((self) => {
    const elements = self.selector(trigger || '[data-fade-in-up]')

    gsap.fromTo(elements,
      {
        opacity: 0,
        y: distance,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        scrollTrigger: {
          trigger: elements[0],
          start,
          end,
          scrub,
          once,
        }
      }
    )
  })
}

export const useStaggerAnimation = (options = {}) => {
  const {
    duration = 0.8,
    stagger = 0.1,
    trigger = '[data-stagger]',
    start = "top 80%",
    once = true
  } = options

  return useGSAP((self) => {
    const elements = self.selector(trigger)

    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 30,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        stagger,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: elements[0],
          start,
          once,
        }
      }
    )
  })
}

export const useParallax = (speed = 0.5) => {
  return useGSAP((self) => {
    const elements = self.selector('[data-parallax]')

    elements.forEach(element => {
      gsap.to(element, {
        yPercent: -100 * speed,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      })
    })
  })
}

export const useHoverAnimation = () => {
  return useGSAP((self) => {
    const elements = self.selector('[data-hover-animation]')

    elements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          rotation: 2,
          duration: 0.3,
          ease: "power2.out"
        })
      })

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })
  })
}

export const useThunderAnimation = () => {
  return useGSAP((self) => {
    const thunderElement = self.selector('[data-thunder-animation]')[0]

    if (thunderElement) {
      // Continuous floating animation
      gsap.to(thunderElement, {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      })

      // Scaling animation on scroll
      gsap.to(thunderElement, {
        scale: 1.2,
        rotation: 5,
        filter: "drop-shadow(0px 0px 30px rgba(59, 130, 246, 0.8))",
        scrollTrigger: {
          trigger: thunderElement,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      })

      // Glow pulse animation
      gsap.to(thunderElement, {
        filter: "drop-shadow(0px 0px 40px rgba(147, 51, 234, 0.9))",
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      })
    }
  })
}

export const useTextAnimation = (options = {}) => {
  const {
    trigger = '[data-text-animation]',
    stagger = 0.03,
    duration = 0.8,
    start = "top 80%",
    once = true
  } = options

  return useGSAP((self) => {
    const elements = self.selector(trigger)

    elements.forEach(element => {
      const chars = element.textContent.split('')
      element.innerHTML = chars.map(char =>
        char === ' ' ? ' ' : `<span class="inline-block">${char}</span>`
      ).join('')

      const spans = element.querySelectorAll('span')

      gsap.fromTo(spans,
        {
          opacity: 0,
          y: 50,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration,
          stagger,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start,
            once,
          }
        }
      )
    })
  })
}

export const useScrollProgress = () => {
  const progressRef = useRef()

  useGSAP(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      })
    }
  })

  return progressRef
}