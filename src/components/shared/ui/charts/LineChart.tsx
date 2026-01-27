'use client';

import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/shared/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@components/shared/ui/charts/chart';

export const description = 'An interactive line chart';

import { lineChartData } from '@data/dummy';

// Transform data to match chart format
const chartData = lineChartData[0].map((_, index) => ({
  date: lineChartData[0][index].x.toISOString(),
  series1: lineChartData[0][index].y,
  series2: lineChartData[1][index].y,
  series3: lineChartData[2][index].y,
}));

const chartConfig = {
  views: {
    label: 'Values',
  },
  series1: {
    label: 'England',
    color: 'green',
  },
  series2: {
    label: 'Germany',
    color: 'blue',
  },
  series3: {
    label: 'India',
    color: 'red',
  },
} satisfies ChartConfig;

export function ChartLineInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('series1');

  const total = React.useMemo(
    () => ({
      series1: chartData.reduce((acc, curr) => acc + curr.series1, 0),
      series2: chartData.reduce((acc, curr) => acc + curr.series2, 0),
      series3: chartData.reduce((acc, curr) => acc + curr.series3, 0),
    }),
    [],
  );

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing data trends from 2005 to 2011
          </CardDescription>
        </div>
        <div className="flex">
          {['series1', 'series2', 'series3'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto min-h-[300px] h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  year: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ChartLineInteractive;
