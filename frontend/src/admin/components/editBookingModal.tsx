import { useState } from "react";

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
const timeOptions = generateTimeOptions();

export default function EditBookingModal({ booking, onClose, onSave }) {
    const [form, setForm] = useState({ ...booking });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

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
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            ULOŽIT
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            ZRUŠIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
