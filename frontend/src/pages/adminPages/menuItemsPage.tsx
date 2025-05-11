import { useState } from "react";
import MenuItemModal from "../../admin/components/menuItemsModal";

export default function MenuItemsPage({ menu, onBack }) {
    const [items, setItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleSaveItem = (item) => {
        if (editingItem) {
            setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
        } else {
            setItems((prev) => [...prev, { ...item, id: Date.now().toString() }]);
        }
        setModalOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <button onClick={onBack} className="mb-4 p-1 px-4 rounded-md text-white bg-blue-600">&larr; Zpět</button>

            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold mb-6">{menu.name}</h2>
                <button
                    className="bg-green-600 hover:bg-green-700 text-white rounded w-10 h-10 flex items-center justify-center text-2xl pb-1"
                    onClick={() => {
                        setEditingItem(null);
                        setModalOpen(true);
                    }}
                >+</button>
            </div>
            <div className="bg-gray-100 rounded">
                <div className="grid grid-cols-6 px-6 py-3 border-b font-semibold">
                    <div>Název</div>
                    <div>Gramy</div>
                    <div>Popisek</div>
                    <div>Alergeny</div>
                    <div>Cena</div>
                    <div></div>
                </div>
                {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-6 px-6 py-3 border-b last:border-b-0 bg-white">
                        <div>{item.name}</div>
                        <div>{item.grams}</div>
                        <div>{item.note}</div>
                        <div>{item.allergens?.join(", ")}</div>
                        <div>{item.price}</div>
                        <div className="flex gap-2">
                            <button onClick={() => { setEditingItem(item); setModalOpen(true); }} className="text-gray-600 hover:text-green-700">✏️</button>
                            {/* případně tlačítko pro mazání */}
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen && (
                <MenuItemModal
                    item={editingItem}
                    onClose={() => { setModalOpen(false); setEditingItem(null); }}
                    onSave={handleSaveItem}
                />
            )}
        </div>
    );
}
