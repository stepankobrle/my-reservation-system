import React from "react";
import NotificationsPanel from './notificationsPanel';
import ReservationsPanel from './reservationsPanel';

export default function DashboardPanelsRow() {
    return (
        <div className="grid lg:grid-cols-2 gap-6">
            <NotificationsPanel />
            <ReservationsPanel />
        </div>
    );
}
