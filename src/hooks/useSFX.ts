import { useRef, useState } from 'react'
import { roll1, roll2, roll3 } from '../assets/sfx'
import { VOLUME } from '@consts/consts'

const useSFX = () => {
  const sfxs = [roll1, roll2, roll3]
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0)
  const activeAudios = useRef<HTMLAudioElement[]>([])

  const play = () => {
    // Stop the oldest audio if there are already 6 active
    if (activeAudios.current.length >= 6) {
      const oldestAudio = activeAudios.current.shift()
      if (oldestAudio) {
        oldestAudio.pause()
        oldestAudio.src = ''
      }
    }

    const currentAudio = new Audio(sfxs[currentSoundIndex])
    currentAudio.volume = VOLUME
    currentAudio.currentTime = 0
    currentAudio
      .play()
      .catch((error) => console.error('Error playing audio:', error))

    activeAudios.current.push(currentAudio)

    // Remove from active audios when it ends
    currentAudio.onended = () => {
      activeAudios.current = activeAudios.current.filter(
        (audio) => audio !== currentAudio
      )
    }

    setCurrentSoundIndex((prevIndex) => (prevIndex + 1) % sfxs.length)
  }

  return { play }
}

export default useSFX
