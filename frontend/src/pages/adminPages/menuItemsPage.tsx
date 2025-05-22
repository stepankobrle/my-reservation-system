import React from "react";
import { useEffect, useState } from "react";
import MenuItemModal from "../../admin/components/menuItemsModal";
import api from "../../admin/lib/axios";
import DeleteConfirmationModal from "../../admin/components/deleteConfirmationModal";

export default function MenuItemsPage({ menu, onBack }) {
    const [items, setItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            const res = await api.get(`/api/admin/menu-items`, {
                params: { menuId: menu.id },
            });
            const sorted = res.data.sort((a, b) => a.order - b.order);
            setItems(sorted);
        };
        loadItems();
    }, [menu.id]);

    const handleSaveItem = async (item) => {
        let savedItem;
        if (editingItem) {
            const res = await api.patch(`/api/admin/menu-items/${item.id}`, item);
            savedItem = res.data;
            setItems((prev) =>
                prev.map((i) => (i.id === savedItem.id ? savedItem : i))
            );
        } else {
            const res = await api.post(`/api/admin/menu-items`, {
                ...item,
                menuId: menu.id,
            });
            savedItem = res.data;
            setItems((prev) => [...prev, savedItem]);
        }
        setModalOpen(false);
        setEditingItem(null);
    };

    const handleDrag = (fromIdx, toIdx) => {
        const updated = [...items];
        const [moved] = updated.splice(fromIdx, 1);
        updated.splice(toIdx, 0, moved);

        setItems(updated);

        // Zaktualizuj pořadí na backendu
        updated.forEach(async (item, index) => {
            if (item.order !== index + 1) {
                await api.patch(`/api/admin/menu-items/${item.id}`, { order: index + 1 });
            }
        });
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <button onClick={onBack} className="mb-4 p-1 px-4 rounded-md text-white bg-blue-600">
                &larr; Zpět
            </button>

            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold mb-6">{menu.name}</h2>
                <button
                    className="bg-green-600 hover:bg-green-700 text-white rounded w-10 h-10 flex items-center justify-center text-2xl pb-1"
                    onClick={() => {
                        setEditingItem(null);
                        setModalOpen(true);
                    }}
                >
                    +
                </button>
            </div>

            <div className="bg-gray-100 rounded">
                <div className="grid grid-cols-3 lg:grid-cols-5 px-6 py-3 border-b font-semibold">
                    <div>Název</div>
                    <div className="hidden md:block">Popisek</div>
                    <div className="hidden md:block">Alergeny</div>
                    <div>Cena</div>
                    <div></div>
                </div>

                {items.map((item, idx) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-3 lg:grid-cols-5 px-6 py-3 border-b last:border-b-0 bg-white cursor-move"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("idx", idx.toString())}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            const from = +e.dataTransfer.getData("idx");
                            handleDrag(from, idx);
                        }}
                    >
                        <div>{item.name}</div>
                        <div className="hidden md:block">{item.description}</div>
                        <div className="hidden md:block">{item.allergens?.join(", ")}</div>
                        <div>{item.price}</div>
                        <div className="flex gap-10">
                            <button
                                onClick={() => {
                                    setEditingItem(item);
                                    setModalOpen(true);
                                }}
                                className="text-gray-600 hover:text-green-700"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => {
                                    setItemToDelete(item);
                                    setDeleteModalOpen(true);
                                }}
                                className="text-gray-600 hover:text-red-700"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <MenuItemModal
                    item={editingItem}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingItem(null);
                    }}
                    onSave={handleSaveItem}
                />
            )}

            {deleteModalOpen && (
                <DeleteConfirmationModal
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={async () => {
                        await api.delete(`/api/admin/menu-items/${itemToDelete.id}`);
                        setItems((prev) => prev.filter((i) => i.id !== itemToDelete.id));
                        setDeleteModalOpen(false);
                    }}
                >
                    {itemToDelete?.name}
                </DeleteConfirmationModal>
            )}
        </div>
    );
}
