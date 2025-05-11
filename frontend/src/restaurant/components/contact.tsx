import React from "react";

// Příklad importu ikon z react-icons
import { FaClock, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Contakt({
                                    title = "Kontakt",
                                    contactLines = [],
                                    imageSrc,
                                    imageAlt = "Mapa nebo foto"
                                }) {
    return (
        <section className="w-full bg-gray-100 py-12">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-light text-center mb-8">{title}</h2>
                <div className="flex flex-col md:flex-row items-start justify-center gap-8">
                    {/* Kontaktní údaje vlevo */}
                    <div className="md:w-1/2 w-full text-left text-lg md:text-xl leading-relaxed space-y-4">
                        {contactLines.map((line, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                {line.icon && (
                                    <span className="mt-1 text-2xl text-gray-700 flex-shrink-0">
                                        {line.icon}
                                    </span>
                                )}
                                <div>{line.text}</div>
                            </div>
                        ))}
                    </div>
                    {/* Mapa nebo obrázek vpravo */}
                    <div className="md:w-1/2 w-full flex justify-center">
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="w-full max-w-md h-56 object-cover rounded"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
