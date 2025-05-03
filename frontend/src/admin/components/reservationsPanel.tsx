export default function ReservationsPanel() {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 min-h-[340px]">
            <div className="flex items-center mb-5">
                <div className="font-semibold flex-1">Rezervace</div>
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1 ml-1">Label</label>
                    <select className="border border-blue-400 rounded px-3 py-1 text-sm focus:outline-none">
                        <option>Kdy</option>
                        {/* Další možnosti */}
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
                {/* Zde se vloží rezervace */}
                <div className="bg-gray-100 rounded h-10"></div>
                <div className="bg-gray-100 rounded h-10"></div>
            </div>
        </div>
    );
}
