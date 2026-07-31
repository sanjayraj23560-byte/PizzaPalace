'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Orders from '../order/page';
import { Fa42Group, FaArrowDownWideShort, FaAccessibleIcon, FaArrowDown } from 'react-icons/fa6';
import { Key, Loader2, LoaderCircleIcon, Scan } from 'lucide-react';

function AdminPanel() {
    const [orders, setOrder] = useState<any[]>([])
    const [drop, setDrop] = useState<String | null>(null);
    const [loading, setLoading] = useState(false)
    const showItem = (id: string) => {
        if (drop === id) {
            setDrop(null);
            // close it
        } else {
            setDrop(id);        // open it
        }
    };

    const UpdateAs_Deliverd = async (orderID: any, idx: any) => {
        await axios.put('http://localhost:4000/api/admin/putdone', {
            itemId: orderID,
            operation: "Update as deleverd"
        })
    }
    const UpdateAs_Preparing = async (orderID: any, idx: any) => {
        await axios.put('http://localhost:4000/api/admin/putprep', {
            itemId: orderID,
            operation: "Update as preparing"
        })
    }
    const UpdateAs_OnTheWasy = async (orderID: any, idx: any) => {
        await axios.put('http://localhost:4000/api/admin/puton', {
            itemId: orderID,
            operation: "Update as on they way"
        })

    }
    const UpdateAs_Canceld = async (orderID: any, idx: any) => {
        await axios.put('http://localhost:4000/api/admin/putcancel', {
            itemId: orderID,
            operation: "Update as canceld"
        })

    }



    useEffect(() => {
        const res = async () => {
            try {
                await axios.post(`http://localhost:4000/api/order/admin-orders`)
                    .then((res) => {
                        console.log(res.data)
                        setOrder(res.data)
                    })
                setLoading(true)
            } catch (error) {
                console.log(error)
            }
        }
        res()
    }, [])

    return (
        <div>
            {
                loading ? (
                    <div className="grid gap-5 m-10">
                        {orders.map((order, idx) => (
                            <div key={order._id}>
                                <p>Total orders :{order.cart.length}</p>
                                {
                                    order.cart.length === 0 ?<>Qww</>:<></>
                                }
                                <div
                                    key={order._id}
                                    className="bg-black rounded-xl p-5 border border-blue-800">
                                    <div className='flex justify-between'>
                                        <div>

                                            <p className='text-[10px] text-green-700'>Order ID :{order._id}</p>
                                            <h3 className='flex'>Order No:<p className='text-amber-700'>{idx + 1}</p> </h3>
                                        </div>
                                        <h1>{
                                            order.time}</h1>
                                        <div>
                                            <button onClick={() => showItem(order._id)}> <FaArrowDownWideShort size={15} className={`transition-transform duration-200 ${drop === order._id ? 'rotate-180 text-orange-500' : ''}`} /></button>
                                        </div>
                                    </div>

                                    {
                                        drop === order._id && (
                                            order.cart.map((item: any, idx: Number) => (
                                                <div key={item._id}>
                                                    <div
                                                        key={item._id}
                                                        className="flex justify-between items-center border-b border-slate-800 py-4 transition-transform duration-200"
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
                                                    <div className='flex justify-between items-center gap-2 my-3' >
                                                        <button onClick={() => UpdateAs_Deliverd(item._id, idx)} className='bg-amber-700 rounded-2xl p-2'>Deliverd</button>
                                                        <button onClick={() => UpdateAs_Preparing(item._id, idx)} className='bg-green-600 rounded-2xl p-2'>Preparing</button>
                                                        <button onClick={() => UpdateAs_OnTheWasy(item._id, idx)} className='bg-yellow-500 rounded-2xl p-2'>On the way</button>
                                                        <button onClick={() => UpdateAs_Canceld(item._id, idx)} className='bg-red-700 rounded-2xl p-2'>Cancel Order</button>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <div className='justify-center items-center flex'>
                    <LoaderCircleIcon className='animate-spin' size={30} />
                </div>
            }
        </div>
    )
}
export default AdminPanel