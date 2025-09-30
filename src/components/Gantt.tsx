"use client";

import { useState } from "react";
import {
  GanttProvider,
  GanttSidebar,
  GanttSidebarGroup,
  GanttSidebarItem,
  GanttTimeline,
  GanttHeader,
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttFeatureItem,
  GanttToday,
} from "@/components/ui/shadcn-io/gantt/index"; // Убедитесь, что путь правильный
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Типы данных
type Status = {
  id: string;
  name: string;
  color: string;
};

type Feature = {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: Status;
};

// Пример данных
const statuses: Status[] = [
  { id: "1", name: "Запланировано", color: "#6B7280" },
  { id: "2", name: "В работе", color: "#F59E0B" },
  { id: "3", name: "Готово", color: "#10B981" },
];

const initialFeatures: Feature[] = [
  {
    id: "1",
    name: "Проектирование архитектуры",
    startAt: new Date(2024, 9, 1), // Октябрь 1, 2024
    endAt: new Date(2024, 9, 7),
    status: statuses[2], // Готово
  },
  {
    id: "2",
    name: "Разработка UI компонентов",
    startAt: new Date(2024, 9, 8),
    endAt: new Date(2024, 9, 21),
    status: statuses[1], // В работе
  },
  {
    id: "3",
    name: "Интеграция с API",
    startAt: new Date(2024, 9, 22),
    endAt: new Date(2024, 10, 5),
    status: statuses[0], // Запланировано
  },
];

export default function SimpleGanttChart() {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);

  // Группируем задачи (в данном случае просто по статусу)
  const groupedFeatures = features.reduce((acc, feature) => {
    const statusName = feature.status.name;
    if (!acc[statusName]) {
      acc[statusName] = [];
    }
    acc[statusName].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  // Обработчик перемещения задачи
  const handleMoveFeature = (id: string, startAt: Date, endAt: Date | null) => {
    if (!endAt) return;

    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, startAt, endAt } : feature
      )
    );
    console.log(`Задача перемещена: ${id} с ${startAt} по ${endAt}`);
  };

  // Обработчик клика по задаче
  const handleFeatureClick = (id: string) => {
    console.log(`Выбрана задача: ${id}`);
  };

  return (
    <Card className="w-full h-1/2 m-2">
      <CardHeader>
        <CardTitle>Gantt Scheme</CardTitle>

        <GanttProvider className="border rounded-lg" range="monthly" zoom={100}>
          {/* Боковая панель со списком задач */}
          <GanttSidebar>
            {Object.entries(groupedFeatures).map(
              ([groupName, groupFeatures]) => (
                <GanttSidebarGroup key={groupName} name={groupName}>
                  {groupFeatures.map((feature) => (
                    <GanttSidebarItem
                      key={feature.id}
                      feature={feature}
                      onSelectItem={handleFeatureClick}
                    />
                  ))}
                </GanttSidebarGroup>
              )
            )}
          </GanttSidebar>

          {/* Временная шкала */}
          <GanttTimeline>
            <GanttHeader />
            <GanttFeatureList>
              {Object.entries(groupedFeatures).map(
                ([groupName, groupFeatures]) => (
                  <GanttFeatureListGroup key={groupName}>
                    {groupFeatures.map((feature) => (
                      <GanttFeatureItem
                        key={feature.id}
                        {...feature}
                        onMove={handleMoveFeature}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {feature.name}
                          </span>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: feature.status.color }}
                          />
                        </div>
                      </GanttFeatureItem>
                    ))}
                  </GanttFeatureListGroup>
                )
              )}
            </GanttFeatureList>

            {/* Маркер сегодняшней даты */}
            <GanttToday />
          </GanttTimeline>
        </GanttProvider>
      </CardHeader>
    </Card>
  );
}
