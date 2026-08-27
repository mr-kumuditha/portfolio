"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SoundState = {
  enabled: boolean;
  ready: boolean;
  toggle: () => void;
  play: (opts?: { loop?: boolean }) => void;
  fadeOut: (ms?: number) => void;
};

const SoundCtx = createContext<SoundState | null>(null);

export function useSound() {
  const ctx = useContext(SoundCtx);
  if (!ctx) throw new Error("useSound must be used inside <SoundProvider>");
  return ctx;
}

const SRC = "/audio/intro.mp3";
const STORAGE_KEY = "ktl:sound-muted";
const BASE_VOLUME = 0.45;

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const wantsPlay = useRef(false);

  // Build the element once, on the client only.
  useEffect(() => {
    const audio = new Audio(SRC);
    audio.preload = "auto";
    audio.volume = BASE_VOLUME;
    audioRef.current = audio;

    let muted = false;
    try {
      muted = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* storage blocked — fall through to default */
    }

    const onReady = () => setReady(true);
    audio.addEventListener("canplaythrough", onReady, { once: true });

    if (!muted) wantsPlay.current = true;

    return () => {
      audio.removeEventListener("canplaythrough", onReady);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const play = useCallback((opts?: { loop?: boolean }) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = opts?.loop ?? false;
    audio.volume = BASE_VOLUME;

    audio
      .play()
      .then(() => setEnabled(true))
      .catch(() => {
        // Autoplay was blocked. Browsers require a user gesture for audio, so
        // arm a one-shot listener and start on whatever the visitor does first.
        const start = () => {
          audio
            .play()
            .then(() => setEnabled(true))
            .catch(() => {
              /* still blocked — the toggle stays available */
            });
        };
        const opts = { once: true, passive: true } as const;
        window.addEventListener("pointerdown", start, opts);
        window.addEventListener("keydown", start, opts);
        window.addEventListener("wheel", start, opts);
        window.addEventListener("touchstart", start, opts);
      });
  }, []);

  // Ramps the volume down and stops, so the looping intro can end with the
  // splash instead of cutting off mid-note.
  const fadeOut = useCallback((ms = 900) => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;

    const from = audio.volume;
    const start = performance.now();

    const step = () => {
      const t = Math.min((performance.now() - start) / ms, 1);
      audio.volume = from * (1 - t);
      if (t < 1) {
        requestAnimationFrame(step);
        return;
      }
      audio.pause();
      audio.loop = false;
      audio.currentTime = 0;
      audio.volume = BASE_VOLUME;
      setEnabled(false);
    };

    requestAnimationFrame(step);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (enabled) {
      audio.pause();
      setEnabled(false);
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* storage blocked */
      }
    } else {
      audio.currentTime = 0;
      audio.play().then(
        () => {
          setEnabled(true);
          try {
            localStorage.setItem(STORAGE_KEY, "0");
          } catch {
            /* storage blocked */
          }
        },
        () => {
          /* blocked */
        }
      );
    }
  }, [enabled]);

  // Don't keep playing into a backgrounded tab.
  useEffect(() => {
    function onVisibility() {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) audio.pause();
      else if (enabled) audio.play().catch(() => {});
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [enabled]);

  return (
    <SoundCtx.Provider value={{ enabled, ready, toggle, play, fadeOut }}>
      {children}
    </SoundCtx.Provider>
  );
}
