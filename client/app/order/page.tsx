'use client';
import React, { useEffect, useState } from 'react'
import { auth } from '@/components/firebase'
import { onAuthStateChanged } from 'firebase/auth'
function Orders() {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const orders = () => {
            setLoading(false)
        }
    }, [])
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