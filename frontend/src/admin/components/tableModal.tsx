import React from "react";
import { useState } from "react";

export default function TableModal({ table, onClose, onSave }) {
    const [number, setNumber] = useState(table?.number || "");
    const [capacity, setCapacity] = useState(table?.capacity || "");
    const [location1, setLocation1] = useState(table?.location || ""); // ✅ správně

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: table?.id || undefined,
            number,
            capacity,
            location1, // ✅ odesíláme správný název
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl border"
            >
                <h2 className="text-xl font-semibold mb-6">
                    {table ? "Úprava stolu" : "Vytvoření stolu"}
                </h2>

                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm mb-1">Číslo stolu</label>
                        <input
                            type="number"
                            min={1}
                            className="border w-full rounded px-3 py-2"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm mb-1">Počet míst</label>
                        <input
                            type="number"
                            min={1}
                            className="border w-full rounded px-3 py-2"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Umístění</label>
                    <input
                        className="border w-full rounded px-3 py-2"
                        value={location1}
                        onChange={(e) => setLocation1(e.target.value)}
                        placeholder="např. terasa, salonek..."
                    />
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 bg-red-600 text-white rounded font-semibold"
                    >
                        ZPĚT
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 text-white rounded font-semibold"
                    >
                        {table ? "UPRAVIT" : "VYTVOŘIT"}
                    </button>
                </div>
            </form>
        </div>
    );
}
