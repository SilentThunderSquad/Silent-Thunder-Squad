import { useRef, useEffect, useState } from 'react'
import { Howl, Howler } from 'howler'

// Sound effect URLs (we'll use some creative alternatives since we don't have actual files)
const soundEffects = {
  thunder: {
    src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYPAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt560IDAQExe2JYjdhgKSSZJKjdYOBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt56hVHApGn+DyvmYdAA=='],
    volume: 0.1,
    sprite: {
      thunder1: [0, 200],
      thunder2: [200, 200],
    }
  },
  click: {
    src: ['data:audio/wav;base64,UklGRiQEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAEAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYdAA=='],
    volume: 0.05,
  },
  hover: {
    src: ['data:audio/wav;base64,UklGRiQEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAEAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYdAA=='],
    volume: 0.03,
  },
  whoosh: {
    src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYdAA=='],
    volume: 0.2,
  }
}

export const useSoundEffect = (soundName) => {
  const soundRef = useRef()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (soundEffects[soundName]) {
      soundRef.current = new Howl({
        ...soundEffects[soundName],
        onload: () => setIsLoaded(true),
        onend: () => setIsPlaying(false),
        onplay: () => setIsPlaying(true),
        onstop: () => setIsPlaying(false)
      })

      return () => {
        if (soundRef.current) {
          soundRef.current.unload()
        }
      }
    }
  }, [soundName])

  const play = (sprite = null) => {
    if (soundRef.current && isLoaded) {
      if (sprite && soundRef.current._sprite[sprite]) {
        soundRef.current.play(sprite)
      } else {
        soundRef.current.play()
      }
    }
  }

  const stop = () => {
    if (soundRef.current) {
      soundRef.current.stop()
    }
  }

  const pause = () => {
    if (soundRef.current) {
      soundRef.current.pause()
    }
  }

  const setVolume = (volume) => {
    if (soundRef.current) {
      soundRef.current.volume(volume)
    }
  }

  return {
    play,
    stop,
    pause,
    setVolume,
    isLoaded,
    isPlaying
  }
}

export const useSoundManager = () => {
  const [isMuted, setIsMuted] = useState(() => {
    // Check localStorage for user preference
    const saved = localStorage.getItem('soundMuted')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    // Save to localStorage when mute state changes
    localStorage.setItem('soundMuted', JSON.stringify(isMuted))

    // Apply global mute
    if (isMuted) {
      Howler.mute(true)
    } else {
      Howler.mute(false)
    }
  }, [isMuted])

  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

  const setGlobalVolume = (volume) => {
    Howler.volume(volume)
  }

  return {
    isMuted,
    toggleMute,
    setGlobalVolume
  }
}

export const useThunderSounds = () => {
  const thunderSound = useSoundEffect('thunder')
  const clickSound = useSoundEffect('click')
  const hoverSound = useSoundEffect('hover')
  const whooshSound = useSoundEffect('whoosh')

  const playThunder = () => thunderSound.play('thunder1')
  const playClick = () => clickSound.play()
  const playHover = () => hoverSound.play()
  const playWhoosh = () => whooshSound.play()

  return {
    playThunder,
    playClick,
    playHover,
    playWhoosh,
    sounds: {
      thunder: thunderSound,
      click: clickSound,
      hover: hoverSound,
      whoosh: whooshSound
    }
  }
}

export const useScrollSounds = () => {
  const whooshSound = useSoundEffect('whoosh')
  const lastScrollTime = useRef(0)
  const scrollVelocity = useRef(0)

  useEffect(() => {
    let lastScrollTop = 0

    const handleScroll = () => {
      const currentTime = Date.now()
      const currentScrollTop = window.pageYOffset
      const deltaTime = currentTime - lastScrollTime.current
      const deltaScroll = Math.abs(currentScrollTop - lastScrollTop)

      if (deltaTime > 0) {
        scrollVelocity.current = deltaScroll / deltaTime
      }

      // Play whoosh sound for fast scrolling
      if (scrollVelocity.current > 0.5 && deltaTime > 100) {
        whooshSound.play()
        lastScrollTime.current = currentTime
      }

      lastScrollTop = currentScrollTop
    }

    const throttledScroll = throttle(handleScroll, 100)
    window.addEventListener('scroll', throttledScroll)

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [whooshSound])
}

// Utility function for throttling
function throttle(func, delay) {
  let timeoutId
  let lastExecTime = 0
  return function (...args) {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}