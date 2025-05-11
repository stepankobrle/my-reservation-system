import * as React from "react";
// @ts-ignore
import HeaderFoto from "../../img/hp-foto.webp";

export default function header() {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    `url(${HeaderFoto})`,
            }}
        >
            {/* Tmavý překryv */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

            {/* Obsah */}
            <div className="relative z-10 flex flex-col items-center">
                <div className=" rounded p-8 mb-8">
                    <h1 className="text-white text-6xl md:text-9xl font-extrabold text-center mb-8">
                        Nazev<br />restaurace
                    </h1>
                </div>
                <div className="flex gap-8">
                    <button className="bg-[#1b5e4b] hover:bg-[#125743] text-white px-8 py-3 rounded shadow font-medium text-lg transition">
                        MENU
                    </button>
                    <button className="bg-[#1b5e4b] hover:bg-[#125743] text-white px-8 py-3 rounded shadow font-medium text-lg transition">
                        REZERVOVAT
                    </button>
                </div>
            </div>
        </div>
    );
}
