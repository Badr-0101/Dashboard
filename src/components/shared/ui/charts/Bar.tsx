'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from './chart';

export const description = 'A stacked bar chart with a legend';

interface chartData {
  x: string;
  Budget: number;
  Expense: number;
}

interface chartBarProps {
  data: chartData[];
}
const chartConfig = {
  Budget: {
    label: 'Budget',
    color: '#2B7FFF',
  },
  Expense: {
    label: 'Expense',
    color: '#8EC5FF',
  },
} satisfies ChartConfig;

export function ChartBarStacked({ data }: chartBarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="x"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Budget"
              stackId="a"
              fill="#2B7FFF"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="Expense"
              stackId="a"
              fill="#8EC5FF"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
