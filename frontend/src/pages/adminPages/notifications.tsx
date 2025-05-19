import { useState, useEffect } from "react";
import NotificationList from "../../admin/components/notificationList";
import { useNotifications } from "../../context/notificationsContext";
import { useAuth } from "../../admin/components/auth/authProvider";
import api from "../../admin/lib/axios";

export default function NotificationPage() {
    const { currentUser } = useAuth();
    const restaurantId = currentUser?.restaurantId;
    const [search, setSearch] = useState("");
    const { notifications, setNotifications } = useNotifications();

    const validNotifications = Array.isArray(notifications) ? notifications : [];
    const filteredNotifications = validNotifications.filter((n) =>
        n.message.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (!restaurantId) return;

        const fetchNotifications = async () => {
            try {
                const res = await api.get("/api/admin/notifications", {
                    params: { restaurantId },
                });
                setNotifications(res.data);
            } catch (error) {
                console.error("Chyba při načítání notifikací:", error);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 5000);
        return () => clearInterval(interval);
    }, [restaurantId, setNotifications]);


    return (
        <div className="p-8 bg-gray-50 min-h-screen bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Upozornění</h1>
                <div className="flex gap-2">
                    <input
                        type="search"
                        placeholder="Vyhledat zprávu..."
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <input
                        type="date"
                        className="border px-3 py-1 rounded"
                    />
                    <select className="border px-3 py-1 rounded">
                        <option value="">Čas (libovolný)</option>
                        <option value="newest">Nejnovější</option>
                        <option value="oldest">Nejstarší</option>
                    </select>
                </div>
            </div>

            <NotificationList
                notifications={validNotifications.filter(n =>
                    n.message.toLowerCase().includes(search.toLowerCase())
                )}
            />
        </div>
    );
}
