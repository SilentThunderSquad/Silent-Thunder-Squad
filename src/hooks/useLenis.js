import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'

export const useLenis = (options = {}) => {
  const lenis = useRef()

  const {
    duration = 1.2,
    easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction = 'vertical',
    gestureDirection = 'vertical',
    smooth = true,
    mouseMultiplier = 1,
    smoothTouch = false,
    touchMultiplier = 2,
    infinite = false,
    autoResize = true,
    ...restOptions
  } = options

  useEffect(() => {
    lenis.current = new Lenis({
      duration,
      easing,
      direction,
      gestureDirection,
      smooth,
      mouseMultiplier,
      smoothTouch,
      touchMultiplier,
      infinite,
      autoResize,
      ...restOptions
    })

    function raf(time) {
      lenis.current.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // GSAP ScrollTrigger integration
    lenis.current.on('scroll', () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.update()
      }
    })

    return () => {
      lenis.current.destroy()
    }
  }, [])

  const scrollTo = (target, options = {}) => {
    if (lenis.current) {
      lenis.current.scrollTo(target, options)
    }
  }

  const scrollToTop = () => {
    scrollTo(0)
  }

  const scrollToBottom = () => {
    scrollTo(document.body.scrollHeight)
  }

  const stop = () => {
    if (lenis.current) {
      lenis.current.stop()
    }
  }

  const start = () => {
    if (lenis.current) {
      lenis.current.start()
    }
  }

  return {
    lenis: lenis.current,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    stop,
    start
  }
}

export const useScrollToSection = () => {
  const { scrollTo } = useLenis()

  const scrollToSection = (sectionId, offset = 0) => {
    const element = document.getElementById(sectionId)
    if (element && scrollTo) {
      scrollTo(element, {
        offset: offset,
        duration: 1.5
      })
    }
  }

  return scrollToSection
}

export const useScrollDirection = () => {
  const scrollDirection = useRef('down')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY.current ? 'down' : 'up'
      if (direction !== scrollDirection.current && (scrollY - lastScrollY.current > 10 || scrollY - lastScrollY.current < -10)) {
        scrollDirection.current = direction
      }
      lastScrollY.current = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener('scroll', updateScrollDirection)
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [])

  return scrollDirection.current
}