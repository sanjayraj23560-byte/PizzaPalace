'use client';
import { useEffect } from 'react'
import { auth } from '@/components/firebase'
import React, { useContext, useState } from "react";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth'
import axios from 'axios';
import { FaBagShopping, FaBoxesPacking, FaPizzaSlice, FaBowlFood } from 'react-icons/fa6';
import { PackageX, Loader2, ShoppingBag } from 'lucide-react'; // Optional icons (npm i lucide-react)

import { CartContext } from "../../context/cartContext";

function Orders() {
    const navi = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [orders, setOrdres] = useState([])
    const [noOrders, setNoOrders] = useState(false)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Stop loading once Firebase resolves the user status
        });

        return () => unsubscribe(); // Properly clean up the event listener on unmount
    }, []);

    setTimeout(() => {
        console.log("Outer order ..! ", orders)
    }, 2000)

    const [loading, setLoading] = useState(true)
    const { cart, addToCart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
    useEffect(() => {
        const GetOrder = async () => {
            await axios.post(`http://localhost:4000/api/order/showOrders`, {
                user: user?.uid
            })
                .then((res) => {
                    console.log(res)
                    console.log("This ->", res.data.fetchOrders.cart)
                    if (res.status === 201) {
                        setNoOrders(true)

                    }
                    else {
                        setNoOrders(false)
                        // setOrdres(res.data.fetchOrders.cart)
                        console.log("--->>", orders)
                    }
                })
                .catch((err) => console.log(err))
        }
        GetOrder()
    }, [user])
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 selection:bg-orange-500 selection:text-white">
            {/* Header Container */}
            <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 flex items-center gap-3">
                    <FaBagShopping size={1} className="w-8 h-8 text-orange-500" />
                    Your Orders
                </h1>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
                {/* 1. LOADING STATE - PURE 60 FPS CSS */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">

                        {/* Pure CSS Hardware-Accelerated Spinner */}
                        <div className="" />
                        <FaBowlFood size={30} className='animate-ping text-amber-600' />
                        <p className="mt-4 text-sm font-semibold tracking-wide text-slate-400">
                            Fetching your delicious orders...
                        </p>
                    </div>
                )}

                {/* 2. NO ORDERS STATE */}
                {!loading && noOrders && (
                    <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl text-center">

                        {/* Dark Blue + Fiery Orange Icon Badge */}
                        <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-orange-500/30 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(234,88,12,0.15)]">
                            <FaPizzaSlice className="w-10 h-10 animate-bounce text-orange-500" />
                        </div>

                        <h2 className="text-xl font-bold text-slate-100 mb-2">
                            No Orders Found
                        </h2>
                        <p className="text-slate-400 max-w-sm text-sm mb-6">
                            Looks like you haven't placed any orders yet. Ready to satisfy your cravings?
                        </p>

                        <button
                            onClick={() => navi.push('/')}
                            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-orange-600/20 active:scale-95">
                            Browse Menu
                        </button>
                    </div>
                )}

                {/* 3. ORDERS LIST STATE */}
                {noOrders && (
                    <div className="grid gap-4">
                        {orders.map((order: any, idx: number) => (
                            <div
                                key={order._id || idx}
                                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/40 transition-colors duration-200"
                            >
                                <h1 className='text-8xl'>Ordres to arrive !</h1>
                                <h1>{order}</h1>
                                <h1>{order.name}</h1>
                                <img src={order.img} alt="" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


export default Orders