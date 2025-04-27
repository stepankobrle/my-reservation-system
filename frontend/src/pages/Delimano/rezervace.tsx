import React, { useState } from "react";
import { FaClock, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function ReservationPage() {
    const [selectedPersons, setSelectedPersons] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    // Ukázková data pro časy
    const times = [
        "10:00", "10:30", "11:00", "11:30",
        "10:00", "10:30", "11:00", "11:30",
        "10:00", "10:30", "11:00", "11:30",
        "10:00", "10:30", "11:00", "11:30",
    ];
    const personOptions = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hero sekce */}

            {/* Rezervační box */}
            <div className="flex justify-center items-center flex-1">
                <div className="bg-white rounded shadow-md w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
                    {/* Levý panel */}
                    <div className="md:w-1/2 w-full p-8 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-gray-200">
                        <button className="mb-6 text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-fit">
                            &lt; VRÁTIT SE ZPĚT
                        </button>
                        <div className="flex items-center gap-3">
                            <FaClock className="text-xl text-gray-600" />
                            <div>
                                <div className="font-semibold text-lg">Otevírací doba</div>
                                <div className="text-gray-700">po - ne</div>
                                <div className="text-gray-700">12:00 - 22:00</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-xl text-gray-600" />
                            <div>
                                Markt 17, 52062 Aachen
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-xl text-gray-600" />
                            <div>
                                reservierungen@60stn.de
                            </div>
                        </div>
                    </div>

                    {/* Pravý panel */}
                    <div className="md:w-1/2 w-full p-8 bg-gray-100 flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Počet osob</label>
                                <select
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={selectedPersons}
                                    onChange={e => setSelectedPersons(e.target.value)}
                                >
                                    <option value="">Vyberte počet osob</option>
                                    {personOptions.map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Start date</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-3 overflow-y-auto max-h-40">
                            {times.map((time, idx) => (
                                <button
                                    key={idx}
                                    className={`px-2 py-2 rounded border ${selectedTime === time ? "bg-blue-600 text-white" : "bg-white text-gray-700"} hover:bg-blue-100`}
                                    onClick={() => setSelectedTime(time)}
                                    type="button"
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 self-end">
                            POKRAČOVAT &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
