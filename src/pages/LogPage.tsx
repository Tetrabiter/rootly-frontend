import { DependencyTree } from "@/components/DependencyTree";
import SimpleGanttChart from "@/components/Gantt";
import { GanttChart } from "@/components/GanttChart";
import JsonVisualizer from "@/components/JsonVisualizer";
import { ChartPieLegend } from "@/components/PieChart";
import { Card, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import { exampleJson } from "@/lib/exampleJson";
import { http } from "@/lib/http";
import type { DependencyNode } from "@/types/dependency-tree";
import type { JsonObject, JsonValue } from "@/types/types";
import { useEffect, useState } from "react";
import { data, useParams } from "react-router";
//import { useParams } from "react-router";
import { Timeline } from "react-svg-timeline";

const mockJsonData = {
    "@level": "info",
    "@message": "Terraform version: 1.13.1",
    "@timestamp": "2025-09-09T15:31:32.757289+03:00",
};
const mockDependencyTree: DependencyNode = {
    id: "root",
    name: "my-project",
    version: "1.0.0",
    type: "root",
    description: "Main project package",
    license: "MIT",
    repository: "https://github.com/user/my-project",
    children: [
        {
            id: "react",
            name: "react",
            version: "^18.2.0",
            type: "dependency",
            description:
                "React is a JavaScript library for building user interfaces.",
            license: "MIT",
            repository: "https://github.com/facebook/react",
            children: [
                {
                    id: "loose-envify",
                    name: "loose-envify",
                    version: "^1.4.0",
                    type: "dependency",
                    description: "Fast loose envify for browserify",
                    license: "MIT",
                    repository: "https://github.com/zertosh/loose-envify",
                },
            ],
        },
        {
            id: "typescript",
            name: "typescript",
            version: "^5.0.0",
            type: "devDependency",
            description:
                "TypeScript is a language for application-scale JavaScript.",
            license: "Apache-2.0",
            repository: "https://github.com/Microsoft/TypeScript",
        },
        {
            id: "react-dom",
            name: "react-dom",
            version: "^18.2.0",
            type: "dependency",
            description: "React package for working with the DOM.",
            license: "MIT",
            repository: "https://github.com/facebook/react",
            children: [
                {
                    id: "scheduler",
                    name: "scheduler",
                    version: "^0.23.0",
                    type: "dependency",
                    description:
                        "Cooperative scheduler for the browser environment.",
                    license: "MIT",
                    repository: "https://github.com/facebook/react",
                },
            ],
        },
    ],
};

export const LogPage = () => {
    const [logLines, setLogLines] = useState<string[]>([]);

    const { logId } = useParams();
    const analistic = useFetch({
        fetchFunc: () => {
            return http.get(`api/log_analistic/${logId}`);
        },
        onSuccess: (body) => {
            console.log("analistic", body);
            setJson(body.lines);

            if (body.lines && Array.isArray(body.lines)) {
                const processedLogs = body.lines
                    .map((logItem: any) => {
                        try {
                            if (logItem.raw) {
                                const cleanRaw = logItem.raw
                                    .replace(/^"|"$/g, "")
                                    .replace(/\\"/g, '"')
                                    .replace(/\\\\/g, "\\");

                                return cleanRaw;
                            }
                            return null;
                        } catch (e) {
                            console.warn("Ошибка обработки лога:", logItem, e);
                            return null;
                        }
                    })
                    .filter(
                        (log: string | null): log is string => log !== null
                    );

                console.log("Processed logs for Gantt:", processedLogs);
                setLogLines(processedLogs);
            }
        },
    });
    useEffect(() => {
        analistic.fetchData();
    }, []);

    const [json, setJson] = useState<JsonValue[]>();

    console.log("Log lines here:" + logLines);

    const lanes = [
        {
            laneId: "asd",
            label: "Таймлайн",
        },
    ];
    const events = json.map((val, index) => ({
        eventId: index,
        tooltip: val["@message"] ? val["@message"] : '',
        laneId: "asd",
        startTimeMillis: new Date(val["@timestamp"]).getTime(),
        endTimeMillis: undefined,
        // level: val["@level"],
    }));
    const dateFormat = (ms: number) => new Date(ms).toLocaleString();

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            {analistic.isLoading && <div>Загрузка...</div>}
            {!analistic.isLoading && analistic.response === "null" && (
                <div>Данных по такому id нет</div>
            )}
            {json !== null && (
                <>
                    <div className="flex gap-4">
                        {/* <GanttChart data={chartData} />
                        <SimpleGanttChart logData={logLines} />
                        <ChartPieLegend />
                        <Timeline
                            width={600}
                            height={300}
                            events={events}
                            lanes={lanes}
                            dateFormat={dateFormat}
                        /> */}
                        <Timeline
                            width={1500}
                            height={300}
                            events={events}
                            lanes={lanes}
                            dateFormat={dateFormat}
                        />
                    </div>
                    <Card className="font-mono text-sm p-4 overflow-auto">
                        <CardTitle>Логи</CardTitle>
                        <JsonVisualizer data={json} />
                    </Card>
                </>
            )}
        </div>
    );
};
