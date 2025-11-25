import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = async (username, password) => {
        const res = await fetch("http://localhost:3333/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await res.json();
        setToken(data.token);
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };
    const authFetch = (url, options = {}) => {
        return fetch(url, {...options,
            headers: {...(options.headers || {}), "Authorization": `Bearer ${token}`
            }
        });
    };

    return (
        <AuthContext.Provider
            value={{ token, login, logout, authFetch, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);