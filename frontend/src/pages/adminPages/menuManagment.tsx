import { useState } from "react";
import MenuModal from "../../admin/components/menuModal";
import DeleteConfirmationModal from "../../admin/components/deleteConfirmationModal";
import MenuItemsPage from "./menuItemsPage"; // stránka pro položky menu

export default function MenuManagement() {
    // Každý tab má unikátní id, label, pole menu
    const [tabs, setTabs] = useState([
        { id: "denni", label: "Denní menu", menus: [] },
        { id: "stale", label: "Stálé menu", menus: [] },
    ]);
    const [activeTab, setActiveTab] = useState("denni");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingMenu, setEditingMenu] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);
    const [menuDetail, setMenuDetail] = useState(null); // pro otevření stránky s položkami
    const [tabToDelete, setTabToDelete] = useState(null);
    const [deleteTabModalOpen, setDeleteTabModalOpen] = useState(false);

    // Přidání nového tabu
    const handleAddTab = () => {
        const label = prompt("Název nové záložky:");
        if (label) {
            const newId = Date.now().toString();
            setTabs([...tabs, { id: newId, label, menus: [] }]);
            setActiveTab(newId);
        }
    };

    // Smazání tabu
    const handleDeleteTab = (tabId) => {
        setTabs((prev) => prev.filter((t) => t.id !== tabId));
        // Pokud mažu aktivní tab, přepnu na první zbývající
        if (activeTab === tabId) {
            const newTabs = tabs.filter((t) => t.id !== tabId);
            setActiveTab(newTabs.length ? newTabs[0].id : null);
        }
    };

    // Přidání/upravení menu do aktivního tabu
    const handleSaveMenu = (menu) => {
        setTabs((prev) =>
            prev.map((tab) =>
                tab.id === activeTab
                    ? {
                        ...tab,
                        menus: editingMenu
                            ? tab.menus.map((m) => (m.id === menu.id ? menu : m))
                            : [...tab.menus, { ...menu, id: Date.now().toString() }],
                    }
                    : tab
            )
        );
        setModalOpen(false);
        setEditingMenu(null);
    };

    // Smazání menu z aktivního tabu
    const handleDeleteMenu = () => {
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

    // Drag & drop menu v aktivním tabu
    const handleMenuDrag = (fromIdx, toIdx) => {
        setTabs((prev) =>
            prev.map((tab) =>
                tab.id === activeTab
                    ? {
                        ...tab,
                        menus: (() => {
                            const arr = [...tab.menus];
                            const [item] = arr.splice(fromIdx, 1);
                            arr.splice(toIdx, 0, item);
                            return arr;
                        })(),
                    }
                    : tab
            )
        );
    };

    // Získání aktivního tabu a jeho menu
    const activeTabObj = tabs.find((t) => t.id === activeTab);

    // Pokud je otevřen detail menu, zobraz stránku s položkami jídel
    if (menuDetail) {
        return (
            <MenuItemsPage
                menu={menuDetail}
                onBack={() => setMenuDetail(null)}
            />
        );
    }

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold mb-6">Správa menu</h1>

                {/* Přidat menu */}
                <div className="flex justify-end mb-4">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white rounded w-10 h-10 flex items-center justify-center text-2xl pb-1"
                        onClick={() => {
                            setEditingMenu(null);
                            setModalOpen(true);
                        }}
                    >+</button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b mb-6">
                {tabs.map((tab) => (
                    <div key={tab.id} className="flex items-center group">
                        <button
                            className={`pb-2 px-2 border-b-2 font-medium ${activeTab === tab.id ? "border-blue-600 text-blue-600 font-bold" : "border-transparent text-gray-500"}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                             {tab.label}
                        </button>
                        {/* Smazání tabu (kromě posledního) */}
                        {tabs.length > 1 && (
                            <button
                                className="ml-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition pb-2"
                                title="Smazat záložku"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTabToDelete(tab.id);
                                    setDeleteTabModalOpen(true);
                                }}
                            >✕</button>
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


            {/* Tabulka menu v aktivním tabu */}
            <div className="bg-gray-100 rounded">
                <div className="flex items-center px-6 py-3 border-b font-semibold">
                    <div className="flex-1">Název menu</div>
                    <div className="w-24 text-center">Aktivní</div>
                    <div className="w-24"></div>
                </div>
                {activeTabObj.menus.map((menu, idx) => (
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
                                checked={menu.active}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setTabs((prev) =>
                                        prev.map((tab) =>
                                            tab.id === activeTab
                                                ? {
                                                    ...tab,
                                                    menus: tab.menus.map((m) =>
                                                        m.id === menu.id
                                                            ? { ...m, active: !m.active }
                                                            : m
                                                    ),
                                                }
                                                : tab
                                        )
                                    );
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
                            >✏️</button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuToDelete(menu);
                                    setDeleteModalOpen(true);
                                }}
                                className="text-gray-600 hover:text-red-700"
                            >🗑️</button>
                        </div>
                    </div>
                ))}
            </div>





            {/* Modals */}
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

