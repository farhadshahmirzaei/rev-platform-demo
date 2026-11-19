import { Language } from '../types';

export interface DailyAgentEfficiency {
  day: string;
  dateLabel: string;
  runs: number;
  successfulRuns: number;
  successRate: number;
}

export interface AgentEfficiencySummary {
  totalRuns: number;
  totalSuccessfulRuns: number;
  avgSuccessRate: number;
  peakDay: string;
  peakRuns: number;
}

export function calculateSuccessRate(runs: number, successfulRuns: number): number {
  if (runs <= 0) return 0;
  const clamped = Math.max(0, Math.min(successfulRuns, runs));
  return Number(((clamped / runs) * 100).toFixed(1));
}

export function buildDailyEfficiencyRecord(
  day: string,
  dateLabel: string,
  runs: number,
  successfulRuns: number
): DailyAgentEfficiency {
  return {
    day,
    dateLabel,
    runs,
    successfulRuns,
    successRate: calculateSuccessRate(runs, successfulRuns),
  };
}

export const PAST_7_DAYS_EFFICIENCY: DailyAgentEfficiency[] = [
  buildDailyEfficiencyRecord('Thu', 'Nov 13', 19, 17),
  buildDailyEfficiencyRecord('Fri', 'Nov 14', 24, 22),
  buildDailyEfficiencyRecord('Sat', 'Nov 15', 16, 15),
  buildDailyEfficiencyRecord('Sun', 'Nov 16', 18, 17),
  buildDailyEfficiencyRecord('Mon', 'Nov 17', 31, 30),
  buildDailyEfficiencyRecord('Tue', 'Nov 18', 29, 28),
  buildDailyEfficiencyRecord('Today', 'Nov 19', 27, 27),
];

const PAST_7_DAYS_EFFICIENCY_FA: DailyAgentEfficiency[] = [
  buildDailyEfficiencyRecord('پنج‌شنبه', '۲۲ آبان', 19, 17),
  buildDailyEfficiencyRecord('جمعه', '۲۳ آبان', 24, 22),
  buildDailyEfficiencyRecord('شنبه', '۲۴ آبان', 16, 15),
  buildDailyEfficiencyRecord('یکشنبه', '۲۵ آبان', 18, 17),
  buildDailyEfficiencyRecord('دوشنبه', '۲۶ آبان', 31, 30),
  buildDailyEfficiencyRecord('سه‌شنبه', '۲۷ آبان', 29, 28),
  buildDailyEfficiencyRecord('امروز', '۲۸ آبان', 27, 27),
];

const PAST_7_DAYS_EFFICIENCY_ID: DailyAgentEfficiency[] = [
  buildDailyEfficiencyRecord('Kam', '13 Nov', 19, 17),
  buildDailyEfficiencyRecord('Jum', '14 Nov', 24, 22),
  buildDailyEfficiencyRecord('Sab', '15 Nov', 16, 15),
  buildDailyEfficiencyRecord('Min', '16 Nov', 18, 17),
  buildDailyEfficiencyRecord('Sen', '17 Nov', 31, 30),
  buildDailyEfficiencyRecord('Sel', '18 Nov', 29, 28),
  buildDailyEfficiencyRecord('Hari ini', '19 Nov', 27, 27),
];

export function getPast7DaysEfficiency(language: Language): DailyAgentEfficiency[] {
  if (language === 'fa') return PAST_7_DAYS_EFFICIENCY_FA;
  if (language === 'id') return PAST_7_DAYS_EFFICIENCY_ID;
  return PAST_7_DAYS_EFFICIENCY;
}

export function summarizeAgentEfficiency(
  records: DailyAgentEfficiency[]
): AgentEfficiencySummary {
  if (records.length === 0) {
    return {
      totalRuns: 0,
      totalSuccessfulRuns: 0,
      avgSuccessRate: 0,
      peakDay: '-',
      peakRuns: 0,
    };
  }

  let totalRuns = 0;
  let totalSuccessfulRuns = 0;
  let peakRecord = records[0];

  for (const record of records) {
    totalRuns += record.runs;
    totalSuccessfulRuns += record.successfulRuns;
    if (record.runs > peakRecord.runs) {
      peakRecord = record;
    }
  }

  return {
    totalRuns,
    totalSuccessfulRuns,
    avgSuccessRate: calculateSuccessRate(totalRuns, totalSuccessfulRuns),
    peakDay: peakRecord.day,
    peakRuns: peakRecord.runs,
  };
}
