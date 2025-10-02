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
        period: [number, number];
    }[];
}

const LevelColors = {
    trace: "#CE93D8", // purple
    warn: "#FFF176", // yellow
    info: "#82aaff", // blue
    debug: "#66BB6A", // green
    error: "#E57373", // red
};

export const GanttChart = ({ data }: BarProps) => {
    return (
        // <ResponsiveContainer width="100%" height={100 + 50 * data.length}>
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data} layout="vertical">
                <XAxis
                    // domain={[
                    //     data[0].period[0],
                    //     data[data.length - 1].period[0],
                    // ]}
                />
                <YAxis type="category" />

                <Bar dataKey="period" fill="#8884d8">
                    {/* было бы ништяк добавить при наведении мини-визуализацию json'а */}
                    {data.map((entry, index) => (
                        <Cell
                            className="cursor-pointer hover:opacity-50" /*  */
                            key={`cell-${index}`}
                            fill={LevelColors[entry.level]}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
