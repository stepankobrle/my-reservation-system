import React from "react";
import { useNotifications } from "../../context/notificationsContext";

export default function NotificationsPanel() {
    const { notifications } = useNotifications();

    // Posledních 6 notifikací, nejnovější první
    const displayed = Array.isArray(notifications)
        ? notifications.slice(0, 6)
        : [];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 min-h-[300px]">
            <div className="font-semibold text-lg mb-4">Upozornění</div>

            {displayed.length === 0 ? (
                <div className="text-gray-500 text-sm">Žádná upozornění</div>
            ) : (
                <div className="space-y-3">
                    {displayed.map((n) => (
                        <div
                            key={n.id}
                            className="bg-gray-50 border border-gray-200 rounded px-4 py-2 text-sm"
                        >
                            <div className="font-medium text-gray-800">{n.message}</div>
                            {n.guest?.email && (
                                <div className="text-xs text-gray-500">👤 {n.guest.email}</div>
                            )}
                            <div className="text-xs text-gray-400">
                                {new Date(n.createdAt).toLocaleString("cs-CZ")}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
