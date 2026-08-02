'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User2, Loader2, Sparkles, Lock } from 'lucide-react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/components/firebase';

export default function ChatBox() {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 1. Listen for Firebase Auth State Changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Auto-scroll to bottom of chat smoothly
    useEffect(() => {

    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('${process.env.NEXT_PUBLIC_API_URL}/api/chatbot', {
                messages: updatedMessages,
            });
            setMessages([...updatedMessages, { role: 'assistant', content: res.data.reply }]);
        } catch (err) {
            console.error('Chat error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="flex justify-center items-center w-full min-h-screen bg-slate-950">
                <Loader2 className="animate-spin text-violet-500 w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen p-4 bg-slate-950">
            {/* Main Liquid Glass Container (Fixed size h-[550px] prevents jumping) */}
            <div className="relative w-full max-w-md bg-violet-950/30 border border-violet-500/30 rounded-3xl shadow-[0_8px_32px_0_rgba(124,58,237,0.2)] backdrop-blur-2xl flex flex-col h-137.5 overflow-hidden">

                {/* Ambient Top Light Reflection */}
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header */}
                <div className="px-5 py-4 bg-violet-950/40 border-b border-violet-500/20 backdrop-blur-md flex items-center justify-between shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300 shadow-inner">
                            {user ? <Bot size={22} /> : <Lock size={20} className="text-violet-400" />}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-violet-100 flex items-center gap-1.5">
                                Pizza Palace AI <Sparkles size={14} className="text-violet-400" />
                            </h3>
                            <p className="text-xs text-violet-300/70">
                                {user ? 'Always active to assist you' : 'Access Restricted'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body Area */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4 z-10 scrollbar-thin scrollbar-thumb-violet-900/50">
                    {!user ? (
                        /* LOGGED OUT STATE */
                        <div className="h-full flex flex-col items-center justify-center text-violet-300/60 text-center p-6">
                            <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-3 shadow-lg">
                                <Lock size={28} />
                            </div>
                            <p className="text-sm leading-relaxed max-w-60 font-medium text-violet-200">
                                Please log in before interacting with our Agentic AI
                            </p>
                        </div>
                    ) : messages.length === 0 ? (
                        /* EMPTY CHAT STATE */
                        <div className="h-full flex flex-col items-center justify-center text-violet-300/60 text-center p-6">
                            <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-3 shadow-lg">
                                <Bot size={32} className="stroke-[1.5]" />
                            </div>
                            <p className="text-sm leading-relaxed max-w-60">
                                Ask me anything about our menu, pizza deals, or order tracking!
                            </p>
                        </div>
                    ) : (
                        /* CHAT MESSAGES */
                        messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs shadow-md ${m.role === 'user'
                                            ? 'bg-violet-600 text-white border border-violet-400/40'
                                            : 'bg-violet-900/60 text-violet-200 border border-violet-500/30'
                                        }`}
                                >
                                    {m.role === 'user' ? <User2 size={14} /> : <Bot size={14} />}
                                </div>
                                <div
                                    className={`p-3.5 rounded-2xl max-w-[80%] text-sm leading-relaxed ${m.role === 'user'
                                            ? 'bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-tr-none shadow-md border border-violet-400/30'
                                            : 'bg-violet-900/40 text-violet-100 rounded-tl-none border border-violet-500/30 backdrop-blur-md'
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))
                    )}

                    {loading && (
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-violet-900/60 border border-violet-500/30 flex items-center justify-center text-violet-300">
                                <Bot size={14} />
                            </div>
                            <div className="bg-violet-900/40 border border-violet-500/30 text-violet-300 px-4 py-2.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-2 backdrop-blur-md">
                                <Loader2 size={14} className="animate-spin text-violet-400" />
                                <span>Thinking...</span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Bar (Only visible when logged in) */}
                {user && (
                    <div className="p-3 bg-violet-950/50 border-t border-violet-500/20 backdrop-blur-md z-10 shrink-0">
                        <div className="flex gap-2 items-center bg-violet-950/80 border border-violet-500/30 rounded-xl p-1.5 focus-within:border-violet-400 transition-all">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                placeholder="Ask Pizza Palace..."
                                className="flex-1 bg-transparent px-3 py-1 text-sm text-violet-100 focus:outline-none placeholder:text-violet-300/40"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="bg-violet-600 hover:bg-violet-500 disabled:opacity-30 text-white p-2 rounded-lg transition-all shrink-0 active:scale-95 cursor-pointer"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}