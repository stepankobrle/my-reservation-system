import React from "react";

export default function header() {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://pplx-res.cloudinary.com/image/private/user_uploads/SQcVZfasCOCQPeN/image.jpg')",
            }}
        >
            {/* Tmavý překryv */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            {/* Obsah */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="bg-black bg-opacity-40 rounded p-8 mb-8">
                    <h1 className="text-white text-6xl md:text-7xl font-light text-center mb-8">
                        Nazev<br />restaurace
                    </h1>
                </div>
                <div className="flex gap-8">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded shadow font-medium text-lg transition">
                        MENU
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded shadow font-medium text-lg transition">
                        REZERVOVAT
                    </button>
                </div>
            </div>
        </div>
    );
}
