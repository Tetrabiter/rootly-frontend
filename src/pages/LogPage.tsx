import SimpleGanttChart from "@/components/Gantt";
import JsonVisualizer from "@/components/JsonVisualizer";
import { ChartPieLegend } from "@/components/PieChart";
import { Card, CardTitle } from "@/components/ui/card";
//import { useParams } from "react-router";

export const LogPage = () => {
    // const { logId } = useParams();
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex gap-4">
                {/* <SimpleGanttChart /> */}
                {/* <ChartPieLegend /> */}
            </div>
            <Card className="font-mono text-sm p-4 overflow-auto">
                <CardTitle>Логи</CardTitle>
                <JsonVisualizer
                    data={{
                        "@level": "info",
                        "@message": "Terraform version: 1.13.1",
                        "@timestamp": "2025-09-09T15:31:32.757289+03:00",
                    }}
                />
            </Card>
        </div>
    );
};
