import React, { createContext, useContext, useState } from "react";

export type Booking = {
    id: string;
    guest: string;
    date: string;
    status: "pending" | "confirmed" | "cancelled";
    time?: string;
    guestCount?: number;
    email?: string;
    phone?: string;
};

type BookingContextType = {
    bookings: Booking[];
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookings = () => {
    const ctx = useContext(BookingContext);
    if (!ctx) throw new Error("useBookings must be used within BookingProvider");
    return ctx;
};

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bookings, setBookings] = useState<Booking[]>([
        { id: "1", guest: "Jan Novák", date: "2025-05-04", status: "confirmed" },
        { id: "2", guest: "Petr Svoboda", date: "2025-05-05", status: "pending" },
    ]);
    return (
        <BookingContext.Provider value={{ bookings, setBookings }}>
            {children}
        </BookingContext.Provider>
    );
};
