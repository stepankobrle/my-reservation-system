// context/NotificationsContext.tsx
import React, { createContext, useContext, useState } from "react";

export type Notification = {
    id: string;
    type: string;
    message: string;
    isRead: boolean;
    restaurantId: string;
    userId?: string;
    createdAt: string;
    updatedAt: string;
};

type NotificationsContextType = {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const useNotifications = () => {
    const ctx = useContext(NotificationsContext);
    if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
    return ctx;
};

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]); // žádná pevná data

    return (
        <NotificationsContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};
