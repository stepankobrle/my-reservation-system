// src/pages/admin/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error('Chyba přihlášení');

            const { access_token } = await res.json();
            localStorage.setItem('token', access_token);

            navigate('/admin/');
        } catch (err) {
            setError('Nesprávné přihlašovací údaje');
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/images/restaurace.png')" }} // Nahraď cestou k tvému obrázku
        >
            <form
                onSubmit={handleLogin}
                className="bg-black bg-opacity-60 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 backdrop-blur-md"
            >
                <h1 className="text-3xl font-bold text-center">ADMIN</h1>
                <p className="text-center text-gray-300">Reservations and restaurant <br/> management</p>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 14v4m0 0h-3m3 0h3" />
                    </svg>
                </span>
                    <input
                        type="email"
                        placeholder="Username"
                        className="w-full pl-10 pr-4 py-2 rounded bg-gray-100 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 11c1.657 0 3 1.343 3 3v1H9v-1c0-1.657 1.343-3 3-3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 7a4 4 0 00-4 4v1H8v2h8v-2h-1v-1a4 4 0 00-4-4z" />
                    </svg>
                </span>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full pl-10 pr-4 py-2 rounded bg-gray-100 text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded font-semibold"
                >
                    Log In
                </button>

                <p className="text-center text-sm text-gray-300 hover:underline cursor-pointer">
                    Forgot password?
                </p>
            </form>
        </div>
    );
}
