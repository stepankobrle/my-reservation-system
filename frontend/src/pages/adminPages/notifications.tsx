import  { useState } from "react";
import NotificationList from "../../admin/components/notificationList";
import NotificationModal from "../../admin/components/notificationModal";
import NotificationTabs from "../../admin/components/notificationTabs";
import { useNotifications } from "../../context/notificationsContext";

export type Notification = {
    id: string;
    message: string;
    status: "unread" | "read";
};

export default function NotificationPage() {
    // Tohle je správné: notifications a setNotifications z contextu!
    const { notifications, setNotifications } = useNotifications();
    const [activeTab, setActiveTab] = useState(0);
    const [modal, setModal] = useState<{ open: boolean; notification?: Notification }>({ open: false });

    // Mazání notifikace
    const handleDelete = (id: string) =>
        setNotifications(notifications.filter(n => n.id !== id));

    // Úprava notifikace
    const handleEdit = (id: string, newMessage: string) =>
        setNotifications(notifications.map(n => n.id === id ? { ...n, message: newMessage } : n));

    return (
        <div className="p-8 bg-gray-50 min-h-screen bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold mb-2">Upozornění</h1>
                    <input className="border px-3 py-1 rounded" placeholder="Placeholder" />
                </div>
                <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <NotificationList
                notifications={notifications}
                onEdit={notif => setModal({ open: true, notification: notif })}
                onDelete={handleDelete}
            />
            {modal.open && modal.notification && (
                <NotificationModal
                    notification={modal.notification}
                    onClose={() => setModal({ open: false })}
                    onSave={newMessage => {
                        handleEdit(modal.notification!.id, newMessage);
                        setModal({ open: false });
                    }}
                    onDelete={() => {
                        handleDelete(modal.notification!.id);
                        setModal({ open: false });
                    }}
                />
            )}
        </div>
    );
}
