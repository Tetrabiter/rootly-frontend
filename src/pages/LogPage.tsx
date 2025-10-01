import SimpleGanttChart from "@/components/Gantt";
import JsonVisualizer from "@/components/JsonVisualizer";
import { ChartPieLegend } from "@/components/PieChart";
import { useParams } from "react-router";

export const LogPage = () => {
    const { logName } = useParams();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex gap-4">
                <SimpleGanttChart />
                <ChartPieLegend />
            </div>
            <JsonVisualizer data={{ a: "123" }} />
        </div>
    );
};
