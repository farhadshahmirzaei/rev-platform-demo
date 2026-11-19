import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TOTAL_ROBOT_FRAMES,
  clamp01,
  computeExplodeLayerFactor,
  computeScrollProgress,
  getRobotFrameUrl,
  lerp,
  progressToFrameIndex,
} from './scrollScrub';

test('getRobotFrameUrl formats 1-indexed zero-padded WebP paths and clamps bounds', () => {
  assert.equal(getRobotFrameUrl(0), '/assets/robot-frames/frame_0001.webp');
  assert.equal(getRobotFrameUrl(59), '/assets/robot-frames/frame_0060.webp');
  assert.equal(getRobotFrameUrl(118), '/assets/robot-frames/frame_0119.webp');
  assert.equal(getRobotFrameUrl(-10), '/assets/robot-frames/frame_0001.webp');
  assert.equal(getRobotFrameUrl(999), '/assets/robot-frames/frame_0119.webp');
});

test('computeScrollProgress normalizes runway scroll distance to 0..1', () => {
  assert.equal(computeScrollProgress(-200, 1000), 0);
  assert.equal(computeScrollProgress(0, 1000), 0);
  assert.equal(computeScrollProgress(500, 1000), 0.5);
  assert.equal(computeScrollProgress(1400, 1000), 1);
  assert.equal(computeScrollProgress(200, 0), 0);
});

test('progressToFrameIndex maps progress cleanly to 0..TOTAL_ROBOT_FRAMES-1', () => {
  assert.equal(progressToFrameIndex(0), 0);
  assert.equal(progressToFrameIndex(0.5), Math.round(0.5 * (TOTAL_ROBOT_FRAMES - 1)));
  assert.equal(progressToFrameIndex(1), TOTAL_ROBOT_FRAMES - 1);
  assert.equal(progressToFrameIndex(1.5), TOTAL_ROBOT_FRAMES - 1);
  assert.equal(progressToFrameIndex(-0.2), 0);
});

test('computeExplodeLayerFactor starts at 0, peaks at 1 at mid-scroll, and eases back', () => {
  assert.equal(computeExplodeLayerFactor(0), 0);
  assert.equal(computeExplodeLayerFactor(0.5), 1);
  const midRamp = computeExplodeLayerFactor(0.25);
  assert.ok(midRamp > 0.5 && midRamp < 1);
  const endVal = computeExplodeLayerFactor(1);
  assert.ok(endVal >= 0.14 && endVal <= 0.16);
});

test('clamp01 and lerp handle boundaries safely', () => {
  assert.equal(clamp01(NaN), 0);
  assert.equal(lerp(0, 100, 0.25), 25);
  assert.equal(lerp(50, 100, 1), 100);
});
