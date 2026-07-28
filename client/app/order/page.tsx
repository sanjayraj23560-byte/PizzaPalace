'use client';
import { useEffect, useState, useContext } from 'react';
import { auth } from '@/components/firebase';
import React from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import axios from 'axios';
import { FaBagShopping, FaPizzaSlice, FaBowlFood } from 'react-icons/fa6';
import { CartContext } from '../../context/cartContext';

export default function Orders() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [noOrders, setNoOrders] = useState(false);
    const [loading, setLoading] = useState(true);

    // 1. Handle Auth & Redirects
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                // User is not logged in -> redirect to login page
                router.push('/signup');
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, [router]);

    // 2. Fetch Orders when `user` is confirmed
    useEffect(() => {
        if (!user) return; // Wait until Firebase resolves user

        const getOrders = async () => {
            setLoading(true);
            try {
                const res = await axios.post('http://localhost:4000/api/order/showOrders', {
                    user: user.uid,
                });

                // Adjust properties depending on your API payload structure
                if (res.data.orders && res.data.orders.length > 0) {
                    setOrders(res.data.orders);
                    setNoOrders(false);
                } else {
                    setOrders([]);
                    setNoOrders(true);
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
                setNoOrders(true);
            } finally {
                setLoading(false);
            }
        };

        getOrders();
    }, [user]);

    // 3. Render Loading Screen while Firebase checks auth state
    if (loading && !user) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100">
                <FaBowlFood size={36} className="animate-bounce text-orange-500 mb-4" />
                <p className="text-sm font-semibold tracking-wide text-slate-400">
                    Verifying account...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950  items-center justify-center mt-10 text-slate-100 p-4 md:p-8 selection:bg-orange-500 selection:text-white">
            {/* Header */}
            <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-500 to-amber-500 flex items-center gap-3">
                    <FaBagShopping className="w-8 h-8 text-orange-500" />
                    Your Orders
                </h1>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
                {/* LOADING STATE */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                        <FaBowlFood size={32} className="animate-pulse text-orange-500" />
                        <p className="mt-4 text-sm font-semibold tracking-wide text-slate-400">
                            Fetching your delicious orders...
                        </p>
                    </div>
                )}

                {/* NO ORDERS STATE */}
                {!loading && noOrders && (
                    <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl text-center">
                        <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-orange-500/30 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(234,88,12,0.15)]">
                            <FaPizzaSlice className="w-10 h-10 animate-bounce text-orange-500" />
                        </div>

                        <h2 className="text-xl font-bold text-slate-100 mb-2">No Orders Found</h2>
                        <p className="text-slate-400 max-w-sm text-sm mb-6">
                            Looks like you haven't placed any orders yet. Ready to satisfy your cravings?
                        </p>

                        <button
                            onClick={() => router.push('/')}
                            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-orange-600/20 active:scale-95"
                        >
                            Browse Menu
                        </button>
                    </div>
                )}

                {/* ORDERS LIST STATE */}
                {!loading && !noOrders && orders.length > 0 && (
                    <div className="grid gap-4">
                        {orders.map((order: any, idx: number) => (
                            <div
                                key={order._id || idx}
                                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/40 transition-colors duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    {order.img && (
                                        <img
                                            src={order.img}
                                            alt={order.name || 'Order Item'}
                                            className="w-16 h-16 object-cover rounded-xl border border-slate-800"
                                        />
                                    )}
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-100">
                                            {order.name || `Order #${idx + 1}`}
                                        </h3>
                                        <p className="text-slate-400 text-sm">{order.desc || ''}</p>
                                        {order.price && (
                                            <p className="text-orange-500 font-semibold mt-1">₹{order.price}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}