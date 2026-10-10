'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({
  src,
  title,
  subtitle,
  coverUrl,
  coverAlt,
}: {
  src: string
  title: string
  subtitle?: string
  coverUrl?: string
  coverAlt?: string
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [volumeOpen, setVolumeOpen] = useState(false)
  const volumeRef = useRef<HTMLDivElement>(null)
  // True while a mouse is over the volume control (desktop hover-to-open)
  const hoveringRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    // Metadata can load before hydration, so the onLoadedMetadata event is missed
    if (audio && audio.readyState >= 1) setDuration(audio.duration)
    return () => audio?.pause()
  }, [])

  useEffect(() => {
    if (!volumeOpen) return
    function onPointerDown(e: PointerEvent) {
      if (!volumeRef.current?.contains(e.target as Node)) setVolumeOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setVolumeOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [volumeOpen])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current
    if (!audio) return
    const time = Number(e.target.value)
    audio.currentTime = time
    setCurrentTime(time)
  }

  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current
    if (!audio) return
    const value = Number(e.target.value)
    audio.volume = value
    audio.muted = value === 0
    setVolume(value)
  }

  const silent = volume === 0
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex items-center gap-4 rounded-lg border border-[rgba(246,246,246,0.25)] bg-[#0e2795]/95 p-3">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? 'Pause' : 'Play'} ${title}`}
        className="relative h-14 w-14 flex-none overflow-hidden bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2795]"
      >
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={coverAlt ?? ''}
            fill
            sizes="56px"
            className="object-cover"
          />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/20">
          {playing ? (
            <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
              <rect x="1" y="0" width="4" height="16" fill="white" />
              <rect x="9" y="0" width="4" height="16" fill="white" />
            </svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
              <path d="M14 8L0 16L0 0L14 8Z" fill="white" />
            </svg>
          )}
        </span>
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {subtitle && (
          <span className="truncate text-sm text-white">{subtitle}</span>
        )}
        <div className="flex items-center gap-3">
          <span className="min-w-0 flex-1 truncate text-sm font-bold text-white">
            {title}
          </span>
          <span className="flex-none text-sm tabular-nums">
            <span className="text-white/60">{formatTime(currentTime)}</span>
            <span className="text-white/60">/</span>
            <span className="text-white">{formatTime(duration)}</span>
          </span>
          <div
            ref={volumeRef}
            className="relative flex flex-none"
            onPointerEnter={(e) => {
              if (e.pointerType !== 'mouse') return
              hoveringRef.current = true
              setVolumeOpen(true)
            }}
            onPointerLeave={(e) => {
              if (e.pointerType !== 'mouse') return
              hoveringRef.current = false
              setVolumeOpen(false)
            }}
          >
            <button
              type="button"
              onClick={() =>
                // A hover already opened it; clicking shouldn't close it under the cursor
                hoveringRef.current
                  ? setVolumeOpen(true)
                  : setVolumeOpen((open) => !open)
              }
              aria-label="Volume"
              aria-expanded={volumeOpen}
              aria-controls="audio-volume"
              className="relative flex h-5 w-5 items-center justify-center rounded-full text-white transition-opacity duration-200 after:absolute after:-inset-3 after:content-[''] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2795]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                {silent ? (
                  <>
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </>
                ) : (
                  <>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </>
                )}
              </svg>
            </button>
            {volumeOpen && (
              // pb-4 (not mb-4) keeps the gap inside the hover area
              <div
                id="audio-volume"
                className="absolute bottom-full left-1/2 -translate-x-1/2 pb-4"
              >
                <div className="flex items-center justify-center rounded-full border border-[rgba(246,246,246,0.25)] bg-[#0e2795] px-2 py-3">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={changeVolume}
                    aria-label="Volume level"
                    aria-orientation="vertical"
                    className="h-24 w-4 cursor-pointer accent-white [direction:rtl] [writing-mode:vertical-lr]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative h-3">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/30" />
          <div
            className="pointer-events-none absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-white"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={seek}
            aria-label="Seek"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
      </div>
    </div>
  )
}
