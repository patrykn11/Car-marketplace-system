import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [contactNumber, setContactNumber] = useState(localStorage.getItem("contactNumber"));
    const [location, setLocation] = useState(localStorage.getItem("location"));

    const register = async (username, password, email, contactNumber, location) => {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, email, contactNumber, location })
        });

        if (!res.ok) {
            throw new Error('Invalid credentials');
        }
        const data = await res.json();

        setToken(data.token);
        setUsername(username);
        setEmail(email);
        setContactNumber(contactNumber);
        setLocation(location);

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("contactNumber", contactNumber);
        localStorage.setItem("location", location);
    };

    const login = async (username, password) => {
        const res = await fetch("/api/auth/login", {
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
        setEmail(data.email)
        setContactNumber(data.contactNumber)
        setLocation(data.location)
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("contactNumber", data.contactNumber);
        localStorage.setItem("location", data.location);
    };

    const logout = () => {
        setToken(null);
        setUsername(null);
        setEmail(null);
        setContactNumber(null);
        setLocation(null);

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("contactNumber");
        localStorage.removeItem("location");

        navigate("/");
    };
    const authFetch = (url, options = {}) => {
        return fetch(url, {
            ...options,
            headers: {
                ...(options.headers || {}), "Authorization": `Bearer ${token}`
            }
        });
    };

    return (
        <AuthContext.Provider
            value={{
                token, login, register, logout, authFetch,
                isAuthenticated: !!token,
                username, email, contactNumber, location
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);