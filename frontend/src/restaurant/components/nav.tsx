import React from "react";
import { useState } from "react";
// @ts-ignore
import Logo from "../../img/logo.png";
import { Link } from "react-router-dom";
export default function Nav() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-black w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                    <img src={Logo as string} alt="Logo" className="h-16" />
                </div>

                {/* Desktop menu */}
                    <nav className=" hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-white hover:text-yellow-400 transition font-medium">Home</Link>
                        <Link to="/" className="text-white hover:text-yellow-400 transition font-medium">O nás</Link>
                        <Link to="/menu" className="text-white hover:text-yellow-400 transition font-medium">Menu</Link>
                        <Link to="/" className="text-white hover:text-yellow-400 transition font-medium">Kontakt</Link>

                        <Link
                            to="/rezervace"
                            className="px-4 py-2 bg-[#1b5e4b] text-white rounded hover:bg-[#125743] transition font-bold"
                            onClick={() => setOpen(false)}
                        >
                            REZERVOVAT
                        </Link>
                    </nav>

                {/* Hamburger menu button */}
                <button
                    className="md:hidden flex flex-col justify-center items-center"
                    onClick={() => setOpen(!open)}
                    aria-label="Otevřít menu"
                >
                    <span className="block w-6 h-0.5 bg-white mb-1"></span>
                    <span className="block w-6 h-0.5 bg-white mb-1"></span>
                    <span className="block w-6 h-0.5 bg-white"></span>
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <nav className="md:hidden w-full bg-black flex flex-col items-center space-y-4 py-4 z-50 shadow-lg">
                    <Link to="/" className="text-white hover:text-yellow-400 transition">Home</Link>
                    <Link to="/o-nas" className="text-white hover:text-yellow-400 transition">O nás</Link>
                    <Link to="/menu" className="text-white hover:text-yellow-400 transition">Menu</Link>
                    <Link to="/kontakt" className="text-white hover:text-yellow-400 transition">Kontakt</Link>
                    <Link
                        to="/rezervace"
                        className="px-4 py-2 bg-[#1b5e4b] text-white rounded hover:bg-[#125743] transition"
                        onClick={() => setOpen(false)}
                    >
                        REZERVOVAT
                    </Link>
                </nav>
            )}
        </nav>
    );
}
