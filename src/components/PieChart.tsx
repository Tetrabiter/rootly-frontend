"use client";

import { useMemo, memo, useCallback } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import type { ChartConfig } from "@/components/ui/chart";

// Типы для данных с бэкенда
export interface PieChartData {
  name: string;
  value: number;
  color?: string;
  percentage?: number;
}

interface ChartPieLegendProps {
  data?: PieChartData[];
  title?: string;
  description?: string;
  isLoading?: boolean;
  error?: string | null;
  onSegmentClick?: (data: PieChartData) => void;
  className?: string;
}

// Дефолтные цвета для графика
const DEFAULT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
];

// Мемоизированный компонент для ячеек пирога
const PieCell = memo(({ fill, index }: { fill: string; index: number }) => (
  <Cell
    key={`cell-${index}`}
    fill={fill}
    stroke="hsl(var(--background))"
    strokeWidth={2}
    className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
  />
));

PieCell.displayName = "PieCell";

// Компонент для скелетона загрузки
const ChartSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-4 w-1/2 mx-auto" />
    <Skeleton className="h-4 w-2/3 mx-auto" />
    <div className="h-64 flex items-center justify-center">
      <Skeleton className="h-40 w-40 rounded-full" />
    </div>
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  </div>
);

export const ChartPieLegend = memo(function ChartPieLegend({
  data = [],
  title = "Pie Chart - Legend",
  description = "All statistics from log",
  isLoading = false,
  error = null,
  onSegmentClick,
  className = "",
}: ChartPieLegendProps) {
  // Мемоизация обработанных данных
  const { processedData, totalValue, chartConfig } = useMemo(() => {
    if (!data || data.length === 0) {
      return { processedData: [], totalValue: 0, chartConfig: {} };
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const processed = data.map((item, index) => {
      const percentage = total > 0 ? (item.value / total) * 100 : 0;
      return {
        ...item,
        percentage,
        fill: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        displayValue: item.value.toLocaleString(),
        displayPercentage: `${percentage.toFixed(1)}%`,
      };
    });

    // Динамически создаем конфиг для легенды
    const config: ChartConfig = {
      value: { label: "Value" },
    };

    data.forEach((item, index) => {
      config[item.name] = {
        label: item.name,
        color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      };
    });

    return {
      processedData: processed,
      totalValue: total,
      chartConfig: config,
    };
  }, [data]);

  // Обработчик клика с useCallback
  const handleSegmentClick = useCallback(
    (data: any) => {
      if (onSegmentClick && data && data.payload) {
        onSegmentClick(data.payload);
      }
    },
    [onSegmentClick]
  );

  // Кастомный рендер лейблов
  const renderCustomizedLabel = useCallback(
    ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }: any) => {
      if (percent < 0.03) return null; // Не показываем подписи для очень маленьких сегментов

      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="hsl(var(--foreground))"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={11}
          fontWeight="500"
          className="pointer-events-none"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    },
    []
  );

  // Состояние ошибки
  if (error) {
    return (
      <Card className={`flex flex-col w-full max-w-md mx-auto ${className}`}>
        <CardContent className="flex items-center justify-center h-40">
          <div className="text-center text-destructive">
            <p className="font-medium">Error loading chart</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Состояние загрузки
  if (isLoading) {
    return (
      <Card className={`flex flex-col w-full max-w-md mx-auto ${className}`}>
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartSkeleton />
        </CardContent>
      </Card>
    );
  }

  // Состояние пустых данных
  if (!processedData || processedData.length === 0) {
    return (
      <Card className={`flex flex-col w-full max-w-md mx-auto ${className}`}>
        <CardContent className="flex items-center justify-center h-40">
          <div className="text-center text-muted-foreground">
            <p>No data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`flex flex-col w-full max-w-md mx-auto ${className}`}>
      <CardHeader className="items-center pb-0 space-y-2">
        <CardTitle className="text-lg text-center">{title}</CardTitle>
        <CardDescription className="text-center">
          {description}
          {totalValue > 0 && (
            <span className="block text-sm font-medium mt-1">
              Total: {totalValue.toLocaleString()}
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 pt-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[220px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={processedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={1}
                label={renderCustomizedLabel}
                labelLine={false}
                onClick={handleSegmentClick}
                animationBegin={100}
                animationDuration={500}
                isAnimationActive={!isLoading}
              >
                {processedData.map((entry, index) => (
                  <PieCell fill={entry.fill} index={index} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Кастомная легенда с дополнительной информацией */}
        <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
          {processedData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => onSegmentClick?.(item)}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="font-medium truncate" title={item.name}>
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <span className="font-mono text-xs">{item.displayValue}</span>
                <span className="text-muted-foreground text-xs w-12 text-right">
                  {item.displayPercentage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});
