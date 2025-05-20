import * as React from "react";
import DashboardChartsRow from "../../admin/components/dashboardChartsRow";
import DashboardPanelsRow from '../../admin/components/dashboardPanelsRow';

export default function Dashboard() {
    return (
        <div className="lg:p-8 bg-gray-50 min-h-screen">
            <div className="hidden md:block">
                <DashboardChartsRow/>
            </div>
            <DashboardPanelsRow/>
        </div>
    );
}
