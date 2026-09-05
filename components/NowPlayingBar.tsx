"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SkipBack, Volume1, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SRC = "/telah-tiba.mp3";
const TITLE = "Telah Tiba";
const ARTIST = "Si Rempit · Lagu Rasmi";
// Rempit Maksimum (skor lepas ANGRY_AT, superman.glb kat skrin) tukar lagu sekali.
const ANGRY_SRC = "/max.mp3";
const ANGRY_TITLE = "Rempit Maksimum";
const ANGRY_ARTIST = "Si Rempit · Mix Overdrive";

// Stable random params so the waveform doesn't re-roll on every render.
const BAR_PARAMS = Array.from({ length: 10 }, () => ({
  peak: 0.3 + Math.random() * 0.7,
  duration: 0.5 + Math.random() * 0.4,
  delay: Math.random() * 0.3,
}));

function formatTime(s: number) {
  if (!s || Number.isNaN(s)) return "0:00";
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}

// Events that count as a user gesture for the browser autoplay policy.
const GESTURES = ["pointerdown", "keydown", "touchend"] as const;

function useSong(angry: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef(SRC);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.6);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio(SRC);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolume = () => setMuted(audio.muted);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("volumechange", onVolume);

    // First gesture: unmute and (re)start with sound.
    const unlock = () => {
      audio.muted = false;
      audio
        .play()
        .then(() => GESTURES.forEach((e) => document.removeEventListener(e, unlock)))
        .catch(() => {});
    };
    // Autoplay with sound; if the browser blocks it, autoplay muted (always allowed)
    // so the bar is live from the first frame, then unmute on the first gesture.
    audio.play().catch(() => {
      audio.muted = true;
      audio.play().catch(() => {});
      GESTURES.forEach((e) => document.addEventListener(e, unlock, { passive: true }));
    });

    return () => {
      GESTURES.forEach((e) => document.removeEventListener(e, unlock));
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("volumechange", onVolume);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Maximum Rempit: swap tracks, resuming playback if it was already playing.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextSrc = angry ? ANGRY_SRC : SRC;
    if (currentSrcRef.current === nextSrc) return;
    currentSrcRef.current = nextSrc;
    const wasPlaying = !audio.paused;
    audio.src = nextSrc;
    audio.load();
    audio.currentTime = 0;
    if (wasPlaying) audio.play().catch(() => {});
  }, [angry]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, []);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  return { isPlaying, muted, volume, currentTime, duration, togglePlay, seek, setVolume };
}

function PlayPauseBtn({ isPlaying, onClick }: { isPlaying: boolean; onClick: () => void }) {
  return (
    <div className="relative">
      <AnimatePresence>
        {isPlaying && (
          <motion.span
            className="absolute inset-0 rounded-full bg-accent/30"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.92 }}
        className="glow-accent relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-950 motion-safe:transition-transform hover:scale-105"
        aria-label={isPlaying ? "Jeda" : "Main"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.span
              key="pause"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.12 }}
              className="flex items-center gap-[3px]"
            >
              <span className="h-3.5 w-[3px] rounded-full bg-zinc-950" />
              <span className="h-3.5 w-[3px] rounded-full bg-zinc-950" />
            </motion.span>
          ) : (
            <motion.span
              key="play"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.12 }}
              className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-zinc-950"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

