'use client';

import React, { useState } from 'react';
import {
    Users,
    Search,
    ShieldCheck,
    UserX,
    Trash2,
    Mail,
    Phone,
    Calendar,
    ChevronDown,
    UserPlus,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

// Mock initial users data (Replace with useEffect API fetch from ${process.env.NEXT_PUBLIC_API_URL}/api/users)
const INITIAL_USERS = [
    {
        id: 'usr_1',
        name: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        phone: '+1 555-0192',
        role: 'Admin',
        status: 'Active',
        ordersCount: 42,
        createdAt: '2025-01-15',
    },
    {
        id: 'usr_2',
        name: 'Sarah Chen',
        email: 'sarah.c@example.com',
        phone: '+1 555-0143',
        role: 'Kitchen Staff',
        status: 'Active',
        ordersCount: 0,
        createdAt: '2025-02-01',
    },
    {
        id: 'usr_3',
        name: 'Michael Scott',
        email: 'm.scott@dundermifflin.com',
        phone: '+1 555-0188',
        role: 'Customer',
        status: 'Active',
        ordersCount: 18,
        createdAt: '2025-03-10',
    },
    {
        id: 'usr_4',
        name: 'Emma Watson',
        email: 'emma.w@example.com',
        phone: '+1 555-0177',
        role: 'Customer',
        status: 'Suspended',
        ordersCount: 2,
        createdAt: '2025-04-05',
    },
];

export default function UserManagement() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');

    // 1. Filter Users by Search Term & Role
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm);

        const matchesRole = selectedRoleFilter === 'All' || user.role === selectedRoleFilter;

        return matchesSearch && matchesRole;
    });

    // 2. Handle Role Change
    const handleRoleChange = (userId: string, newRole: string) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        // Optional: Send PUT request to Express backend here
        // fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/role`, { method: 'PUT', body: JSON.stringify({ role: newRole }) })
    };

    // 3. Handle Status Toggle (Active vs Suspended)
    const toggleStatus = (userId: string) => {
        setUsers(prev => prev.map(u => {
            if (u.id === userId) {
                const updatedStatus = u.status === 'Active' ? 'Suspended' : 'Active';
                return { ...u, status: updatedStatus };
            }
            return u;
        }));
    };

    // 4. Handle Delete User
    const handleDeleteUser = (userId: string) => {
        if (toast.success('user removed !')) {
            setUsers(prev => prev.filter(u => u.id !== userId));
            // Optional: Send DELETE request to Express backend
        }
    };

    return (
        <div className="space-y-6 text-slate-100">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Users className="text-orange-500" size={22} /> User Management
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Control user permissions, manage staff access, and monitor customer activity.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                        Total Users: <span className="text-orange-400 font-bold">{users.length}</span>
                    </span>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                {/* Search Input */}
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                </div>

                {/* Role Filter Tabs */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    {['All', 'Admin', 'Kitchen Staff', 'Customer'].map((role) => (
                        <button
                            key={role}
                            onClick={() => setSelectedRoleFilter(role)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${selectedRoleFilter === role
                                ? 'bg-orange-950/60 text-orange-400 border border-orange-800/60 shadow-sm'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                                }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono tracking-wider">
                                <th className="p-4">User Details</th>
                                <th className="p-4">Contact Info</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Orders</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        No users matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">

                                        {/* User Name & ID */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/60 flex items-center justify-center font-bold text-orange-400">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-200 text-sm">{user.name}</p>
                                                    <p className="text-[10px] text-slate-500 font-mono">ID: {user.id}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email & Phone */}
                                        <td className="p-4 space-y-1">
                                            <div className="flex items-center gap-1.5 text-slate-300">
                                                <Mail size={12} className="text-slate-500" />
                                                <span>{user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Phone size={12} className="text-slate-500" />
                                                <span>{user.phone}</span>
                                            </div>
                                        </td>

                                        {/* Dynamic Role Dropdown */}
                                        <td className="p-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className={`bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-orange-500 cursor-pointer ${user.role === 'Admin' ? 'text-amber-400' :
                                                    user.role === 'Kitchen Staff' ? 'text-blue-400' : 'text-slate-300'
                                                    }`}
                                            >
                                                <option value="Customer">Customer</option>
                                                <option value="Kitchen Staff">Kitchen Staff</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="p-4">
                                            <button
                                                onClick={() => toggleStatus(user.id)}
                                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all flex items-center gap-1 w-max ${user.status === 'Active'
                                                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60 hover:bg-emerald-900/40'
                                                    : 'bg-rose-950/40 text-rose-400 border-rose-800/60 hover:bg-rose-900/40'
                                                    }`}
                                            >
                                                {user.status === 'Active' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                                {user.status}
                                            </button>
                                        </td>

                                        {/* Order Count */}
                                        <td className="p-4">
                                            <span className="font-mono text-slate-300 font-semibold">{user.ordersCount} orders</span>
                                        </td>

                                        {/* Action Buttons */}
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-900/60 transition-all"
                                                title="Delete User"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}