'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from './chart';

import { pieChartData } from '@data/dummy';

const chartConfig = {
  Labour: { label: 'Labour', color: '#60a5fa' }, // Blue 400
  Legal: { label: 'Legal', color: '#3b82f6' }, // Blue 500
  Production: { label: 'Production', color: '#2563eb' }, // Blue 600
  License: { label: 'License', color: '#1d4ed8' }, // Blue 700
  Facilities: { label: 'Facilities', color: '#1e40af' }, // Blue 800
  Taxes: { label: 'Taxes', color: '#1e3a8a' }, // Blue 900
} satisfies ChartConfig;
export function ChartPieSimple() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] min-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={pieChartData} dataKey="y" nameKey="x" outerRadius={100}>
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    chartConfig[entry.x as keyof typeof chartConfig]?.color ||
                    '#1e3a8d'
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
