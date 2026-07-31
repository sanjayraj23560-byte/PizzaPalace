'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaBoxOpen, FaPizzaSlice } from 'react-icons/fa6';
import { Loader2 } from 'lucide-react';

interface CartItem {
    _id: string;
    productId: string;
    name: string;
    desc: string;
    price: number;
    quantity: number;
    img: string;
    status?: string;
}

interface Order {
    _id: string;
    cart: CartItem[];
    time: string;
    status?: string;
    userID: string;
}

export default function AdminPanel() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [openOrderId, setOpenOrderId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Toggle dropdown for order details
    const toggleOrder = (id: string) => {
        setOpenOrderId(prev => (prev === id ? null : id));
    };

    // Unified API Status Update Handler with Optimistic UI Update
    const updateItemStatus = async (itemId: string, endpoint: string, statusLabel: string) => {
        try {
            // Optimistic UI Update
            setOrders(prevOrders =>
                prevOrders.map(order => ({
                    ...order,
                    cart: order.cart.map(item =>
                        item._id === itemId ? { ...item, status: statusLabel } : item
                    )
                }))
            );

            await axios.put(`http://localhost:4000/api/admin/${endpoint}`, {
                itemId,
                operation: `Update as ${statusLabel.toLowerCase()}`
            });
        } catch (error) {
            console.error(`Failed to update item status to ${statusLabel}:`, error);
            // Optionally refetch or notify user if update fails
        }
    };

    // Fetch Admin Orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.post('http://localhost:4000/api/order/admin-orders');
                setOrders(res.data);
            } catch (error) {
                console.error('Error fetching admin orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Helper for status badge styling
    const getStatusBadge = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-emerald-950/80 text-emerald-400 border-emerald-800';
            case 'preparing':
                return 'bg-amber-950/80 text-amber-400 border-amber-800';
            case 'on the way':
                return 'bg-blue-950/80 text-blue-400 border-blue-800';
            case 'canceled (out of stock)':
            case 'canceled':
                return 'bg-rose-950/80 text-rose-400 border-rose-800';
            default:
                return 'bg-slate-800 text-slate-300 border-slate-700';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center gap-3 text-slate-400">
                <Loader2 className="animate-spin text-orange-500" size={36} />
                <p className="text-sm tracking-wide">Loading Admin Panel...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
            <header className="max-w-5xl mx-auto mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <FaPizzaSlice/> Pizza Palace <span className="text-orange-500 font-mono text-sm px-2 py-0.5 rounded bg-orange-950/50 border border-orange-900/50">Admin</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Manage kitchen dispatch and live order fulfillment</p>
                </div>
                <div className="text-right">
                    <span className="text-xs text-slate-500 block">Total Active Orders</span>
                    <span className="text-lg font-semibold text-orange-400">{orders.length}</span>
                </div>
            </header>

            <main className="max-w-5xl mx-auto space-y-4">
                {orders.length === 0 ? (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
                        <FaBoxOpen size={40} className="mx-auto mb-3 opacity-50" />
                        <p>No orders placed yet.</p>
                    </div>
                ) : (
                    orders.map((order, idx) => {
                        const isOpen = openOrderId === order._id;

                        return (
                            <div
                                key={order._id}
                                className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl transition-all duration-200"
                            >
                                {/* Order Summary Header Bar */}
                                <div
                                    onClick={() => toggleOrder(order._id)}
                                    className="p-5 flex flex-wrap justify-between items-center gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-slate-800 text-orange-400 font-mono text-sm font-bold w-10 h-10 rounded-xl flex items-center justify-center border border-slate-700">
                                            #{idx + 1}
                                        </div>
                                        <div>
                                            <p className="text-xs font-mono text-slate-400">
                                                ID: <span className="text-slate-300">{order._id}</span>
                                            </p>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {order.cart.length} {order.cart.length === 1 ? 'item' : 'items'} in cart
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                                            {order.time || 'Recent'}
                                        </span>
                                        <button
                                            type="button"
                                            className="p-2 text-slate-400 hover:text-orange-400 transition-colors"
                                        >
                                            <FaChevronDown
                                                size={16}
                                                className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : ''}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Order Items Dropdown Container */}
                                {isOpen && (
                                    <div className="border-t border-slate-800/80 bg-slate-950/60 p-5 space-y-6">
                                        {order.cart.map((item) => (
                                            <div
                                                key={item._id}
                                                className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                                            >
                                                {/* Product Details */}
                                                <div className="flex gap-4 items-center">
                                                    <img
                                                        src={item.img}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded-lg border border-slate-800 bg-slate-950"
                                                    />
                                                    <div>
                                                        <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                                                        <p className="text-xs text-slate-400 line-clamp-1 max-w-sm my-0.5">{item.desc}</p>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-xs font-mono text-orange-400">₹{item.price}</span>
                                                            <span className="text-xs text-slate-500">Qty: {item.quantity || 1}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Per-Item Status & Action Controls */}
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto justify-end border-t border-slate-800 md:border-none pt-3 md:pt-0">
                                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusBadge(item.status)}`}>
                                                        {item.status || 'waiting'}
                                                    </span>

                                                    <div className="flex flex-wrap items-center gap-1.5">
                                                        <button
                                                            onClick={() => updateItemStatus(item._id, 'putprep', 'Preparing')}
                                                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-amber-950/40 text-amber-300 border border-amber-800/60 hover:bg-amber-900/60 transition-all"
                                                        >
                                                            Prep
                                                        </button>
                                                        <button
                                                            onClick={() => updateItemStatus(item._id, 'puton', 'On the way')}
                                                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-950/40 text-blue-300 border border-blue-800/60 hover:bg-blue-900/60 transition-all"
                                                        >
                                                            On Way
                                                        </button>
                                                        <button
                                                            onClick={() => updateItemStatus(item._id, 'putdone', 'Delivered')}
                                                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60 transition-all"
                                                        >
                                                            Delivered
                                                        </button>
                                                        <button
                                                            onClick={() => updateItemStatus(item._id, 'putcancel', 'Canceled (Out of stock)')}
                                                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-800/60 hover:bg-rose-900/60 transition-all"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </main>
        </div>
    );
}