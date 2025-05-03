import NotificationsPanel from './notificationsPanel.tsx';
import ReservationsPanel from './reservationsPanel.tsx';

export default function DashboardPanelsRow() {
    return (
        <div className="grid lg:grid-cols-2 gap-6">
            <NotificationsPanel />
            <ReservationsPanel />
        </div>
    );
}
