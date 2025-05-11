// NotificationModal.tsx
import { useState } from "react";
import { Notification } from "../../pages/adminPages/notifications.tsx";
export default function NotificationModal({
                                              notification, onClose, onSave, onDelete
                                          }: {
    notification: Notification;
    onClose: () => void;
    onSave: (msg: string) => void;
    onDelete: () => void;
}) {
    const [value, setValue] = useState(notification.message);
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 min-w-[300px]">
                <h2 className="font-semibold mb-2">Upravit notifikaci</h2>
                <input className="border w-full mb-4 px-2 py-1 rounded" value={value} onChange={e => setValue(e.target.value)} />
                <div className="flex justify-end gap-2">
                    <button className="px-3 py-1 bg-gray-200 rounded" onClick={onClose}>Zrušit</button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => onSave(value)}>Uložit</button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={onDelete}>Smazat</button>
                </div>
            </div>
        </div>
    );
}
