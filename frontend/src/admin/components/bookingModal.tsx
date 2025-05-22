import { useEffect, useState } from "react";
import api from "../../admin/lib/axios";
import toast from "react-hot-toast";
import React from "react";

const generateTimeOptions = (date: string) => {
    const times: string[] = [];
    const now = new Date();
    const isToday = date === now.toISOString().split("T")[0];

    for (let h = 12; h < 22; h++) {
        for (let m = 0; m < 60; m += 30) {
            const hour = h.toString().padStart(2, "0");
            const minute = m.toString().padStart(2, "0");
            const timeStr = `${hour}:${minute}`;

            if (isToday) {
                const fullDateTime = new Date(`${date}T${timeStr}`);
                if (fullDateTime < now) continue; // přeskočí časy v minulosti
            }

            times.push(timeStr);
        }
    }

    return times;
};

export default function BookingModal({ booking = null, onClose, onSave }) {
    const isEdit = Boolean(booking?.id);

    const [form, setForm] = useState(
        booking || {
            date: "",
            time: "",
            guestCount: 1,
            guest: "",
            email: "",
            phone: "",
            status: "pending",
            restaurantId: "",
            tableId: "",
        }
    );

    useEffect(() => {
        const fetchRestaurantId = async () => {
            if (form.restaurantId) return;
            try {
                const token = localStorage.getItem("access_token");
                const res = await api.get("/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setForm(prev => ({ ...prev, restaurantId: res.data.restaurantId }));
            } catch (err) {
                console.error("Chyba při načítání uživatele", err);
            }
        };

        fetchRestaurantId();
    }, [form.restaurantId]);

    useEffect(() => {
        const assignTable = async () => {
            const { restaurantId, date, time, guestCount } = form;
            if (!restaurantId || !date || !time || !guestCount || isEdit) return;

            try {
                const token = localStorage.getItem("access_token");
                const res = await api.get(`/api/admin/available-tables`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        restaurantId,
                        dateTime: `${date}T${time}`,
                        peopleCount: guestCount,
                    },
                });

                if (res.data.length > 0) {
                    setForm(prev => ({ ...prev, tableId: res.data[0].id }));
                }
            } catch (err) {
                console.error("Chyba při získávání dostupných stolů", err);
            }
        };

        assignTable();
    }, [form.date, form.time, form.guestCount, form.restaurantId, isEdit]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const { date, time, guest, guestCount, email, phone, restaurantId, tableId, status } = form;

            const selectedDateTime = new Date(`${date}T${time}`);
            if (selectedDateTime < new Date()) {
                toast.error("Nemůžeš vytvořit rezervaci do minulosti");
                setIsSubmitting(false);
                return;
            }

            const [firstName, ...rest] = guest.trim().split(" ");
            const lastName = rest.join(" ") || "-";

            const payload = {
                dateTime: `${date}T${time}`,
                peopleCount: Number(guestCount),
                note: "",
                status: status.toUpperCase(),
                restaurantId,
                tableId,
                guest: {
                    firstName,
                    lastName,
                    email,
                    phone,
                },
            };

            const token = localStorage.getItem("access_token");

            const res = isEdit
                ? await api.patch(`/api/admin/reservations/${booking.id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                : await api.post("/api/admin/reservations", payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });

            toast.success(isEdit ? "Rezervace upravena" : "Rezervace vytvořena");
            onSave(res.data);
            onClose();
        } catch (err) {
            console.error("Chyba při ukládání rezervace", err);
            toast.error(err?.response?.data?.message || "Nepodařilo se uložit rezervaci");
        } finally {
            setIsSubmitting(false);
        }
    };

    const timeOptions = form.date ? generateTimeOptions(form.date) : [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">datum</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]} // dnešní datum
                                className="w-full border border-gray-300 rounded px-2 py-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">čas</label>
                            <select
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-2 py-1"
                                required
                            >
                                <option value="">Vyber čas</option>
                                {timeOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Počet hostů</label>
                            <input
                                type="number"
                                name="guestCount"
                                value={form.guestCount}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-2 py-1"
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">jméno příjmení</label>
                        <input
                            type="text"
                            name="guest"
                            value={form.guest}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">telefon</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Stav rezervace</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="pending">Čekající</option>
                            <option value="confirmed">Potvrzená</option>
                        </select>
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            {isEdit ? "ULOŽIT ZMĚNY" : "VYTVOŘIT"}
                        </button>
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            ZRUŠIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}