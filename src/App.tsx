import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Separator } from "./components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./components/ui/breadcrumb";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { GanttChart } from "./components/GanttChart";

const data = [
    {
        level: 'TRACE',
        name: "log1",
        period: [1, 3],
    },
    {
        level: 'DEBUG',
        name: "log2",
        period: [2, 6],
    },
    {
        level: 'ERROR',
        name: "log3",
        period: [3, 15],
    },
    {
        level: 'INFO',
        name: "log3",
        period: [3, 15],
    },
    {
        level: 'WARN',
        name: "log3",
        period: [new Date, Date.now()+1],
    },
];

function App() {
    return (
        <div className="flex h-screen">
            {/* <Sidebar /> */}
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Data Fetching
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        {/* <SimpleGanttChart /> */}
                        {/* <GanttChart / */}
                        <GanttChart
                            data={data}
                        />
                    </div>
                </SidebarInset>
            </SidebarProvider>
            {/* <div className="w-full flex flex-col"> */}
            {/*  */}
            {/* <ChartPieLegend /> */}
            {/* </div> */}
        </div>
    );
}

export default App;
