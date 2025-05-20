import React, { useState, useEffect } from "react";

const ALLERGENS = Array.from({ length: 14 }, (_, i) => i + 1);

export default function MenuItemModal({ item, onClose, onSave }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [allergens, setAllergens] = useState<number[]>([]);

    // Naplnění stavu při úpravě položky
    useEffect(() => {
        if (item) {
            setName(item.name || "");
            setPrice(item.price?.toString() || "");
            setDescription(item.description || "");
            setAllergens(item.allergens || []);
        }
    }, [item]);

    const handleAllergenChange = (a: number) => {
        setAllergens((prev) =>
            prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSave({
            ...item, // pokud editujeme
            name,
            price: parseFloat(price),
            description,
            allergens,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg"
            >
                <h2 className="text-xl font-semibold mb-6">
                    {item ? "Úprava jídla" : "Přidání jídla"}
                </h2>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Název</label>
                    <input
                        className="border w-full rounded px-3 py-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Cena (Kč)</label>
                    <input
                        type="number"
                        min={0}
                        className="border w-full rounded px-3 py-2"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Popis / Poznámka</label>
                    <textarea
                        className="border w-full rounded px-3 py-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm mb-2">Alergeny</label>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                        {ALLERGENS.map((a) => (
                            <label key={a} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={allergens.includes(a)}
                                    onChange={() => handleAllergenChange(a)}
                                />
                                {a}
                            </label>
                        ))}
                    </div>
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
                        ULOŽIT
                    </button>
                </div>
            </form>
        </div>
    );
}
