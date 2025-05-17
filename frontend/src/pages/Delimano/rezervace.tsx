import React, { useState, useEffect } from "react";
import { FaClock, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ReservationPage() {
    const [step, setStep] = useState(1);
    const [selectedPersons, setSelectedPersons] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [note, setNote] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [times, setTimes] = useState<string[]>([]);
    const [loadingTimes, setLoadingTimes] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            if (!selectedDate || !selectedPersons) return;

            setLoadingTimes(true);
            try {
                const res = await fetch(
                    `http://localhost:4000/api/public/reservations/available-times?date=${selectedDate}&peopleCount=${selectedPersons}&restaurantId=ac561b99-2e6a-435c-b3db-208af04803e9`
                );

                if (!res.ok) throw new Error("Nepodařilo se načíst dostupné časy");

                const data = await res.json();
                setTimes(data);
            } catch (err) {
                console.error("Chyba při načítání časů:", err);
                setTimes([]);
            } finally {
                setLoadingTimes(false);
            }
        };

        fetchAvailableTimes();
    }, [selectedDate, selectedPersons]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:4000/api/public/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dateTime: `${selectedDate}T${selectedTime}`,
                    peopleCount: Number(selectedPersons),
                    note,
                    restaurantId: "ac561b99-2e6a-435c-b3db-208af04803e9",
                    tableId: null,
                    guest: {
                        firstName: name,
                        lastName: surname,
                        email,
                        phone,
                    },
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message || "Chyba při vytváření rezervace.");
                return;
            }

            setStep(4);
        } catch (error) {
            console.error(error);
            alert("Chyba při odesílání rezervace.");
        }
    };

    const summary = (
        <div className="mb-4 p-4 bg-white rounded shadow text-sm text-gray-800">
            <div><b>Počet osob:</b> {selectedPersons}</div>
            <div><b>Datum:</b> {selectedDate && new Date(selectedDate).toLocaleDateString("cs-CZ")}</div>
            <div><b>Čas:</b> {selectedTime}</div>
            {note && <div><b>Poznámka:</b> {note}</div>}
        </div>
    );

    function renderStep() {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Počet osob</label>
                                <select
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={selectedPersons}
                                    onChange={e => setSelectedPersons(e.target.value)}
                                >
                                    <option value="">Vyberte počet osob</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Datum</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">V kolik</label>
                            {loadingTimes ? (
                                <p className="text-sm text-gray-600">Načítání časů...</p>
                            ) : times.length === 0 && selectedDate && selectedPersons ? (
                                <p className="text-sm text-red-600">Žádné dostupné časy pro tento výběr.</p>
                            ) : (
                                <div className="grid grid-cols-4 gap-3 overflow-y-auto max-h-40">
                                    {times.map((time, idx) => (
                                        <button
                                            key={idx}
                                            className={`px-2 py-2 rounded border ${selectedTime === time ? 'bg-[#1b5e4b] text-white' : 'bg-white text-gray-700'} hover:bg-blue-100`}
                                            onClick={() => setSelectedTime(time)}
                                            type="button"
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-2 mt-14">
                            <button
                                className="px-6 py-2 bg-[#1b5e4b] text-white rounded hover:bg-[#125743]"
                                disabled={!selectedPersons || !selectedTime || !selectedDate}
                                onClick={() => setStep(2)}
                            >
                                POKRAČOVAT &rarr;
                            </button>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <label className="block text-sm font-medium mb-1">Poznámka</label>
                        <textarea
                            className="w-full border border-gray-300 rounded px-3 py-2 min-h-[80px] resize-y"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            placeholder="Zde můžete přidat poznámku k rezervaci (např. dětská židlička, bezlepkové menu...)"
                        />
                        <div className="flex justify-between gap-2 mt-56">
                            <button
                                className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                onClick={() => setStep(1)}
                            >
                                &larr; ZPĚT
                            </button>
                            <button
                                className="px-6 py-2 bg-[#1b5e4b] text-white rounded hover:bg-[#125743]"
                                onClick={() => setStep(3)}
                            >
                                POKRAČOVAT &rarr;
                            </button>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        {summary}
                        <form onSubmit={handleSubmit}>
                            <label className="block text-sm font-medium mb-1">Jméno</label>
                            <input
                                className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <label className="block text-sm font-medium mb-1">Příjmení</label>
                            <input
                                className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                                value={surname}
                                onChange={e => setSurname(e.target.value)}
                                required
                            />
                            <label className="block text-sm font-medium mb-1">E-mail</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <label className="block text-sm font-medium mb-1">Telefon</label>
                            <input
                                type="tel"
                                className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required
                            />
                            <div className="flex justify-between gap-2 mt-8">
                                <button
                                    type="button"
                                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                    onClick={() => setStep(2)}
                                >
                                    &larr; ZPĚT
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#1b5e4b] text-white rounded hover:bg-[#125743]"
                                    disabled={!name || !surname || !email || !phone}
                                >
                                    POKRAČOVAT &rarr;
                                </button>
                            </div>
                        </form>
                    </>
                );
            case 4:
                return (
                    <>
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-900 rounded text-center">
                            <b>Rezervace byla úspěšně provedena!</b>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="mb-6 text-sm px-4 py-2 bg-[#1b5e4b] text-white rounded hover:bg-[#125743] w-fit"
                                onClick={() => navigate("/")}
                            >
                                &lt; VRÁTIT SE ZPĚT
                            </button>
                        </div>
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="flex justify-center items-center flex-1">
                <div className="bg-white rounded shadow-md w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
                    <div className="md:w-1/2 w-full p-8 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-gray-200">
                        <button
                            className="mb-6 text-sm px-4 py-2 bg-[#1b5e4b] text-white rounded hover:bg-[#125743] w-fit"
                            onClick={() => navigate("/")}
                        >
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
                                Pardubice, Hradecká 123
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-xl text-gray-600" />
                            <div>
                                restaurant@gmail.com
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full p-8 bg-gray-100 flex flex-col gap-4 min-h-[470px]">
                        {renderStep()}
                    </div>
                </div>
            </div>
        </div>
    );
}
