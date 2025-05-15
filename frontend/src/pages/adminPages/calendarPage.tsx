import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CalendarTableRow, { CalendarTableRowProps } from '../../admin/components/CalendarTableRow';
import { format, addDays } from 'date-fns';

const CalendarPage = ({ restaurantId }) => {
    const [date, setDate] = useState(new Date());
    const [calendarData, setCalendarData] = useState([]);

    const fetchCalendar = async () => {
        const dateStr = format(date, 'yyyy-MM-dd');
        console.log('fetchCalendar spuštěn s:', restaurantId, dateStr);
        try {
            const res = await axios.get('/api/admin/calendar', {
                params: { restaurantId, date: dateStr },
            });
            console.log('data:', res.data);
            setCalendarData(res.data.tables);
        } catch (err) {
            console.error('Chyba při volání calendar API:', err);
        }
    };

    useEffect(() => {
        const fetchCalendar = async () => {
            const dateStr = format(date, 'yyyy-MM-dd');
            console.log('🔍 Volám /api/admin/calendar s:', restaurantId, dateStr);

            try {
                const res = await axios.get('/api/admin/calendar', {
                    params: { restaurantId, date: dateStr },
                });
                console.log('✅ Data z API:', res.data);
                setCalendarData(res.data.tables); // ← sem přijde []
            } catch (err) {
                console.error('❌ Chyba při načítání kalendáře:', err);
            }
        };

        fetchCalendar();
    }, [date]);

    const goToPrevDay = () => setDate(addDays(date, -1));
    const goToNextDay = () => setDate(addDays(date, 1));

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <button onClick={goToPrevDay} className="btn">◀︎</button>
                <h2 className="text-lg font-bold">{format(date, 'PPP')}</h2>
                <button onClick={goToNextDay} className="btn">▶︎</button>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[1000px]">
                    <div className="grid grid-cols-[150px_1fr] gap-2">
                        <div className="font-semibold">Stůl</div>
                        <div className="grid grid-cols-24 gap-[1px] text-xs text-center text-gray-500">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <div key={i}>{i}:00</div>
                            ))}
                        </div>

                        {calendarData.map((table) => (
                            <CalendarTableRow key={table.id} table={table} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
