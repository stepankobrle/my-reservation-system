import DashboardChart from './dashboardCharts.tsx';

export default function DashboardChartsRow() {
    return (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <DashboardChart title="Počet rezervací" />
            <DashboardChart title="Vytíženost" />
        </div>
    );
}
