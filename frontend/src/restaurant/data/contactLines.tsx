// src/restaurant/components/contactData.tsx
import { FaClock, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import React from "react";

export const contactLines = [
    {
        icon: <FaClock />,
        text: (
            <div>
                <b>Otevírací doba</b>
                <div className="flex justify-between w-52">
                    <span>po - ne</span>
                    <span>12:00 - 22:00</span>
                </div>
            </div>
        )
    },
    {
        icon: <FaMapMarkerAlt />,
        text: "Markt 17, 52062 Aachen"
    },
    {
        icon: <FaEnvelope />,
        text: (
            <a href="mailto:reservierungen@60stn.de" className="hover:underline text-blue-600">
                reservierungen@60stn.de
            </a>
        )
    }
];
