import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollProgress = () => {
  const progressRef = useRef()

  useEffect(() => {
    const progressBar = progressRef.current

    if (!progressBar) return

    // Create scroll progress animation
    gsap.to(progressBar, {
      scaleX: 1,
      transformOrigin: "left center",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transform scale-x-0 origin-left"
        style={{
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(147, 51, 234, 0.4)'
        }}
      />
    </div>
  )
}

export default ScrollProgress