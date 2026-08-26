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
  play: () => void;
};

const SoundCtx = createContext<SoundState | null>(null);

export function useSound() {
  const ctx = useContext(SoundCtx);
  if (!ctx) throw new Error("useSound must be used inside <SoundProvider>");
  return ctx;
}

const SRC = "/audio/intro.mp3";
const STORAGE_KEY = "ktl:sound-muted";

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const wantsPlay = useRef(false);

  // Build the element once, on the client only.
  useEffect(() => {
    const audio = new Audio(SRC);
    audio.preload = "auto";
    audio.volume = 0.45;
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

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

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
    <SoundCtx.Provider value={{ enabled, ready, toggle, play }}>
      {children}
    </SoundCtx.Provider>
  );
}
