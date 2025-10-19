"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { ChartData } from "../lib/types";
import { Card } from "./ui/card";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function Chart({ chartData }: { chartData: ChartData[] }) {
  return (
    <Card className="p-6 bg-card border-border transition-all duration-300 hover:shadow-[var(--shadow-card)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          User Registrations Chart For Last 7 Days
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Last 7 days</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={18} max={10} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="totalUsers"
            fill="var(--color-count)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
