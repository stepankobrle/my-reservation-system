import { useState } from "react";

const ALLERGENS = Array.from({ length: 14 }, (_, i) => (i + 1).toString());

export default function MenuItemModal({ item, onClose, onSave }) {
    const [name, setName] = useState(item?.name || "");
    const [price, setPrice] = useState(item?.price || "");
    const [grams, setGrams] = useState(item?.grams || "");
    const [note, setNote] = useState(item?.note || "");
    const [allergens, setAllergens] = useState(item?.allergens || []);

    const handleAllergenChange = (a) => {
        setAllergens((prev) =>
            prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...item, name, price, grams, note, allergens });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-6">{item ? "Úprava jídla" : "Přidání jídla"}</h2>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Název</label>
                    <input className="border w-full rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Cena</label>
                    <input className="border w-full rounded px-3 py-2" value={price} onChange={e => setPrice(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Gramy</label>
                    <input className="border w-full rounded px-3 py-2" value={grams} onChange={e => setGrams(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Poznámka</label>
                    <textarea className="border w-full rounded px-3 py-2" value={note} onChange={e => setNote(e.target.value)} />
                </div>
                <div className="mb-8">
                    <label className="block text-sm mb-1">Alergeny</label>
                    <div className="grid grid-cols-7 gap-2">
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
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-red-600 text-white rounded font-semibold">ZPĚT</button>
                    <div className="flex gap-2">
                        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded font-semibold">ULOŽIT</button>
                        <button type="button" onClick={handleSubmit} className="px-6 py-2 bg-green-600 text-white rounded font-semibold">ULOŽIT A EDITOVAT</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
