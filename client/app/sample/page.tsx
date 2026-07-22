'use client'
import React, { useState } from 'react'
import { Pen } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

// 💡 FIX 1: Capitalized component name for strict React/Next.js compliance
function Page() {
    const [formatData, setFormatData] = useState({
        username: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name)
        setFormatData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 💡 FIX 2: Restructured into a clean try/catch block for async operations
    const addData = async (e: React.FormEvent) => {
        e.preventDefault(); // 💡 FIX 3: Placed at the very top to immediately halt native form refreshes

        if (!formatData.username || !formatData.password) {
            toast.error("Fields cannot be empty!");
            console.log("Fields are empty...!");
            return; // Stop execution if validation fails
        }

        try {
            setLoading(true);
            // Fire the network payload string cleanly
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/ret`, formatData);

            console.log("Response data:", res.data);
            toast.success("Data added successfully! 🎉");

            // Optional: Reset form fields on success
            setFormatData({ username: "", password: "" });
        } catch (err: any) {
            console.error("API error exception:", err);
            toast.error(err.response?.data?.message || "Failed to add data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto space-y-4">
            <h1>Hello</h1>
            <Pen size={20} />

            <form onSubmit={addData} className="flex flex-col gap-3">
                <input
                    className="border-2 border-amber-200 p-2 rounded"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={formatData.username}
                    onChange={handlechange}
                />

                <input
                    className="border-2 border-amber-200 p-2 rounded"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formatData.password}
                    onChange={handlechange}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-amber-400 disabled:opacity-50 hover:bg-amber-500 text-black py-2 rounded font-medium transition"
                >
                    {loading ? "Checking..." : "Check"}
                </button>
            </form>
        </div>
    )
}

export default Page;