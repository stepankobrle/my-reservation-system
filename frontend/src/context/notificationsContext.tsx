 // NotificationsContext.tsx
import  { createContext, useContext, useState } from "react";

export type Notification = {
    id: string;
    message: string;
    status: "unread" | "read";
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
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: "1", message: "Nová rezervace", status: "unread" },
        { id: "2", message: "Platba byla potvrzena", status: "read" },
    ]);
    return (
        <NotificationsContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};
