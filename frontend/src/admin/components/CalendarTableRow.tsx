import React from 'react';
import { differenceInMinutes, getHours, getMinutes } from 'date-fns';

type Props = {
    table: any; // nebo přesný typ, např. TableWithReservations
};

const CalendarTableRow: React.FC<Props> = ({ table }) => {
    return (
        <>
            <div className="font-medium">{`Stůl ${table.number}`}</div>
            <div className="relative h-10 border rounded bg-gray-50 overflow-hidden">
                {table.reservations.map((res) => {
                    const start = new Date(res.start);
                    const end = new Date(res.end);
                    const startHour = getHours(start) + getMinutes(start) / 60;
                    const duration = differenceInMinutes(end, start) / 60;

                    return (
                        <div
                            key={res.id}
                            className="absolute h-full bg-blue-500 text-white text-xs px-1 rounded shadow"
                            style={{
                                left: `${(startHour / 24) * 100}%`,
                                width: `${(duration / 24) * 100}%`,
                            }}
                            title={`${res.guestName} (${res.peopleCount} os.)`}
                        >
                            {res.guestName}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default CalendarTableRow;

export class CalendarTableRowProps {
}