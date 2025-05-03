import { useState } from 'react';
import { useNotifications } from "../../context/notificationsContext.tsx";

const tabs = ['TAB', 'TAB', 'TAB'];

export default function NotificationsPanel() {
    const [activeTab, setActiveTab] = useState(0);
    const { notifications } = useNotifications();

    // Zobraz jen poslední dvě notifikace
    const displayed = notifications.slice(0, 2);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 min-h-[340px]">
            <div className="font-semibold mb-2">Upozornění</div>
            <div className="flex gap-4 border-b border-b-gray-200 mb-5">
                {tabs.map((tab, idx) => (
                    <button
                        key={tab + idx}
                        onClick={() => setActiveTab(idx)}
                        className={`flex items-center gap-1 pb-2 border-b-2 text-sm font-medium
              ${activeTab === idx
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-blue-600'}
            `}
                    >
                        <span>★</span>
                        {tab}
                    </button>
                ))}
            </div>
            <div>
                {displayed.length === 0 ? (
                    <>
                        <div className="bg-gray-100 rounded h-10"></div>
                        <div className="bg-gray-100 rounded h-10"></div>
                    </>
                ) : (
                    displayed.map(n => (
                        <div key={n.id} className="bg-gray-100 rounded h-10 flex items-center px-4 my-3">
                            {n.message}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
