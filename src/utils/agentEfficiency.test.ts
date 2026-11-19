import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PAST_7_DAYS_EFFICIENCY,
  buildDailyEfficiencyRecord,
  calculateSuccessRate,
  getPast7DaysEfficiency,
  summarizeAgentEfficiency,
} from './agentEfficiency';

test('calculateSuccessRate computes rounded percentage and clamps edge cases', () => {
  assert.equal(calculateSuccessRate(0, 0), 0);
  assert.equal(calculateSuccessRate(-5, 3), 0);
  assert.equal(calculateSuccessRate(27, 27), 100);
  assert.equal(calculateSuccessRate(19, 17), 89.5);
  assert.equal(calculateSuccessRate(10, 15), 100);
  assert.equal(calculateSuccessRate(10, -2), 0);
});

test('PAST_7_DAYS_EFFICIENCY provides 7 valid daily records matching today KPI', () => {
  assert.equal(PAST_7_DAYS_EFFICIENCY.length, 7);
  const today = PAST_7_DAYS_EFFICIENCY[PAST_7_DAYS_EFFICIENCY.length - 1];
  assert.equal(today.day, 'Today');
  assert.equal(today.runs, 27);
  assert.equal(today.successRate, 100);
});

test('getPast7DaysEfficiency returns Persian localized records with identical metrics', () => {
  const faData = getPast7DaysEfficiency('fa');
  assert.equal(faData.length, 7);
  for (const rec of faData) {
    assert.equal(/[A-Za-z]/.test(rec.day), false, `Expected Persian day label, got: ${rec.day}`);
    assert.equal(/[A-Za-z]/.test(rec.dateLabel), false, `Expected Persian date label, got: ${rec.dateLabel}`);
  }
  const summaryFa = summarizeAgentEfficiency(faData);
  const summaryEn = summarizeAgentEfficiency(getPast7DaysEfficiency('en'));
  assert.equal(summaryFa.totalRuns, summaryEn.totalRuns);
  assert.equal(summaryFa.avgSuccessRate, summaryEn.avgSuccessRate);
  assert.equal(summaryFa.peakDay, 'دوشنبه');
});

test('summarizeAgentEfficiency aggregates totals, weighted success rate, and peak day', () => {
  const summary = summarizeAgentEfficiency(PAST_7_DAYS_EFFICIENCY);
  assert.equal(summary.totalRuns, 164);
  assert.equal(summary.totalSuccessfulRuns, 156);
  assert.equal(summary.avgSuccessRate, 95.1);
  assert.equal(summary.peakDay, 'Mon');
  assert.equal(summary.peakRuns, 31);
});

test('summarizeAgentEfficiency handles empty input safely', () => {
  const empty = summarizeAgentEfficiency([]);
  assert.deepEqual(empty, {
    totalRuns: 0,
    totalSuccessfulRuns: 0,
    avgSuccessRate: 0,
    peakDay: '-',
    peakRuns: 0,
  });
});

test('buildDailyEfficiencyRecord attaches computed successRate', () => {
  const rec = buildDailyEfficiencyRecord('Wed', 'Nov 12', 20, 19);
  assert.equal(rec.successRate, 95);
});
