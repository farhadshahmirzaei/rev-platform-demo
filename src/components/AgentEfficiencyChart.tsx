import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { Language } from '../types';
import {
  DailyAgentEfficiency,
  getPast7DaysEfficiency,
  summarizeAgentEfficiency,
} from '../utils/agentEfficiency';

interface AgentEfficiencyChartProps {
  language?: Language;
  data?: DailyAgentEfficiency[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DailyAgentEfficiency;
  }>;
  language: Language;
}

const CHART_COPY = {
  en: {
    ariaLabel: 'Agent Efficiency past 7 days',
    title: 'Agent Efficiency',
    subtitle: 'Past 7 days · Daily agent runs vs. completion success rate (%)',
    totalRunsLabel: '7d Runs',
    avgSuccessLabel: 'Avg Success',
    peakLabel: 'Peak',
    runsSeries: 'Agent Runs',
    successSeries: 'Success Rate (%)',
    successTooltipLabel: 'Success Rate',
  },
  fa: {
    ariaLabel: 'بهره‌وری عوامل در ۷ روز گذشته',
    title: 'بهره‌وری عوامل هوش مصنوعی',
    subtitle: '۷ روز گذشته · تعداد اجراهای روزانه در برابر نرخ موفقیت (%)',
    totalRunsLabel: 'اجراهای ۷ روز',
    avgSuccessLabel: 'میانگین موفقیت',
    peakLabel: 'اوج فعالیت',
    runsSeries: 'اجراهای عامل',
    successSeries: 'نرخ موفقیت (%)',
    successTooltipLabel: 'نرخ موفقیت',
  },
  id: {
    ariaLabel: 'Efisiensi Agen 7 hari terakhir',
    title: 'Efisiensi Agen',
    subtitle: '7 hari terakhir · Eksekusi agen harian vs. tingkat keberhasilan (%)',
    totalRunsLabel: 'Eksekusi 7h',
    avgSuccessLabel: 'Rata-rata Sukses',
    peakLabel: 'Puncak',
    runsSeries: 'Eksekusi Agen',
    successSeries: 'Tingkat Keberhasilan (%)',
    successTooltipLabel: 'Tingkat Keberhasilan',
  },
};

const EfficiencyTooltip: React.FC<CustomTooltipProps> = ({ active, payload, language }) => {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0].payload;
  const copy = CHART_COPY[language];

  return (
    <div
      dir={language === 'fa' ? 'rtl' : 'ltr'}
      className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-xs space-y-1.5"
    >
      <div className="font-bold text-slate-900 flex items-center justify-between gap-4 border-b border-slate-100 pb-1.5">
        <span>{item.day}</span>
        <span className="text-[11px] text-slate-500">{item.dateLabel}</span>
      </div>
      <div className="flex items-center justify-between gap-5">
        <span className="text-slate-600 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#3ab0a2] inline-block" />
          {copy.runsSeries}
        </span>
        <span className="font-mono-num font-bold text-slate-900">{item.runs}</span>
      </div>
      <div className="flex items-center justify-between gap-5">
        <span className="text-slate-600 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#d4a23e] inline-block" />
          {copy.successTooltipLabel}
        </span>
        <span className="font-mono-num font-bold text-slate-900">
          {item.successRate}% ({item.successfulRuns}/{item.runs})
        </span>
      </div>
    </div>
  );
};

export const AgentEfficiencyChart: React.FC<AgentEfficiencyChartProps> = ({
  language = 'en',
  data,
}) => {
  const chartData = data ?? getPast7DaysEfficiency(language);
  const summary = summarizeAgentEfficiency(chartData);
  const copy = CHART_COPY[language];

  return (
    <section
      data-testid="agent-efficiency-section"
      aria-label={copy.ariaLabel}
      className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#3ab0a2]" />
            {copy.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{copy.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-medium">{copy.totalRunsLabel}</span>
            <span className="text-xs font-extrabold font-mono-num text-slate-900">
              {summary.totalRuns}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#3ab0a2]/10 border border-[#3ab0a2]/20 flex items-center gap-2">
            <span className="text-[11px] text-slate-600 font-medium">{copy.avgSuccessLabel}</span>
            <span className="text-xs font-extrabold font-mono-num text-[#2a8a7e]">
              {summary.avgSuccessRate}%
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#f4e3b5]/60 border border-[#e6d093] flex items-center gap-2">
            <span className="text-[11px] text-slate-700 font-medium">{copy.peakLabel}</span>
            <span className="text-xs font-extrabold text-slate-900">
              {summary.peakDay} <span className="font-mono-num">({summary.peakRuns})</span>
            </span>
          </div>
        </div>
      </div>

      {/* Keep SVG coordinate layout LTR so Recharts dual-axis geometry renders cleanly in RTL mode */}
      <div dir="ltr" className="w-full h-[280px]" data-testid="agent-efficiency-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 12, left: 0, bottom: 4 }}
            barGap={6}
            barCategoryGap="24%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              yAxisId="runs"
              orientation="left"
              allowDecimals={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <YAxis
              yAxisId="rate"
              orientation="right"
              domain={[0, 100]}
              tickFormatter={(value: number) => `${value}%`}
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip
              content={<EfficiencyTooltip language={language} />}
              cursor={{ fill: 'rgba(58, 176, 162, 0.06)' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
              iconType="square"
              iconSize={10}
            />
            <Bar
              yAxisId="runs"
              dataKey="runs"
              name={copy.runsSeries}
              fill="#3ab0a2"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              yAxisId="rate"
              dataKey="successRate"
              name={copy.successSeries}
              fill="#d4a23e"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
