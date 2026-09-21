import React, { useState, useRef, useEffect } from 'react';

const CHORD_FREQUENCIES = [
  261.63, 329.63, 392, 329.63,
  220, 261.63, 329.63, 392,
  196, 246.94, 293.66, 349.23,
  174.61, 220, 261.63, 329.63
];

export const LofiPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);
  const isRunningRef = useRef(false);

  const playChordTone = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(CHORD_FREQUENCIES[noteIndexRef.current % CHORD_FREQUENCIES.length], now);
    noteIndexRef.current += 1;

    filter.type = 'lowpass';
    filter.frequency.value = 860;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.075, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.66);
  };

  const startPlayback = async () => {
    if (isRunningRef.current) return true;
    let ctx = audioCtxRef.current;
    if (!ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
    }
    try {
      await ctx.resume();
      playChordTone();
      timerRef.current = window.setInterval(playChordTone, 480);
      isRunningRef.current = true;
      setIsPlaying(true);
      return true;
    } catch {
      return false;
    }
  };

  const togglePlay = async () => {
    if (isRunningRef.current) {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
      if (audioCtxRef.current) {
        await audioCtxRef.current.suspend().catch(() => {});
      }
      isRunningRef.current = false;
      setIsPlaying(false);
      return;
    }
    await startPlayback();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      className={`lofi-player ${isPlaying ? 'is-playing' : ''}`}
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause lofi ambience' : 'Play lofi ambience'}
      aria-pressed={isPlaying}
      title={isPlaying ? 'Pause lofi ambience' : 'Play lofi ambience'}
      type="button"
    >
      <i aria-hidden="true">♫</i>
    </button>
  );
};
