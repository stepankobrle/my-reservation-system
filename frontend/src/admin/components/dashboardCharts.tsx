import ReactApexChart from "react-apexcharts";

export default function DashboardChart({ title }) {
    // Příklad dat a konfigurace, uprav podle potřeby
    const options = {
        chart: {
            type: 'line',
            toolbar: { show: false },
            background: 'transparent',
            fontFamily: 'Inter, sans-serif',
        },
        grid: { show: false },
        stroke: { width: 3 },
        xaxis: {
            categories: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'],
            labels: { style: { colors: "#fff" } }
        },
        yaxis: { labels: { style: { colors: "#fff" } } },
        legend: { labels: { colors: "#fff" } },
        colors: ["#2563eb", "#facc15"],
        theme: { mode: "dark" }
    };

    const series = [
        { name: "pv", data: [2400, 1398, 9800, 3908, 4800, 3800, 4300] },
        { name: "uv", data: [4000, 3000, 2000, 2780, 1890, 2390, 3490] }
    ];

    return (
        <div className="bg-gray-900 rounded-lg p-4 min-h-[220px] flex flex-col">
            <div className="text-white font-semibold mb-2">{title}</div>
            <div className="flex-1">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="line"
                    height={160}
                />
            </div>
        </div>
    );
}
