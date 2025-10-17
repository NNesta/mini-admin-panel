'use client';

import { Bar, BarChart } from 'recharts';
import { ChartConfig, ChartContainer } from './ui/chart';
import { ChartData } from '../lib/types';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export function Chart({ chartData }: { chartData: ChartData[] }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="totalUsers" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
