import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
    id: string;
    email: string;
    role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
    restaurantId: string;
};

type AuthContextType = {
    currentUser: User | null;
    loading: boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    loading: true,
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:4000/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error('Neplatný token');

                const data = await res.json();
                console.log('✅ Přihlášený uživatel:', data);
                setCurrentUser(data);
            } catch (err) {
                console.error('❌ Chyba při načítání uživatele:', err);
                setCurrentUser(null);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
