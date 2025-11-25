import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [username, setUsername] = useState(localStorage.getItem("username"));

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
        setUsername(username);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    };
    const authFetch = (url, options = {}) => {
        return fetch(url, {...options,
            headers: {...(options.headers || {}), "Authorization": `Bearer ${token}`
            }
        });
    };

    return (
        <AuthContext.Provider
            value={{ token, login, logout, authFetch, isAuthenticated: !!token, username }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);