function Art({ isPlaying, className }: { isPlaying: boolean; className: string }) {
  return (
    <div className={`glow-accent relative shrink-0 overflow-hidden rounded-md bg-linear-to-br from-accent via-mood-a to-mood-b ${className}`}>
      <span
        className={`flex h-full w-full items-center justify-center text-lg font-bold motion-safe:transition-transform motion-safe:duration-700 ${isPlaying ? "scale-110" : "scale-100"}`}
      >
        R
      </span>
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="absolute inset-0 bg-linear-to-b from-transparent via-white/15 to-transparent"
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/** Drawn 4px line with a real range input over it: keyboard, screen reader, and a 24px hit area. */
function SeekBar({
  currentTime,
  duration,
  onSeek,
  className = "",
}: {
  currentTime: number;
  duration: number;
  onSeek: (t: number) => void;
  className?: string;
}) {
  const progress = duration ? currentTime / duration : 0;
  return (
    <div className={`group relative h-1 ${className}`}>
      <div className="absolute inset-0 rounded-full bg-white/35" />
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-white transition-colors group-hover:bg-accent"
        style={{ width: `${progress * 100}%` }}
      />
      <input
        type="range"
        className="seek absolute inset-x-0 top-1/2 -translate-y-1/2"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label="Gerak"
        aria-valuetext={`${formatTime(currentTime)} daripada ${formatTime(duration)}`}
      />
    </div>
  );
}

export default function NowPlayingBar({ angry = false }: { angry?: boolean }) {
  const { isPlaying, muted, volume, currentTime, duration, togglePlay, seek, setVolume } = useSong(angry);
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.4 ? Volume1 : Volume2;
  const title = angry ? ANGRY_TITLE : TITLE;
  const artist = angry ? ANGRY_ARTIST : ARTIST;
  const subtitle = muted ? "Tekan mana-mana untuk bunyi" : artist;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-zinc-950/90 backdrop-blur-xl"
    >
      {/* Mobile: full-width scrubber on the top edge */}
      <SeekBar currentTime={currentTime} duration={duration} onSeek={seek} className="w-full md:hidden" />
      <div className="hidden h-1 w-full md:block" aria-hidden />

      {/* Mobile */}
      <div className="flex h-[calc(var(--bar-h)-0.25rem)] items-center gap-3 px-4 md:hidden">
        <Art isPlaying={isPlaying} className="h-10 w-10" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-100">{title}</p>
          <p className={`truncate text-xs ${muted ? "text-accent-soft" : "text-zinc-400"}`}>
            {muted ? subtitle : `${formatTime(currentTime)} / ${formatTime(duration)}`}
          </p>
        </div>
        <PlayPauseBtn isPlaying={isPlaying} onClick={togglePlay} />
      </div>

      {/* Desktop */}
      <div className="hidden h-[calc(var(--bar-h)-0.25rem)] items-center gap-4 px-4 md:flex">
        <div className="flex w-[28%] min-w-0 items-center gap-3">
          <Art isPlaying={isPlaying} className="h-12 w-12" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-100">{title}</p>
            <p className={`truncate text-xs ${muted ? "text-accent-soft" : "text-zinc-400"}`}>{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Mula semula"
              onClick={() => seek(0)}
              className="rounded-full p-3 text-zinc-400 transition-colors hover:text-white"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <PlayPauseBtn isPlaying={isPlaying} onClick={togglePlay} />
          </div>

          <div className="flex w-full max-w-lg items-center gap-2">
            <span className="w-9 text-right text-xs tabular-nums text-zinc-400">{formatTime(currentTime)}</span>
            <SeekBar currentTime={currentTime} duration={duration} onSeek={seek} className="flex-1" />
            <span className="w-9 text-xs tabular-nums text-zinc-400">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex w-[28%] items-center justify-end gap-3">
          <div className="hidden h-4 items-end gap-[2px] lg:flex" aria-hidden>
            {BAR_PARAMS.map((p, i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-accent/70"
                animate={isPlaying ? { scaleY: [0.2, p.peak, 0.2] } : { scaleY: 0.2 }}
                transition={isPlaying ? { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" } : { duration: 0.3 }}
                style={{ originY: 1, height: "100%" }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <VolumeIcon className={`h-4 w-4 shrink-0 ${muted || volume === 0 ? "text-zinc-400" : "text-zinc-200"}`} aria-hidden />
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Kelantangan"
              className="h-6 w-24 cursor-pointer accent-white hover:accent-accent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
