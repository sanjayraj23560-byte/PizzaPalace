'use client';
import { useEffect } from 'react'
import { auth } from '@/components/firebase'
import React, { useContext, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import axios from 'axios';
import { CartContext } from "../../context/cartContext";
import { Concert_One } from 'next/font/google';
function Orders() {

    const [loading, setLoading] = useState(true)
    const { cart, addToCart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
    const user = auth
    useEffect(() => {
        const GetOrder = async () => {
            await axios.post(`http://localhost:4000/api/order/showOrders`, {
                user: user.currentUser?.uid,
                message: "No No NOOOO! MOKMOON"
            })
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }
        GetOrder()
    }, [onAuthStateChanged, user])
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