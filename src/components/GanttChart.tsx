import type { LogLevel } from "@/types/types";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export interface BarProps {
  data: {
    name: string;
    level: LogLevel;
    period: [Date, Date];
  }[];
}

type Status = {
  id: string;
  name: string;
  color: string;
};

type TerraformOperation = {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: Status;
  level: "info" | "debug" | "trace" | "error" | "warn";
  message?: string;
  duration: number;
};

const LevelColors = {
  TRACE: "#CE93D8", // purple
  WARN: "#FFF176", // yellow
  INFO: "#82aaff", // blue
  DEBUG: "#66BB6A", // green
  ERROR: "#E57373", // red
};

export const GanttChart = ({ data }: BarProps) => {
  return (
    <ResponsiveContainer width="100%" height={100 + 50 * data.length}>
      <BarChart data={data} layout="vertical">
        <XAxis />
        <YAxis dataKey="name" type="category" />
        <Bar dataKey="period" fill="#8884d8">
          {/* было бы ништяк добавить при наведении мини-визуализацию json'а */}
          {data.map((entry, index) => (
            <Cell
              className="cursor-pointer hover:opacity-50"/*  */
              key={`cell-${index}`}
              fill={LevelColors[entry.level]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
