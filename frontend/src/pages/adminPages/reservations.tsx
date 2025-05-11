import  { useState } from "react";

import { useBookings } from "../../context/reservationsContext";
import EditBookingModal from "../../admin/components/editBookingModal";
import DeleteConfirmationModal from "../../admin/components/deleteConfirmationModal";


const generateTimeOptions = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            const hour = h.toString().padStart(2, "0");
            const minute = m.toString().padStart(2, "0");
            times.push(`${hour}:${minute}`);
        }
    }
    return times;
};
const TIME_OPTIONS = generateTimeOptions();

export default function Reservations() {
    const { bookings, setBookings } = useBookings();
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [editModal, setEditModal] = useState<{ open: boolean; booking: any | null }>({ open: false, booking: null });
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string }>({ open: false, id: "" });

    // Vyhledávání a filtrování
    const filteredBookings = bookings.filter(b => {
        const searchMatch =
            b.guest.toLowerCase().includes(search.toLowerCase()) ||
            (b.email && b.email.toLowerCase().includes(search.toLowerCase())) ||
            (b.phone && b.phone.toLowerCase().includes(search.toLowerCase()));
        const dateMatch = !date || b.date === date;
        const timeMatch = !time || b.time === time;
        return searchMatch && dateMatch && timeMatch;
    });

    // Otevření modalu pro vytvoření nové rezervace
    const handleCreate = () => {
        setEditModal({
            open: true,
            booking: {
                id: Math.random().toString(36).slice(2),
                guest: "",
                date: "",
                time: "",
                guestCount: 1,
                email: "",
                phone: "",
            }
        });
    };

    // Uložení nové nebo upravené rezervace
    const handleSave = (booking) => {
        setBookings(prev => {
            const exists = prev.find(b => b.id === booking.id);
            if (exists) {
                return prev.map(b => b.id === booking.id ? booking : b);
            } else {
                return [booking, ...prev];
            }
        });
        setEditModal({ open: false, booking: null });
    };

    // Smazání rezervace
    const handleDelete = (id: string) => {
        setBookings(prev => prev.filter(b => b.id !== id));
        setDeleteModal({ open: false, id: "" });
    };

    return (
        <div className="p-8  min-h-screen bg-white rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
                <h1 className="text-2xl font-semibold">Rezervace</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="search"
                        placeholder="Vyhledat jméno, e-mail, telefon..."
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <input
                        type="date"
                        className="border border-blue-400 rounded px-3 py-2 text-sm"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        placeholder="Datum"
                    />
                    {/* Čas jako select s možností zrušit výběr */}
                    <select
                        className="border border-blue-400 rounded px-3 py-2 text-sm"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    >
                        <option value="">Čas (libovolný)</option>
                        {TIME_OPTIONS.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white rounded w-10 h-10 flex items-center justify-center text-2xl pb-1"
                        onClick={handleCreate}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
                {filteredBookings.length === 0 ? (
                    <>
                        <div className="bg-gray-100 rounded h-10"></div>
                        <div className="bg-gray-100 rounded h-10"></div>
                    </>
                ) : (
                    filteredBookings.map(b => (
                        <div key={b.id} className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="grid grid-cols-3 gap-4 mb-2">
                                <div>
                                    <span className="block text-sm text-gray-500">datum</span>
                                    <span className="font-medium">{b.date}</span>
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-500">čas</span>
                                    <span className="font-medium">{b.time}</span>
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-500">Počet hostů</span>
                                    <span className="font-medium">{b.guestCount}</span>
                                </div>
                            </div>
                            <div className="mb-2">
                                <span className="block text-sm mb-1">jméno příjmení: {b.guest}</span>
                                {b.email && <span className="block text-sm mb-1">email: {b.email}</span>}
                                {b.phone && <span className="block text-sm">telefon: {b.phone}</span>}
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    onClick={() => setEditModal({ open: true, booking: b })}
                                >
                                    UPRAVIT
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => setDeleteModal({ open: true, id: b.id })}
                                >
                                    SMAZAT
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal pro editaci nebo vytvoření */}
            {editModal.open && (
                <EditBookingModal
                    booking={editModal.booking}
                    onClose={() => setEditModal({ open: false, booking: null })}
                    onSave={handleSave}
                />
            )}

            {/* Modal pro potvrzení smazání */}
            {deleteModal.open && (
                <DeleteConfirmationModal
                    onClose={() => setDeleteModal({ open: false, id: "" })}
                    onConfirm={() => handleDelete(deleteModal.id)}
                />
            )}
        </div>
    );
}