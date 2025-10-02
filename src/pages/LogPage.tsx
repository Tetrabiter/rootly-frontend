import { DependencyTree } from "@/components/DependencyTree";
import SimpleGanttChart from "@/components/Gantt";
import JsonVisualizer from "@/components/JsonVisualizer";
import { ChartPieLegend } from "@/components/PieChart";
import { Card, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import { http } from "@/lib/http";
import type { DependencyNode } from "@/types/dependency-tree";
import type { JsonObject } from "@/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const LogPage = () => {
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

    const { logId } = useParams();
    const analistic = useFetch({
        fetchFunc: () => {
            return http.get(`api/log_analistic/${logId}`);
        },
        onSuccess: (body: { lines: JsonObject[] }) => {
            console.log("analistic", body);
            setJson(body.lines);
        },
    });
    useEffect(() => {
        analistic.fetchData();
    }, []);

    const [json, setJson] = useState<JsonObject[]>([]);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            {analistic.isLoading && <div>Загрузка...</div>}
            {!analistic.isLoading && analistic.response === "null" && (
                <div>Данных по такому id нет</div>
            )}
            {!!json && (
                <>
                    <div className="flex gap-4">
                        <SimpleGanttChart />
                        <ChartPieLegend />
                    </div>
                    <Card className="font-mono text-sm p-4 overflow-auto">
                        <CardTitle>Логи</CardTitle>
                        <JsonVisualizer data={json} />
                    </Card>
                    <DependencyTree data={mockDependencyTree} />
                </>
            )}
        </div>
    );
};
