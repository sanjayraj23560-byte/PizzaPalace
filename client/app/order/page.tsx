'use client';
import { useEffect, useState, useContext } from 'react';
import { auth } from '@/components/firebase';
import React from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import axios from 'axios';
import { FaBagShopping, FaPizzaSlice, FaBowlFood, FaHandDots } from 'react-icons/fa6';
import { FaArrowDownWideShort } from 'react-icons/fa6';
import { LeafyGreenIcon, DotIcon } from 'lucide-react';
import { LoaderPinwheelIcon } from 'lucide-react';
import { CartContext } from '../../context/cartContext';

export default function Orders() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [drop, setDrop] = useState<String | null>(null);
    const [orderStatus, setOrderStatus] = useState<any[]>([])
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

    const showItem = (id: string) => {
        if (drop === id) {
            setDrop(null);      // close it
        } else {
            setDrop(id);        // open it
        }
    };

    // 2. Fetch Orders when `user` is confirmed
    useEffect(() => {
        if (!user) return; // Wait until Firebase resolves user

        const getOrders = async () => {
            setLoading(true);
            try {
                const res = await axios.post('http://localhost:4000/api/order/showOrders', {
                    user: user.uid,
                });
                console.log(res.data)
                setOrders([...res.data.fetchOrders])
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
                <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-500 to-amber-500 flex items-center gap-3">
                    <FaBagShopping className="w-8 h-8 text-orange-500" />
                    Your Orders

                </h2>
                <LoaderPinwheelIcon className='text-violet-500 animate-spin' />
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
                    <div className="grid gap-4 ">
                        {orders.map((order, idx) => (
                            <div
                                key={order._id}
                                className="bg-slate-900 rounded-xl p-5 border border-slate-700">

                                <div className='flex justify-between'>
                                    <div>
                                        <p className='text-[10px] text-green-700'>Order ID :{order._id}</p>
                                        <h3 className='flex'>Order ID : <p className='text-amber-700'>{idx + 1}</p> </h3>
                                    </div>
                                    <div>
                                        <h1 className='text-[10px] animate-pulse text-green-300'>{ 
                                            order.status
                                        }</h1>
                                    </div>
                                    <h1>{
                                        order.time}</h1>
                                    <div>
                                        <button onClick={() => showItem(order._id)}><FaArrowDownWideShort /></button>
                                    </div>
                                </div>

                                {
                                    drop === order._id && (
                                        order.cart.map((item: any) => (
                                            <div
                                                key={item._id}
                                                className="flex justify-between items-center border-b border-slate-800 py-4"
                                            >
                                                <div className="flex gap-4">
                                                    <img
                                                        src={item.img}
                                                        className="w-20 h-20 rounded-lg"
                                                    />

                                                    <div>
                                                        <h3>{item.name}</h3>
                                                        <p>{item.desc}</p>
                                                        <p>₹{item.price}</p>
                                                    </div>
                                                </div>

                                                <div className="text-orange-500">
                                                    {item.status}
                                                </div>
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}