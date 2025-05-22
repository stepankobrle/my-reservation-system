import React from "react";
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ManageReservation() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [loading, setLoading] = useState(true);
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState('');
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [note, setNote] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [people, setPeople] = useState(1);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    useEffect(() => {
        if (!token) {
            setError('Token nebyl zadán.');
            return;
        }

        const fetchReservation = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/public/reservations/manage?token=${token}`);
                if (!res.ok) throw new Error('Rezervace nebyla nalezena.');

                const data = await res.json();
                setReservation(data);
                setNote(data.note || '');
                setPeople(data.peopleCount);
                const dt = new Date(data.reservationTime);
                setDate(dt.toISOString().slice(0, 10));
                setTime(dt.toTimeString().slice(0, 5));
            } catch (err) {
                setError(err.message || 'Chyba při načítání.');
            } finally {
                setLoading(false);
            }
        };

        fetchReservation();
    }, [token]);

    useEffect(() => {
        const fetchTimes = async () => {
            if (!date || !people || !reservation?.restaurantId) return;

            try {
                const res = await fetch(`http://localhost:4000/api/public/reservations/available-times?date=${date}&peopleCount=${people}&restaurantId=${reservation.restaurantId}`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                setAvailableTimes(data);
            } catch {
                setAvailableTimes([]);
            }
        };
        fetchTimes();
    }, [date, people, reservation]);

    const handleUpdate = async () => {
        if (!availableTimes.includes(time)) {
            alert('Vybraný čas již není dostupný.');
            return;
        }

        const newDateTime = new Date(`${date}T${time}`);
        const now = new Date();
        if (newDateTime < now) {
            alert('Rezervaci nelze změnit na čas v minulosti.');
            return;
        }

        setUpdating(true);
        try {
            const res = await fetch(`http://localhost:4000/api/public/reservations/manage?token=${token}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dateTime: `${date}T${time}`,
                    peopleCount: Number(people),
                    note,
                    restaurantId: reservation.restaurantId
                    // ✅ tableId i guest backend spočítá podle tokenu
                }),
            });

            if (!res.ok) throw new Error('Nepodařilo se aktualizovat rezervaci.');
            alert('Rezervace byla upravena.');
        } catch (err) {
            alert(err.message);
        } finally {
            setUpdating(false);
        }
    };


    const handleDelete = async () => {
        if (!window.confirm('Opravdu chcete rezervaci zrušit?')) return;

        setDeleting(true);
        try {
            const res = await fetch(`http://localhost:4000/api/public/reservations/manage?token=${token}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Nepodařilo se zrušit rezervaci.');
            alert('Rezervace byla zrušena.');
            navigate('/');
        } catch (err) {
            alert(err.message);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Načítání rezervace...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
    if (!reservation) return null;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10 space-y-4">
            <h1 className="text-xl font-bold text-center">Správa rezervace</h1>

            <div>
                <label className="block text-sm font-medium mb-1">Datum</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Čas</label>
                {availableTimes.length > 0 ? (
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Vyber čas</option>
                        {availableTimes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                ) : (
                    <p className="text-sm text-gray-600">Žádné dostupné časy</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Počet osob</label>
                <input
                    type="number"
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                    min={1}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Poznámka</label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="flex justify-between gap-4 mt-6">
                <button
                    onClick={handleUpdate}
                    disabled={updating}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Uložit změny
                </button>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Zrušit rezervaci
                </button>
            </div>
        </div>
    );
}
