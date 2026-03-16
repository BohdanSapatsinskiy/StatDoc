import { useEffect, useRef, useState } from "react";
import { useSettings } from "../context/SettingsContext";

/**
 * Background music player component.
 *
 * Handles playback of background music in the application.
 * The component creates an HTMLAudioElement and manages its lifecycle.
 *
 * Features:
 * - Automatically loops the provided audio track
 * - Syncs volume with the application settings
 * - Starts playback after the first user interaction
 *   (required due to browser autoplay restrictions)
 *
 * Uses the SettingsContext to retrieve the current volume level.
 */

export const MusicPlayer = ({ src }: { src: string }) => {
  const { volume } = useSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (started) return;

    const startAudio = () => {
      audioRef.current?.play().catch(() => {
        console.log("Автоплей заблоковано");
      });
      setStarted(true);
      document.removeEventListener("click", startAudio);
    };

    document.addEventListener("click", startAudio);

    return () => {
      document.removeEventListener("click", startAudio);
    };
  }, [started]);

  return null;
};

