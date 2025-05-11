import * as React from "react";


export default function HeroSection({ title, backgroundImage }) {
    return (
        <div
            className="relative w-full h-80 flex items-center justify-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Tmavý překryv */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            {/* Nadpis */}
            <h1 className="relative z-10 text-white text-8xl font-bold text-center">
                {title}
            </h1>
        </div>
    );
}
