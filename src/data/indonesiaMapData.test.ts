import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INDONESIA_ARCHIPELAGO_PATH,
  INDONESIA_FLAG_COLORS,
  INDONESIA_MAP_VIEWBOX,
} from './indonesiaMapData';

test('Indonesian flag colors match official vivid red and pure white', () => {
  assert.equal(INDONESIA_FLAG_COLORS.red, '#FF0000');
  assert.equal(INDONESIA_FLAG_COLORS.white, '#FFFFFF');
});

test('Horizontal flag division splits the Indonesia map viewBox at its vertical midpoint', () => {
  assert.equal(INDONESIA_MAP_VIEWBOX.width, 960);
  assert.equal(INDONESIA_MAP_VIEWBOX.height, 383);
  assert.equal(INDONESIA_MAP_VIEWBOX.splitY, INDONESIA_MAP_VIEWBOX.height / 2);
});

test('Indonesia archipelago geometry contains accurate multi-island SVG subpaths', () => {
  const islandSubpaths = INDONESIA_ARCHIPELAGO_PATH.match(/M[^Z]+Z/g) ?? [];
  assert.ok(
    islandSubpaths.length >= 100,
    `Expected at least 100 Natural Earth Indonesian islands, got ${islandSubpaths.length}`
  );
});
