import React from "react";
import { useState, useEffect } from "react";
import api from "../../admin/lib/axios";
import { useBookings } from "../../context/reservationsContext";
import BookingModal from "../../admin/components/bookingModal";
import DeleteConfirmationModal from "../../admin/components/deleteConfirmationModal";
import { useAuth } from "../../admin/components/auth/authProvider";

const generateTimeOptions = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            times.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
        }
    }
    return times;
};

const TIME_OPTIONS = generateTimeOptions();

export default function Reservations() {
    const { bookings, setBookings } = useBookings();
    const { currentUser } = useAuth();
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [modal, setModal] = useState({ open: false, booking: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, id: "" });

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await api.get("/api/admin/reservations", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const normalized = res.data.map(r => ({
                    id: r.id,
                    date: r.reservationTime.split("T")[0],
                    time: r.reservationTime.split("T")[1].slice(0, 5),
                    guestCount: r.peopleCount,
                    guest: `${r.guest.firstName} ${r.guest.lastName}`,
                    email: r.guest.email,
                    phone: r.guest.phone,
                    status: r.status.toLowerCase(),
                    tableId: r.tableId,
                    restaurantId: r.restaurantId,
                }));

                setBookings(normalized);
            } catch (err) {
                console.error("Chyba při načítání rezervací", err);
            }
        };

        fetchBookings();
    }, []);

    const filteredBookings = bookings.filter(b => {
        const searchMatch =
            b.guest?.toLowerCase().includes(search.toLowerCase()) ||
            b.email?.toLowerCase().includes(search.toLowerCase()) ||
            b.phone?.toLowerCase().includes(search.toLowerCase());
        const dateMatch = !date || b.date === date;
        const timeMatch = !time || b.time === time;
        return searchMatch && dateMatch && timeMatch;
    });

    const sortedBookings = [...filteredBookings].sort((a, b) => {
        if (a.status === b.status) {
            return new Date(`${a.date}T${a.time}`) > new Date(`${b.date}T${b.time}`) ? 1 : -1;
        }
        return a.status === "pending" ? -1 : 1;
    });

    const handleCreate = () => {
        setModal({
            open: true,
            booking: {
                id: null,
                date: "",
                time: "",
                guestCount: 1,
                guest: "",
                email: "",
                phone: "",
                status: "pending",
                restaurantId: currentUser?.restaurantId || "",
                tableId: null,
            },
        });
    };

    const handleSave = (updated) => {
        if (updated.id) {
            setBookings(prev => {
                const exists = prev.find(b => b.id === updated.id);
                if (exists) {
                    return prev.map(b => b.id === updated.id ? updated : b);
                } else {
                    return [updated, ...prev];
                }
            });
        } else {
            setBookings(prev => [updated, ...prev]);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("access_token");
            await api.delete(`/api/admin/reservations/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(prev => prev.filter(b => b.id !== id));
            setDeleteModal({ open: false, id: "" });
        } catch (err) {
            console.error("Chyba při mazání", err);
        }
    };

    return (
        <div className="p-8 min-h-screen bg-white rounded-lg shadow-md">
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
                    />
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
                {sortedBookings.length === 0 ? (
                    <>
                        <div className="bg-gray-100 rounded h-10"></div>
                        <div className="bg-gray-100 rounded h-10"></div>
                    </>
                ) : (
                    sortedBookings.map(b => (
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
                            <div className="text-sm text-gray-600 mb-2">
                                <strong>Stav:</strong>{" "}
                                <span className={b.status === "pending" ? "text-yellow-600" : "text-green-700"}>
                  {b.status === "pending" ? "Čekající" : "Potvrzená"}
                </span>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    onClick={() => setModal({ open: true, booking: b })}
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

            {modal.open && (
                <BookingModal
                    booking={modal.booking}
                    onClose={() => setModal({ open: false, booking: null })}
                    onSave={handleSave}
                />
            )}

            {deleteModal.open && (
                <DeleteConfirmationModal
                    onClose={() => setDeleteModal({ open: false, id: "" })}
                    onConfirm={() => handleDelete(deleteModal.id)}
                />
            )}
        </div>
    );
}
