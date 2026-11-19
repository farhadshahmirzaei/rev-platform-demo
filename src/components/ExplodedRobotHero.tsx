import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Mouse } from 'lucide-react';
import { Language } from '../types';
import {
  TOTAL_ROBOT_FRAMES,
  getRobotFrameUrl,
  progressToFrameIndex,
} from '../utils/scrollScrub';

interface ExplodedRobotHeroProps {
  language: Language;
  scrollProgress: number;
  onOpenDemoModal: () => void;
  onOpenWebApp: () => void;
}

export const ExplodedRobotHero: React.FC<ExplodedRobotHeroProps> = ({
  language,
  scrollProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_ROBOT_FRAMES).fill(null)
  );
  const loadedFlagsRef = useRef<boolean[]>(
    new Array(TOTAL_ROBOT_FRAMES).fill(false)
  );
  const lastDrawnFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);

  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const targetFrameIndex = progressToFrameIndex(scrollProgress, TOTAL_ROBOT_FRAMES);
  targetFrameRef.current = targetFrameIndex;

  const drawFrameToCanvas = useCallback((requestedIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pick the exact frame if loaded, otherwise nearest loaded frame to guarantee zero flicker
    let drawIndex = requestedIndex;
    if (!loadedFlagsRef.current[drawIndex]) {
      let nearest = -1;
      let bestDist = Infinity;
      for (let i = 0; i < TOTAL_ROBOT_FRAMES; i++) {
        if (loadedFlagsRef.current[i]) {
          const dist = Math.abs(i - requestedIndex);
          if (dist < bestDist) {
            bestDist = dist;
            nearest = i;
          }
        }
      }
      if (nearest === -1) return;
      drawIndex = nearest;
    }

    const img = framesRef.current[drawIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetWidth = Math.max(1, Math.round(rect.width * dpr));
    const targetHeight = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // Object-cover fit inside exact 9:16 viewport with zero black bars
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawnFrameRef.current = drawIndex;
  }, []);

  // Two-phase preloader: Frame 0 immediately for instant static first paint, then remaining 118 frames
  useEffect(() => {
    let cancelled = false;

    const loadFrame = (index: number, isPriority = false) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (cancelled) return;
        framesRef.current[index] = img;
        loadedFlagsRef.current[index] = true;
        setLoadedCount((prev) => prev + 1);
        if (index === 0) {
          setFirstFrameReady(true);
        }
        if (index === targetFrameRef.current || lastDrawnFrameRef.current === -1) {
          drawFrameToCanvas(targetFrameRef.current);
        }
      };
      img.src = getRobotFrameUrl(index);
      if (isPriority) {
        framesRef.current[index] = img;
      }
    };

    // Phase 1: Immediate frame 0 + coarse keyframes across the sequence for instant scrub responsiveness
    loadFrame(0, true);
    const keyIndices = new Set<number>([0]);
    for (let i = 4; i < TOTAL_ROBOT_FRAMES; i += 6) {
      keyIndices.add(i);
      loadFrame(i);
    }

    // Phase 2: Load remaining intermediate frames smoothly
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      for (let i = 1; i < TOTAL_ROBOT_FRAMES; i++) {
        if (!keyIndices.has(i)) {
          loadFrame(i);
        }
      }
    }, 60);

    const handleResize = () => {
      drawFrameToCanvas(targetFrameRef.current);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrameToCanvas]);

  // Redraw strictly when scrollProgress changes targetFrameIndex (never auto-plays)
  useEffect(() => {
    drawFrameToCanvas(targetFrameIndex);
  }, [targetFrameIndex, drawFrameToCanvas]);

  const progressPercent = Math.round(scrollProgress * 100);
  const isExploding = scrollProgress > 0.04 && scrollProgress < 0.96;

  const badgeText =
    language === 'fa'
      ? isExploding
        ? 'در حال تفکیک اجزا'
        : 'اسکرول کنید تا باز شود'
      : language === 'id'
      ? isExploding
        ? 'Memisahkan Komponen'
        : 'Gulir untuk Membuka'
      : isExploding
      ? 'Exploded View Active'
      : 'Scroll to Explode';

  const frameReadyRatio = Math.min(
    100,
    Math.round((loadedCount / TOTAL_ROBOT_FRAMES) * 100)
  );

  return (
    <div
      data-testid="exploded-robot-stage"
      data-frame-index={targetFrameIndex}
      data-scroll-progress={scrollProgress.toFixed(2)}
      data-frames-loaded={frameReadyRatio}
      className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] aspect-[9/16] mx-auto flex items-center justify-center rounded-3xl overflow-hidden border border-[#3ab0a2]/35 shadow-2xl bg-[#050d11]"
    >
      {/* Top Scroll Status Badge — Cleanly Anchored Inside Frame */}
      <div
        className="absolute top-3.5 start-3.5 z-20 flex items-center gap-2 bg-white/92 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isExploding ? 'bg-[#3ab0a2] animate-pulse' : 'bg-slate-400'
          }`}
        />
        <span className="text-[11px] text-slate-800 font-bold">{badgeText}</span>
      </div>

      {/* Scroll Progress Pill — Cleanly Anchored Inside Frame */}
      <div
        className="absolute top-3.5 end-3.5 z-20 flex items-center gap-1.5 bg-white/92 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-slate-200/80 shadow-sm"
      >
        <Mouse className="w-3.5 h-3.5 text-[#3ab0a2]" />
        <span className="text-[11px] font-mono-num font-bold text-slate-800">
          {progressPercent}%
        </span>
      </div>

      {/* Instant Static First Frame Poster (visible until canvas paints frame 0) */}
      {!firstFrameReady && (
        <img
          src={getRobotFrameUrl(0)}
          alt={language === 'fa' ? 'ربات هوشمند رِو' : 'Rev AI Robot'}
          className="absolute inset-0 w-full h-full object-cover block"
        />
      )}

      {/* Scroll-Scrubbed High-FPS Frame Canvas (ZERO autoplay — strictly driven by scroll) */}
      <canvas
        ref={canvasRef}
        aria-label={
          language === 'fa'
            ? 'نمایش تعاملی تفکیک اجزای ربات با اسکرول'
            : 'Interactive scroll-scrubbed exploded robot view'
        }
        className="exploded-layer w-full h-full block"
        style={
          {
            '--explode-x': '0px',
            '--explode-y': '0px',
            '--explode-rot': '0deg',
            '--explode-scale': '0.03',
          } as React.CSSProperties
        }
      />

      {/* Thin Progress Line at Bottom Edge — Tracks Exact Scroll Position */}
      <div
        className="absolute inset-x-0 bottom-0 h-1.5 bg-white/20 pointer-events-none z-20"
      >
        <div
          className="h-full bg-[#3ab0a2] transition-[width] duration-75"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
