import { useState } from "react";

export default function TableModal({ table, onClose, onSave }) {
    const [name, setName] = useState(table?.name || "");
    const [seats, setSeats] = useState(table?.seats || "");
    const [location1, setLocation1] = useState(table?.location1 || "");
    const [location2, setLocation2] = useState(table?.location2 || "");
    const [note, setNote] = useState(table?.note || "");
    const [canBeCombined, setCanBeCombined] = useState(table?.canBeCombined || false);
    const [active, setActive] = useState(table?.active ?? true);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: table?.id || undefined,
            name,
            seats,
            location1,
            location2,
            note,
            canBeCombined,
            active,
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
                        <label className="block text-sm mb-1">Název stolu</label>
                        <input
                            className="border w-full rounded px-3 py-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="povinné"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm mb-1">Počet míst</label>
                        <input
                            type="number"
                            min={1}
                            className="border w-full rounded px-3 py-2"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                            required
                            placeholder="povinné"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Umístění</label>
                    <input
                        className="border w-full rounded px-3 py-2 mb-2"
                        value={location1}
                        onChange={(e) => setLocation1(e.target.value)}
                        placeholder="nepovinné"
                    />
                    <input
                        className="border w-full rounded px-3 py-2"
                        value={location2}
                        onChange={(e) => setLocation2(e.target.value)}
                        placeholder="nepovinné"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Poznámka</label>
                    <textarea
                        className="border w-full rounded px-3 py-2"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="nepovinné"
                    />
                </div>
                <div className="mb-4 flex gap-8">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={canBeCombined}
                            onChange={(e) => setCanBeCombined(e.target.checked)}
                        />
                        Možnost spojit s jiným stolem
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                        Aktivní
                    </label>
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
