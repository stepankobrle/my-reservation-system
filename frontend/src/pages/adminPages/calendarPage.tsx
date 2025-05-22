import React from "react";
import { useEffect, useState } from "react";
import axios from "../../admin/lib/axios";
import { format, differenceInMinutes, addDays, subDays, addMinutes, isValid } from "date-fns";
import clsx from "clsx";

export default function CalendarPage() {
    const restaurantId = "ac561b99-2e6a-435c-b3db-208af04803e9";
    const [selectedDate, setSelectedDate] = useState(new Date());

    interface CalendarData {
        tables: Array<{
            id: number;
            number: number;
            reservations: Array<{
                id: number;
                reservationTime: Date;
                guestName: string;
                peopleCount: number;
                status: "confirmed" | "pending" | string;
            }>;
        }>;
    }

    const [data, setData] = useState<CalendarData | null>(null);

    useEffect(() => {
        const fetchCalendar = async () => {
            const dateStr = format(selectedDate, "yyyy-MM-dd");
            console.log("📅 Načítám pro:", dateStr);
            try {
                const res = await axios.get("/admin/calendar", {
                    params: { restaurantId, date: dateStr },
                });
                console.log("✅ Data:", res.data);

                const normalized = {
                    tables: res.data.tables.map((table: any) => ({
                        ...table,
                        reservations: table.reservations.map((r: any) => ({
                            ...r,
                            reservationTime: new Date(r.start),
                        })),
                    })),
                };

                setData(normalized);
            } catch (err) {
                console.error("❌ Chyba při načítání:", err);
                setData({ tables: [] });
            }
        };

        if (restaurantId && selectedDate) fetchCalendar();
    }, [restaurantId, selectedDate]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(new Date(e.target.value));
    };

    const timeSlots = Array.from({ length: 11 }, (_, i) => i + 12).flatMap((hour) => [
        `${hour.toString().padStart(2, "0")}:00`,
        `${hour.toString().padStart(2, "0")}:30`,
    ]);

    const getLeftOffset = (start: string) => {
        const [h, m] = start.split(":" as const).map(Number);
        return ((h - 12) * 2 + (m === 30 ? 1 : 0)) * 60;
    };

    const getWidth = (start: string, end: string) => {
        return differenceInMinutes(new Date(end), new Date(start));
    };

    const nextDay = () => setSelectedDate((prev) => addDays(prev, 1));
    const prevDay = () => setSelectedDate((prev) => subDays(prev, 1));

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex gap-2">
                    <button onClick={prevDay} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">←</button>
                    <button onClick={nextDay} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">→</button>
                </div>
                <input
                    type="date"
                    value={format(selectedDate, "yyyy-MM-dd")}
                    onChange={handleDateChange}
                    className="border px-3 py-1 rounded shadow-sm"
                />
            </div>

            {data && data.tables.length > 0 ? (
                <div className="overflow-auto">
                    <div className="grid grid-cols-[auto_1fr]">
                        <div />
                        <div className="grid grid-cols-[repeat(22,60px)] border-b">
                            {timeSlots.map((slot) => (
                                <div key={slot} className="text-xs text-center border-l">
                                    {slot}
                                </div>
                            ))}
                        </div>
                    </div>

                    {data.tables.map((table) => (
                        <div key={table.id} className="grid grid-cols-[auto_1fr] border-b h-[50px] items-center">
                            <div className="font-medium pl-2 text-sm whitespace-nowrap">
                                Stůl {table.number}
                            </div>
                            <div className="relative">
                                {table.reservations?.length > 0 ? (
                                    table.reservations.map((res) => {
                                        const reservationTime = res.reservationTime;

                                        if (!reservationTime || !isValid(reservationTime)) {
                                            console.warn("⚠️ Neplatný reservationTime:", res);
                                            return null;
                                        }

                                        const end = addMinutes(reservationTime, 180);

                                        let formatted = "";
                                        try {
                                            formatted = format(reservationTime, "HH:mm");
                                        } catch (err) {
                                            console.error("❌ Chyba při formátování času:", reservationTime);
                                            return null;
                                        }

                                        const left = getLeftOffset(formatted);
                                        const width = getWidth(reservationTime.toISOString(), end.toISOString());

                                        return (
                                            <div
                                                key={res.id}
                                                className={clsx(
                                                    "absolute top-1 h-[38px] px-2 rounded-md text-xs text-white flex items-center shadow-sm",
                                                    res.status === "confirmed"
                                                        ? "bg-green-500"
                                                        : res.status === "pending"
                                                            ? "bg-yellow-400"
                                                            : "bg-gray-400"
                                                )}
                                                style={{ left: `${left}px`, width: `${width}px`, minWidth: "40px" }}
                                            >
                                                {res.guestName} ({res.peopleCount}P)
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-gray-400 text-xs pl-2 italic">Bez rezervací</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-500 italic">Žádné rezervace pro tento den.</div>
            )}
        </div>
    );
}