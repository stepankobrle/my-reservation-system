import React from "react";
import toast from "react-hot-toast";

type Props = {
    onClose: () => void;
    onConfirm: () => Promise<void>;
    children?: React.ReactNode;
};

export default function DeleteConfirmationModal({ onClose, onConfirm, children }: Props) {
    const handleDelete = async () => {
        try {
            await onConfirm();
            toast.success("Rezervace byla smazána");
            onClose();
        } catch (err) {
            console.error("Chyba při mazání", err);
            toast.error("Nepodařilo se smazat rezervaci");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Potvrdit smazání</h2>
                <p className="text-gray-600 mb-6">
                    Opravdu chcete smazat: <strong>{children}</strong>?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Zrušit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Smazat
                    </button>
                </div>
            </div>
        </div>
    );
}
