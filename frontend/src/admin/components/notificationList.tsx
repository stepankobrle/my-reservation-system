// NotificationList.tsx
import { Notification } from "../../pages/adminPages/notifications";
export default function NotificationList({ notifications, onEdit, onDelete }: {
    notifications: Notification[];
    onEdit: (n: Notification) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <div className="flex flex-col gap-4 mt-2">
            {notifications.map(n => (
                <div key={n.id} className="bg-gray-100 rounded h-10 flex items-center justify-between px-4">
                    <span>{n.message}</span>
                    <div className="flex gap-2">
                        <button className="text-blue-600" onClick={() => onEdit(n)}>✏️</button>
                        <button className="text-red-600" onClick={() => onDelete(n.id)}>🗑️</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
