import { useBookings } from "../../context/reservationsContext";

export default function ReservationsPanel() {
    const { bookings } = useBookings();

    const now = new Date();

    const displayed = Array.isArray(bookings)
        ? [...bookings]
            .filter((b) => new Date(b.date) >= now)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 6)
        : [];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 min-h-[340px]">
            <div className="font-semibold text-lg mb-4">Nejbližší rezervace</div>

            {displayed.length === 0 ? (
                <>
                    <div className="bg-gray-100 rounded h-10 mb-2"></div>
                    <div className="bg-gray-100 rounded h-10"></div>
                </>
            ) : (
                displayed.map((b) => {
                    const date = new Date(b.date);
                    const timeStr = b.time ? ` v ${b.time}` : "";
                    const people = b.guestCount ? `počet osob: ${b.guestCount} ` : "";

                    return (
                        <div
                            key={b.id}
                            className="bg-gray-50 border border-gray-200 rounded px-4 py-2 my-2 text-sm"
                        >
                            <div className="font-medium text-gray-800">
                                {b.guest} – {date.toLocaleDateString("cs-CZ")}{timeStr}
                            </div>
                            <div className="text-xs text-gray-500">
                                {people}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
