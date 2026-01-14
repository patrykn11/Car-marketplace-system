import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWebSocket } from '../contexts/WebSocketContext';

export default function ChatPage() {
    const { authFetch, username: myUsername } = useAuth();
    const location = useLocation();
    const { registerMessageListener } = useWebSocket();

    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchPartners();

        if (location.state && location.state.initialPartner) {
            setSelectedPartner(location.state.initialPartner);
        }

        const unregister = registerMessageListener((msg) => {
            if (selectedPartner && (msg.senderUsername === selectedPartner || (msg.receiverUsername === selectedPartner && msg.senderUsername === myUsername))) {
                setMessages(prev => {
                    if (prev.some(m => m.id === msg.id)) return prev;
                    return [...prev, msg];
                });
                scrollToBottom();
                return true; 
            } else {
                fetchPartners();
                return false; 
            }
        });

        return () => unregister();
    }, [selectedPartner, myUsername]);

    useEffect(() => {
        if (selectedPartner) {
            fetchHistory(selectedPartner);
        }
    }, [selectedPartner]);

    const fetchPartners = async () => {
        try {
            const res = await authFetch('http://localhost:8000/api/chat/partners');
            if (res.ok) {
                const data = await res.json();
                setPartners(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchHistory = async (partner) => {
        try {
            const res = await authFetch(`http://localhost:8000/api/chat/history/${partner}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
                scrollToBottom();
            }
        } catch (err) {
            console.error(err);
        }
    };



    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedPartner) return;

        try {
            const res = await authFetch('http://localhost:8000/api/chat/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    receiverUsername: selectedPartner,
                    content: newMessage
                })
            });

            if (res.ok) {
                const sentMsg = await res.json();
                setMessages(prev => {
                    if (prev.some(m => m.id === sentMsg.id)) return prev;
                    return [...prev, sentMsg];
                });
                setNewMessage("");
                scrollToBottom();
                fetchPartners();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const filteredPartners = partners.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="h-[calc(100vh-64px)] pt-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex justify-center p-4 sm:p-6 lg:p-8">
            <div className="flex w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">

                <div className={`w-full md:w-80 flex flex-col border-r border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 ${selectedPartner ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 md:p-6 pb-2">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Messages</h2>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-400"
                                placeholder="Search conversations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">
                        {filteredPartners.length > 0 ? (
                            filteredPartners.map(partner => (
                                <button
                                    key={partner}
                                    onClick={() => setSelectedPartner(partner)}
                                    className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${selectedPartner === partner
                                        ? 'bg-blue-600 shadow-md transform scale-[1.02]'
                                        : 'hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-inner flex-shrink-0 ${selectedPartner === partner
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-600 dark:text-blue-300'
                                        }`}>
                                        {partner.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-4 text-left overflow-hidden">
                                        <h3 className={`font-semibold truncate ${selectedPartner === partner ? 'text-white' : 'text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                            }`}>
                                            {partner}
                                        </h3>
                                        <p className={`text-sm truncate ${selectedPartner === partner ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                            }`}>
                                            Click to view chat
                                        </p>
                                    </div>
                                    {selectedPartner === partner && (
                                        <div className="ml-auto">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        </div>
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                <p className="text-gray-400 dark:text-gray-500 text-sm">No conversations found.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`flex-1 flex-col bg-white dark:bg-gray-800 relative z-0 ${!selectedPartner ? 'hidden md:flex' : 'flex'}`}>
                    {selectedPartner ? (
                        <>
                            <div className="p-4 md:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 flex items-center justify-between sticky top-0 z-10">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setSelectedPartner(null)}
                                        className="md:hidden mr-4 p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                                        {selectedPartner.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{selectedPartner}</h3>
                                        <span className="text-xs text-green-500 flex items-center font-medium">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                            Online
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                                {messages.map((msg, index) => {
                                    const isMe = msg.senderUsername === myUsername;
                                    const showAvatar = !isMe && (index === 0 || messages[index - 1].senderUsername !== msg.senderUsername);

                                    return (
                                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}>
                                            {!isMe && (
                                                <div className={`w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 mr-2 flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                                                    {msg.senderUsername.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div
                                                className={`max-w-[75%] md:max-w-[60%] px-5 py-3 shadow-sm transition-all duration-200 ${isMe
                                                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-sm'
                                                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm'
                                                    }`}
                                            >
                                                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                                <div className={`text-[10px] mt-1 flex items-center ${isMe ? 'text-blue-100 justify-end' : 'text-gray-400'}`}>
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    {isMe && (
                                                        <span className="ml-1">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all dark:text-white"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="p-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30 dark:bg-gray-900/30">
                            <div className="w-24 h-24 bg-blue-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 8 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your Messages</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                                Select a conversation from the left to start chatting or visit a car listing to contact a seller.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
