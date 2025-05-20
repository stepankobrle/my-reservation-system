import { useEffect, useState } from "react";
import MenuModal from "../../admin/components/menuModal";
import DeleteConfirmationModal from "../../admin/components/deleteConfirmationModal";
import MenuItemsPage from "./menuItemsPage";
import api from "../../admin/lib/axios";

export default function MenuManagement() {
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingMenu, setEditingMenu] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);
    const [menuDetail, setMenuDetail] = useState(null);
    const [tabToDelete, setTabToDelete] = useState(null);
    const [deleteTabModalOpen, setDeleteTabModalOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const res = await api.get("/api/admin/menu-tabs");
            setTabs(res.data);
            if (res.data.length > 0) setActiveTab(res.data[0].id);
        };
        loadData();
    }, []);

    const handleAddTab = async () => {
        const label = prompt("Název nové záložky:");
        if (label) {
            const res = await api.post("/api/admin/menu-tabs", { name: label });
            setTabs((prev) => [...prev, { ...res.data, menus: [] }]);
            setActiveTab(res.data.id);
        }
    };

    const handleTabDrag = (fromIdx, toIdx) => {
        const newTabs = [...tabs];
        const [movedTab] = newTabs.splice(fromIdx, 1);
        newTabs.splice(toIdx, 0, movedTab);
        setTabs(newTabs);

        // Uložení nového pořadí na backend
        const updates = newTabs.map((t, idx) => ({ id: t.id, order: idx }));
        api.patch('/api/admin/menu-tabs/order', { updates });
    };


    const handleDeleteTab = async (tabId) => {
        await api.delete(`/api/admin/menu-tabs/${tabId}`);
        setTabs((prev) => prev.filter((t) => t.id !== tabId));
        if (activeTab === tabId) {
            const newTabs = tabs.filter((t) => t.id !== tabId);
            setActiveTab(newTabs.length ? newTabs[0].id : null);
        }
    };

    const handleSaveMenu = async (menu) => {
        try {
            if (editingMenu) {
                const res = await api.patch(`/api/admin/menus/${editingMenu.id}`, {
                    name: menu.name,
                    isActive: menu.active,
                });
                setTabs((prev) =>
                    prev.map((tab) =>
                        tab.id === activeTab
                            ? {
                                ...tab,
                                menus: tab.menus.map((m) =>
                                    m.id === editingMenu.id ? res.data : m
                                ),
                            }
                            : tab
                    )
                );
            } else {
                const res = await api.post(`/api/admin/menus`, {
                    name: menu.name,
                    isActive: menu.active,
                    menuTabId: activeTab,
                });
                setTabs((prev) =>
                    prev.map((tab) =>
                        tab.id === activeTab
                            ? { ...tab, menus: [...tab.menus, res.data] }
                            : tab
                    )
                );
            }
            setModalOpen(false);
            setEditingMenu(null);
        } catch (err) {
            alert(err.response?.data?.message || "Chyba při ukládání menu");
        }
    };

    const handleDeleteMenu = async () => {
        await api.delete(`/api/admin/menus/${menuToDelete.id}`);
        setTabs((prev) =>
            prev.map((tab) =>
                tab.id === activeTab
                    ? { ...tab, menus: tab.menus.filter((m) => m.id !== menuToDelete.id) }
                    : tab
            )
        );
        setDeleteModalOpen(false);
        setMenuToDelete(null);
    };

    const handleMenuDrag = async (fromIdx, toIdx) => {
        const tab = tabs.find((t) => t.id === activeTab);
        if (!tab) return;

        const reordered = [...tab.menus];
        const [moved] = reordered.splice(fromIdx, 1);
        reordered.splice(toIdx, 0, moved);

        // Změna pořadí v databázi
        await Promise.all(
            reordered.map((menu, index) =>
                api.patch(`/api/admin/menus/${menu.id}`, {
                    order: index + 1, // pořadí začíná od 1
                })
            )
        );

        // Lokální update
        setTabs((prev) =>
            prev.map((t) =>
                t.id === activeTab
                    ? { ...t, menus: reordered }
                    : t
            )
        );
    };

    const activeTabObj = tabs.find((t) => t.id === activeTab);

    if (menuDetail) {
        return <MenuItemsPage menu={menuDetail} onBack={() => setMenuDetail(null)} />;
    }

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold mb-6">Správa menu</h1>
                <div className="flex justify-end mb-4">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white rounded w-10 h-10 flex items-center justify-center text-2xl pb-1"
                        onClick={() => {
                            setEditingMenu(null);
                            setModalOpen(true);
                        }}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex gap-2 border-b mb-6">
                {tabs.map((tab, idx) => (
                    <div
                        key={tab.id}
                        className="flex items-center group"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("tab-idx", idx.toString())}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            const fromIdx = +e.dataTransfer.getData("tab-idx");
                            handleTabDrag(fromIdx, idx);
                        }}
                    >
                        <button
                            className={`pb-2 px-2 border-b-2 font-medium ${
                                activeTab === tab.id
                                    ? "border-blue-600 text-blue-600 font-bold"
                                    : "border-transparent text-gray-500"
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.name}
                        </button>
                        {tabs.length > 1 && (
                            <button
                                className="ml-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition pb-2"
                                title="Smazat záložku"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTabToDelete(tab.id);
                                    setDeleteTabModalOpen(true);
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
                <button
                    className="pb-2 px-2 border-b-2 border-transparent text-green-600 font-bold"
                    onClick={handleAddTab}
                >
                    + Přidat záložku
                </button>
            </div>

            <div className="bg-gray-100 rounded">
                <div className="flex items-center px-6 py-3 border-b font-semibold">
                    <div className="flex-1">Název menu</div>
                    <div className="w-24 text-center">Aktivní</div>
                    <div className="w-24"></div>
                </div>
                {activeTabObj?.menus.map((menu, idx) => (
                    <div
                        key={menu.id}
                        className="flex items-center px-6 py-3 border-b last:border-b-0 bg-white cursor-pointer group"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("idx", idx.toString())}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            const fromIdx = +e.dataTransfer.getData("idx");
                            handleMenuDrag(fromIdx, idx);
                        }}
                        onClick={() => setMenuDetail(menu)}
                    >
                        <div className="flex-1">{menu.name}</div>
                        <div className="w-24 text-center">
                            <input
                                type="checkbox"
                                checked={menu.isActive}
                                onChange={async (e) => {
                                    try {
                                        const res = await api.patch(`/api/admin/menus/${menu.id}`, {
                                            isActive: e.target.checked,
                                        });
                                        setTabs((prev) =>
                                            prev.map((tab) =>
                                                tab.id === activeTab
                                                    ? {
                                                        ...tab,
                                                        menus: tab.menus.map((m) =>
                                                            m.id === menu.id ? res.data : m
                                                        ),
                                                    }
                                                    : tab
                                            )
                                        );
                                    } catch (err) {
                                        alert(err.response?.data?.message || "Chyba při přepnutí aktivního menu");
                                    }
                                }}
                            />
                        </div>
                        <div className="w-24 flex justify-end gap-4  transition">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingMenu(menu);
                                    setModalOpen(true);
                                }}
                                className="text-gray-600 hover:text-green-700"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuToDelete(menu);
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
                <MenuModal
                    menu={editingMenu}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingMenu(null);
                    }}
                    onSave={handleSaveMenu}
                />
            )}

            {deleteModalOpen && menuToDelete && (
                <DeleteConfirmationModal
                    onClose={() => {
                        setDeleteModalOpen(false);
                        setMenuToDelete(null);
                    }}
                    onConfirm={handleDeleteMenu}
                />
            )}

            {deleteTabModalOpen && tabToDelete && (
                <DeleteConfirmationModal
                    onClose={() => {
                        setDeleteTabModalOpen(false);
                        setTabToDelete(null);
                    }}
                    onConfirm={() => {
                        handleDeleteTab(tabToDelete);
                        setDeleteTabModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}
