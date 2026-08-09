import { useEffect, useState } from 'react'
import DancingCharacter from './components/DancingCharacter'
import {
  initAudio,
  isMuted,
  startDanceMusic,
  stopDanceMusic,
  toggleMuted,
} from './audio/danceMusic'
import './App.css'

export default function App() {
  const [muted, setMuted] = useState(isMuted())

  useEffect(() => {
    if (muted) {
      stopDanceMusic()
      return
    }

    const tryStart = () => {
      initAudio()
      startDanceMusic()
    }

    tryStart()

    const onFirstInteraction = () => {
      tryStart()
      window.removeEventListener('pointerdown', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }

    window.addEventListener('pointerdown', onFirstInteraction)
    window.addEventListener('keydown', onFirstInteraction)

    return () => {
      stopDanceMusic()
      window.removeEventListener('pointerdown', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }
  }, [muted])

  const handleToggleMute = () => {
    stopDanceMusic()
    initAudio()
    setMuted(toggleMuted())
  }

  return (
    <div className="app">
      <button
        type="button"
        className="mute-btn"
        onClick={handleToggleMute}
        aria-label={muted ? '음소거 해제' : '음소거'}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      <h1 className="title">TETRIS DANCER</h1>
      <p className="subtitle">레벨 7 클리어 춤 연출</p>

      <div className="stage-frame">
        <DancingCharacter large />
      </div>

      <p className="hint">화면을 클릭하면 BGM이 재생됩니다</p>
    </div>
  )
}
