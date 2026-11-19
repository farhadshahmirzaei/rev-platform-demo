export const TOTAL_ROBOT_FRAMES = 119;

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), 1);
}

export function getRobotFrameUrl(frameIndex: number): string {
  const clamped = Math.min(
    Math.max(Math.round(frameIndex), 0),
    TOTAL_ROBOT_FRAMES - 1
  );
  const fileNum = String(clamped + 1).padStart(4, '0');
  return `/assets/robot-frames/frame_${fileNum}.webp`;
}

/**
 * Computes normalized 0..1 scroll progress inside a sticky scroll runway.
 * `scrolledIntoRunway` is how many pixels the runway top has scrolled past the viewport anchor.
 * `scrollableDistance` is `runwayHeight - viewportStageHeight`.
 */
export function computeScrollProgress(
  scrolledIntoRunway: number,
  scrollableDistance: number
): number {
  if (scrollableDistance <= 0) return 0;
  return clamp01(scrolledIntoRunway / scrollableDistance);
}

export function progressToFrameIndex(
  progress: number,
  totalFrames: number = TOTAL_ROBOT_FRAMES
): number {
  if (totalFrames <= 1) return 0;
  const p = clamp01(progress);
  return Math.min(Math.round(p * (totalFrames - 1)), totalFrames - 1);
}

/**
 * Maps video scroll progress (0 -> 1) to the surrounding .exploded-layer CSS factor (0 -> 1).
 * In the robot video, parts separate from 0% -> 50% (peak explosion around frame 60)
 * and reassemble smoothly from 50% -> 100%.
 */
export function computeExplodeLayerFactor(progress: number): number {
  const p = clamp01(progress);
  if (p <= 0.5) {
    // Ease-out ramp from 0 to 1 as robot parts separate
    const t = p / 0.5;
    return Number((1 - Math.pow(1 - t, 2)).toFixed(4));
  }
  // Smooth ease-in-out return from 1 down to 0.15 as robot reassembles
  const t = (p - 0.5) / 0.5;
  return Number((1 - 0.85 * (t * t * (3 - 2 * t))).toFixed(4));
}

export function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * clamp01(factor);
}
