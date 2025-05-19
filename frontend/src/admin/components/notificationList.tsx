import React from "react";

type Notification = {
    id: string;
    type: string;
    message: string;
    isRead: boolean;
    guestId?: string;
    reservationTime?: string;
    createdAt: string;
    guest?: {
        email: string;
    };
};

export default function NotificationList({ notifications }: { notifications: Notification[] }) {
    if (notifications.length === 0) {
        return <p className="text-gray-500">Žádné notifikace.</p>;
    }
    console.log("NOTIFIKACE:", notifications);

    return (
        <div className="space-y-4">
            {notifications.map((n) => (
                <div
                    key={n.id}
                    className={`border rounded-lg p-4 shadow-sm ${
                        n.isRead ? "bg-white" : "bg-blue-50"
                    }`}
                >
                    <div className="text-sm font-medium text-gray-800">{n.message}</div>

                    {n.guest?.email && (
                        <div className="text-sm text-gray-600 mt-1">👤 {n.guest.email}</div>
                    )}

                    <div className="text-xs text-gray-400 mt-1">
                        {n.reservationTime
                            ? new Date(n.reservationTime).toLocaleString("cs-CZ")
                            : new Date(n.createdAt).toLocaleString("cs-CZ")}
                    </div>
                </div>
            ))}
        </div>
    );
}
