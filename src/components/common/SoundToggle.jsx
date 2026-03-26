import { useEffect } from 'react'
import { gsap } from 'gsap'
import { Button } from '../ui/button'
import { Volume2, VolumeX } from 'lucide-react'
import { useThunderSounds } from '../../hooks/useSounds'

const SoundToggle = ({ isMuted, onToggle }) => {
  const { playClick } = useThunderSounds()

  useEffect(() => {
    // Entrance animation
    gsap.fromTo('.sound-toggle',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, delay: 1 }
    )
  }, [])

  const handleToggle = () => {
    playClick()
    onToggle()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 sound-toggle">
      <Button
        variant="glass"
        size="icon"
        onClick={handleToggle}
        className="w-12 h-12 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
        title={isMuted ? 'Enable Sound' : 'Disable Sound'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-red-400 group-hover:text-red-300" />
        ) : (
          <Volume2 className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
        )}
      </Button>

      {/* Tooltip */}
      <div className="absolute bottom-14 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-black/80 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
          {isMuted ? 'Enable Sound' : 'Disable Sound'}
        </div>
      </div>
    </div>
  )
}

export default SoundToggle