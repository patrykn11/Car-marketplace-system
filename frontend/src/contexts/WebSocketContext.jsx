import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { WS_BASE_URL } from '../config';
import SockJS from 'sockjs-client';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

/**
 * Context for managing WebSocket connections and real-time notifications.
 */
const WebSocketContext = createContext(null);

/**
 * WebSocket provider component that manages STOMP connections.
 * Handles real-time notifications for favorite advertisements and chat messages.
 * Automatically connects when user is authenticated and disconnects on logout.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component with WebSocket context
 */
export const WebSocketProvider = ({ children }) => {
    const { isAuthenticated, authFetch, username } = useAuth();
    const stompClientRef = useRef(null);
    const subscriptionsRef = useRef(new Map());
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            connect();
        } else {
            disconnect();
        }

        return () => {
            disconnect();
        };
    }, [isAuthenticated]);

    /**
     * Establish WebSocket connection using SockJS and STOMP protocol.
     * Subscribes to user's message queue and favorite advertisements on connect.
     */
    const connect = () => {
        if (stompClientRef.current?.active) return;

        const socket = new SockJS(WS_BASE_URL);
        const token = localStorage.getItem('access_token');

        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: () => {
                console.log('Global WebSocket Connected');
                setIsConnected(true);
                fetchFavoritesAndSubscribe(client);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
            onWebSocketClose: () => {
                console.log('Global WebSocket Closed');
                setIsConnected(false);
                subscriptionsRef.current.clear();
            }
        });

        client.activate();
        stompClientRef.current = client;
    };

    /**
     * Close WebSocket connection and clean up all subscriptions.
     */
    const disconnect = () => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
            stompClientRef.current = null;
        }
        subscriptionsRef.current.clear();
        setIsConnected(false);
    };

    const messageListeners = useRef(new Set());

    const registerMessageListener = (callback) => {
        messageListeners.current.add(callback);
        return () => messageListeners.current.delete(callback);
    };

    const fetchFavoritesAndSubscribe = async (client) => {
        client.subscribe('/user/queue/messages', (message) => {
            const msg = JSON.parse(message.body);
            let handled = false;
            messageListeners.current.forEach(listener => {
                if (listener(msg)) {
                    handled = true;
                }
            });

            if (!handled && msg.senderUsername !== username) {
                toast.info(`New message from ${msg.senderUsername}: ${msg.content.substring(0, 20)}...`);
            }
        });

        try {
            const response = await authFetch('/api/favorites');
            if (response.ok) {
                const favorites = await response.json();
                favorites.forEach(id => {
                    subscribeToTopic(id, client);
                });
            }
        } catch (error) {
            console.error("Failed to fetch favorites for WS subscription", error);
        }
    };

    /**
     * Subscribe to notifications for a specific advertisement.
     * Displays toast notifications when the advertisement is updated.
     * 
     * @param {number} id - Advertisement ID to subscribe to
     * @param {Object} client - Optional STOMP client instance
     */
    const subscribeToTopic = (id, client = stompClientRef.current) => {
        if (!client || !client.active) return;
        if (subscriptionsRef.current.has(id)) return;

        console.log(`Subscribing to /topic/post/${id}`);
        const subscription = client.subscribe(`/topic/post/${id}`, (message) => {
            const notification = JSON.parse(message.body);

            if (notification.senderUsername && notification.senderUsername === username) {
                return;
            }
            toast.info(notification.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
        subscriptionsRef.current.set(id, subscription);
    };

    /**
     * Unsubscribe from notifications for a specific advertisement.
     * 
     * @param {number} id - Advertisement ID to unsubscribe from
     */
    const unsubscribeFromTopic = (id) => {
        const subscription = subscriptionsRef.current.get(id);
        if (subscription) {
            console.log(`Unsubscribing from /topic/post/${id}`);
            subscription.unsubscribe();
            subscriptionsRef.current.delete(id);
        }
    };

    return (
        <WebSocketContext.Provider value={{ subscribeToTopic, unsubscribeFromTopic, isConnected, registerMessageListener }}>
            {children}
        </WebSocketContext.Provider>
    );
};

/**
 * Custom hook to access WebSocket context.
 * Provides methods for subscribing/unsubscribing to topics and registering message listeners.
 * 
 * @returns {Object} WebSocket context with subscribeToTopic, unsubscribeFromTopic, isConnected, registerMessageListener
 */
export const useWebSocket = () => useContext(WebSocketContext);
