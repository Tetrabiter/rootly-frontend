"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

// Типы данных для Terraform операций
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

// Статусы для операций Terraform
const statuses: Status[] = [
  { id: "success", name: "Успешно", color: "#10B981" },
  { id: "running", name: "Выполняется", color: "#F59E0B" },
  { id: "error", name: "Ошибка", color: "#EF4444" },
  { id: "warning", name: "Предупреждение", color: "#F59E0B" },
  { id: "skipped", name: "Пропущено", color: "#6B7280" },
];

// Парсер Terraform JSON логов
const parseTerraformLogs = (logData: string[]): TerraformOperation[] => {
  const operations: TerraformOperation[] = [];
  const operationMap = new Map<string, any[]>();

  // Группируем логи по типам операций
  logData.forEach((logLine) => {
    try {
      const log = JSON.parse(logLine);
      const message = log["@message"];
      const timestamp = new Date(log["@timestamp"]);

      let operationType = "";
      let operationName = "";

      if (message?.includes("starting Plan operation")) {
        operationType = "plan";
        operationName = "Terraform Plan";
      } else if (message?.includes("running validation operation")) {
        operationType = "validation";
        operationName = "Валидация конфигурации";
      } else if (message?.includes("Initializing provider")) {
        operationType = "provider_init";
        operationName = "Инициализация провайдера";
      } else if (message?.includes("GetProviderSchema")) {
        operationType = "schema_loading";
        operationName = "Загрузка схемы провайдера";
      } else if (message?.includes("Building and walking validate graph")) {
        operationType = "graph_building";
        operationName = "Построение графа";
      } else if (
        message?.includes("Missing required argument") ||
        log["@level"] === "error"
      ) {
        operationType = "error";
        operationName = "Ошибка конфигурации";
      } else if (message?.includes("CLI command args")) {
        operationType = "cli_init";
        operationName = "Инициализация CLI";
      }

      if (operationType) {
        if (!operationMap.has(operationType)) {
          operationMap.set(operationType, []);
        }
        operationMap.get(operationType)!.push({ ...log, timestamp });
      }
    } catch (e) {
      console.warn("Невалидная JSON строка:", logLine);
    }
  });

  // Создаем операции
  operationMap.forEach((logs, operationType) => {
    if (logs.length > 0) {
      const timestamps = logs.map((log) => log.timestamp.getTime());
      const startTime = new Date(Math.min(...timestamps));
      const endTime = new Date(Math.max(...timestamps));

      const hasError = logs.some(
        (log) =>
          log["@level"] === "error" ||
          log["@message"]?.includes("Missing required argument")
      );

      const hasWarning = logs.some((log) => log["@level"] === "warn");

      let status: Status;
      if (hasError) {
        status = statuses[2]; // Ошибка
      } else if (hasWarning) {
        status = statuses[3]; // Предупреждение
      } else {
        status = statuses[0]; // Успешно
      }

      // Определяем имя операции
      let operationName = "";
      switch (operationType) {
        case "plan":
          operationName = "Terraform Plan";
          break;
        case "validation":
          operationName = "Валидация конфигурации";
          break;
        case "provider_init":
          operationName = "Инициализация провайдера";
          break;
        case "schema_loading":
          operationName = "Загрузка схемы провайдера";
          break;
        case "graph_building":
          operationName = "Построение графа зависимостей";
          break;
        case "error":
          operationName = "Ошибка конфигурации";
          break;
        case "cli_init":
          operationName = "Инициализация CLI";
          break;
        default:
          operationName = operationType;
      }

      operations.push({
        id: operationType,
        name: operationName,
        startAt: startTime,
        endAt: endTime,
        status,
        level: hasError ? "error" : logs[0]["@level"],
        message: logs[0]["@message"],
        duration: endTime.getTime() - startTime.getTime(),
      });
    }
  });

  return operations.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
};

// Пример данных из логов (теперь это fallback)


// Компонент Ганта
const SimpleGantt = ({ operations }: { operations: TerraformOperation[] }) => {
  if (operations.length === 0) return <div>Нет данных для отображения</div>;

  const minTime = new Date(
    Math.min(...operations.map((op) => op.startAt.getTime()))
  );
  const maxTime = new Date(
    Math.max(...operations.map((op) => op.endAt.getTime()))
  );
  const totalDuration = maxTime.getTime() - minTime.getTime();

  return (
    <div className="w-full overflow-x-auto">
      {/* Timeline header */}
      <div className="flex flex-col border-b border-gray-200 pb-2 mb-4">
        <div className="flex">
          <div className="w-38 font-semibold">Начало операции: </div>
          <span>{minTime.toLocaleTimeString()}</span>
        </div>
        <div className="flex">
          <div className="w-38 font-semibold">Конец операции: </div>
          <span>{maxTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Operations */}
      {operations.map((operation) => {
        const startOffset =
          ((operation.startAt.getTime() - minTime.getTime()) / totalDuration) *
          100;
        const width = (operation.duration / totalDuration) * 100;

        return (
          <div
            key={operation.id}
            className="flex items-center py-2 border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="w-48 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: operation.status.color }}
                />
                <span className="text-sm font-medium">{operation.name}</span>
              </div>
              {operation.message && (
                <div className="text-xs text-gray-500 truncate mt-1">
                  {operation.message}
                </div>
              )}
            </div>

            <div className="flex-1 relative min-w-[600px] h-8">
              <div className="relative w-full h-full bg-gray-100 rounded">
                <div
                  className="absolute h-6 rounded top-1 transition-all duration-300"
                  style={{
                    left: `${startOffset}%`,
                    width: `${Math.max(width, 1)}%`,
                    backgroundColor: operation.status.color,
                    opacity: operation.status.id === "error" ? 0.8 : 0.6,
                  }}
                  title={`${operation.startAt.toLocaleTimeString()} - ${operation.endAt.toLocaleTimeString()}`}
                />
              </div>
            </div>

            <div className="w-24 flex-shrink-0 text-right text-sm text-gray-600">
              {operation.duration < 1000
                ? `${operation.duration}ms`
                : `${(operation.duration / 1000).toFixed(2)}s`}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        {statuses.map((status) => (
          <div key={status.id} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: status.color }}
            />
            <span>{status.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Основной компонент
interface TerraformGanttChartProps {
  logData?: string[]; // Опциональные данные логов
}

export default function TerraformGanttChart({
  logData,
}: TerraformGanttChartProps) {
  const [operations, setOperations] = useState<TerraformOperation[]>([]);

  useEffect(() => {
    // Используем переданные данные или fallback
    const dataToParse =
      logData && logData.length > 0 ? logData : exampleLogData;
    const parsedOperations = parseTerraformLogs(dataToParse);
    setOperations(parsedOperations);
  }, [logData]); // Зависимость от logData

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Terraform Execution Timeline</CardTitle>
        <SimpleGantt operations={operations} />
      </CardHeader>
    </Card>
  );
}
