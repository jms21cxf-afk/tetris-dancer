let audioContext = null
let muted = false

const MELODY = [659, 587, 523, 587, 659, 784, 880, 784, 659, 587, 523, 440]
const NOTE_GAP = 0.11
const NOTE_DURATION = 0.11
const MELODY_DURATION_MS = (MELODY.length - 1) * NOTE_GAP * 1000 + NOTE_DURATION * 1000

let danceTimer = null
let danceActive = false
const danceNodes = new Set()

function getContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

export function initAudio() {
  const ctx = getContext()
  if (ctx.state === 'suspended') {
    ctx.resume()
  }
}

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = value
  if (value) {
    stopDanceMusic()
  }
}

export function toggleMuted() {
  setMuted(!muted)
  return muted
}

function playDanceTone(frequency, duration, startTime) {
  if (muted || !danceActive) return

  try {
    const ctx = getContext()
    const time = ctx.currentTime + startTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const node = { osc, gain }

    osc.type = 'square'
    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0.09, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.onended = () => danceNodes.delete(node)
    danceNodes.add(node)

    osc.start(time)
    osc.stop(time + duration)
  } catch {
    // 오디오 미지원 환경 무시
  }
}

function playMelody() {
  MELODY.forEach((note, i) => {
    playDanceTone(note, NOTE_DURATION, i * NOTE_GAP)
  })
}

function scheduleLoop() {
  if (!danceActive || muted) return

  playMelody()
  danceTimer = setTimeout(() => {
    danceTimer = null
    scheduleLoop()
  }, MELODY_DURATION_MS)
}

export function startDanceMusic() {
  if (muted) return

  stopDanceMusic()
  danceActive = true
  scheduleLoop()
}

export function stopDanceMusic() {
  danceActive = false

  if (danceTimer) {
    clearTimeout(danceTimer)
    danceTimer = null
  }

  const ctx = getContext()
  const now = ctx.currentTime

  for (const { osc, gain } of danceNodes) {
    try {
      gain.gain.cancelScheduledValues(now)
      gain.gain.setValueAtTime(0, now)
      osc.stop(now)
      osc.disconnect()
      gain.disconnect()
    } catch {
      // 이미 종료된 노드 무시
    }
  }

  danceNodes.clear()
}
