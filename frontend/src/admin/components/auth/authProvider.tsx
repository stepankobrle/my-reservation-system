import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;

            try {
                const res = await fetch('http://localhost:4000/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const user = await res.json();
                setCurrentUser(user);
            } catch (err) {
                console.error('Chyba při načítání uživatele:', err);
                setCurrentUser(null);
            }
        };

        fetchUser();
    }, [token]);

    const login = (accessToken: string) => {
        localStorage.setItem('token', accessToken);
        setToken(accessToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
