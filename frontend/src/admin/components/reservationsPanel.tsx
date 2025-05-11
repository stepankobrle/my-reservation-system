import { useBookings } from "../../context/reservationsContext.tsx";

export default function ReservationsPanel() {
    const { bookings } = useBookings();

    // Můžeš filtrovat, řadit, zobrazit jen poslední dvě rezervace atd.
    const displayed = bookings.slice(0, 2);

    // Zde můžeš přidat další logiku pro zobrazení rezervací
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 min-h-[340px]">
            <div className="flex items-center mb-5">
                <div className="font-semibold flex-1">Rezervace</div>
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1 ml-1">Label</label>
                    <select className="border border-blue-400 rounded px-3 py-1 text-sm focus:outline-none">
                        <option>Kdy</option>
                        {/* Další možnosti */}
                    </select>
                </div>
            </div>

            <div>
                {displayed.length === 0 ? (
                    <>
                        <div className="bg-gray-100 rounded h-10"></div>
                        <div className="bg-gray-100 rounded h-10"></div>
                    </>
                ) : (
                    displayed.map(b => (
                        <div key={b.id} className="bg-gray-100 rounded h-20 flex items-center px-4 my-3">
                            {b.guest} – {b.date} ({b.status})
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
