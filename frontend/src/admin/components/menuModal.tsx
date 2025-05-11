import { useState } from "react";

export default function MenuModal({ menu, onClose, onSave }) {
    const [name, setName] = useState(menu?.name || "");
    const [active, setActive] = useState(menu?.active || false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...menu, name, active });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-6">{menu ? "Úprava menu" : "Vytvoření menu"}</h2>
                <div className="mb-4">
                    <label className="block text-sm mb-1">Název menu</label>
                    <input
                        className="border w-full rounded px-3 py-2"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        placeholder="povinné"
                    />
                </div>
                <div className="mb-8">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={active}
                            onChange={e => setActive(e.target.checked)}
                        />
                        Aktivní
                    </label>
                </div>
                <div className="flex justify-between">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-red-600 text-white rounded font-semibold">ZPĚT</button>
                    <div className="flex gap-2">
                        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded font-semibold">ULOŽIT</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
