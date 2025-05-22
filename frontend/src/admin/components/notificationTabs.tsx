import React from "react";
// NotificationTabs.tsx
export default function NotificationTabs({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: (i: number) => void }) {
    return (
        <div className="flex gap-6">
            {[0, 1, 2].map(i => (
                <button
                    key={i}
                    className={`flex items-center gap-1 pb-2 text-base font-medium ${activeTab === i ? "text-gray-900" : "text-gray-400 hover:text-gray-700"}`}
                    onClick={() => setActiveTab(i)}
                >
                    <span>★</span> TAB
                </button>
            ))}
        </div>
    );
}
