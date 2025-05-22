import React from "react";
import { useEffect, useState } from "react";
import api from "../../admin/lib/axios";

export default function PublicMenu({ restaurantId }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                if (!restaurantId) return;
                const res = await api.get(`/api/public/menus/${restaurantId}`);
                console.log("Public menu data:", res.data);
                setData(res.data);
            } catch (err) {
                console.error("Chyba při načítání menu:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, [restaurantId]);

    if (loading) return <div className="p-8">Načítání menu...</div>;

    return (
        <div className="px-4 py-8 sm:px-8 lg:px-16 flex justify-center">
            <div className="w-full max-w-screen-lg lg:min-w-[800px]">
                {data.length === 0 && (
                    <p className="text-center text-gray-500">Žádné menu není dostupné.</p>
                )}

                {data.map((tab) => (
                    <div key={tab.id} className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">{tab.tabName}</h2>

                        {tab.menus && tab.menus.length > 0 ? (
                            tab.menus.map((menu) => (
                                <div key={menu.id} className="mb-10">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-700">{menu.name}</h3>

                                    <div className="space-y-6">
                                        {menu.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="border-b pb-4 flex flex-col sm:flex-row justify-between gap-2 sm:items-center"
                                            >
                                                {/* LEVÁ STRANA: Název + alergeny */}
                                                <div className="flex flex-col sm:flex-1">
                                                    <p className="font-medium text-lg text-gray-900">{item.name}</p>
                                                    {Array.isArray(item.allergens) && item.allergens.length > 0 && (
                                                        <p className="text-xs text-gray-500 italic">
                                                            Alergeny: {item.allergens.join(", ")}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* STŘED: Popis, vycentrován a zalamuje se */}
                                                {item.description && (
                                                    <div className="sm:flex-1 text-sm text-gray-600 sm:px-4 break-words">
                                                        {item.description}
                                                    </div>
                                                )}

                                                {/* PRAVÁ STRANA: Cena */}
                                                <div className="text-right font-semibold text-gray-800 min-w-[70px] sm:text-lg sm:flex-1 sm:text-end">
                                                    {item.price} Kč
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 italic">Žádné aktivní menu</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
