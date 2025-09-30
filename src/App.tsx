import { Sidebar } from "./components/Sidebar";
import SimpleGanttChart from "../src/components/Gantt";
import { ChartPieLegend } from "../src/components/PieChart";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full flex flex-col">
        <SimpleGanttChart />
        <ChartPieLegend />
      </div>
    </div>
  );
}

export default App;
