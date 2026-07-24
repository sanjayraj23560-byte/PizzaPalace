'use client';
import { useEffect } from 'react'
import { auth } from '@/components/firebase'
import React, { useContext, useState } from "react";
import { onAuthStateChanged, User } from 'firebase/auth'
import axios from 'axios';
import { CartContext } from "../../context/cartContext";

function Orders() {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Stop loading once Firebase resolves the user status
        });

        return () => unsubscribe(); // Properly clean up the event listener on unmount
    }, []);

    const [loading, setLoading] = useState(true)
    const { cart, addToCart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
    useEffect(() => {
        const GetOrder = async () => {
            await axios.post(`http://localhost:4000/api/order/showOrders`, {
                user: user?.displayName
            })
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }
        GetOrder()
    }, [user])
    return (
        <>
            <div>Orders</div>
            {
                loading &&
                <div>
                    hello
                </div>
            }
        </>
    )
}

export default Orders