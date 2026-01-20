import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Context for managing user authentication state across the application.
 * Provides access to auth token, user info, and authentication methods.
 */
const AuthContext = createContext();

/**
 * Authentication provider component that wraps the application.
 * Manages user login state, token storage, and provides authentication utilities.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component with auth context
 */
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [contactNumber, setContactNumber] = useState(localStorage.getItem("contactNumber"));
    const [location, setLocation] = useState(localStorage.getItem("location"));

    /**
     * Register a new user account.
     * Stores credentials in local storage and updates context state.
     * 
     * @param {string} username - User's chosen username
     * @param {string} password - User's password
     * @param {string} email - User's email address
     * @param {string} contactNumber - User's contact phone number
     * @param {string} location - User's location
     * @throws {Error} If registration fails
     */
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

    /**
     * Authenticate user with username and password.
     * Retrieves JWT token and stores user data in local storage.
     * 
     * @param {string} username - User's username
     * @param {string} password - User's password
     * @throws {Error} If credentials are invalid
     */
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

    /**
     * Log out the current user.
     * Clears all auth data from state and local storage, redirects to home.
     */
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

    /**
     * Fetch wrapper that automatically includes the Authorization header.
     * 
     * @param {string} url - The URL to fetch
     * @param {Object} options - Fetch options (method, body, etc.)
     * @returns {Promise<Response>} Fetch response with auth header included
     */
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

/**
 * Custom hook to access authentication context.
 * Provides access to auth state and methods (login, logout, register, authFetch).
 * 
 * @returns {Object} Auth context value containing token, user info, and auth methods
 */
export const useAuth = () => useContext(AuthContext);