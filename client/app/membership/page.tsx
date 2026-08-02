'use client';

import React, { useState } from 'react';
import {
    User,
    Crown,
    MapPin,
    CreditCard,
    Clock,
    ShieldCheck,
    Mail,
    Phone,
    Edit3,
    Plus,
    Trash2,
    ChevronRight,
    CheckCircle2,
    Sparkles,
    Lock
} from 'lucide-react';

export default function CustomerProfilePage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payments' | 'orders'>('profile');

    // Customer State
    const [customer, setCustomer] = useState({
        name: 'Marcus Vance',
        email: 'marcus.v@example.com',
        phone: '+1 (555) 234-5678',
        memberTier: 'Gold',
        points: 1850,
        memberSince: 'January 2025'
    });

    // Saved Addresses State
    const [addresses, setAddresses] = useState([
        { id: 'addr_1', type: 'Home', street: '742 Evergreen Terrace', city: 'Springfield', zip: '97477', isDefault: true },
        { id: 'addr_2', type: 'Work', street: '100 Cyberdyne Way, Suite 400', city: 'Springfield', zip: '97478', isDefault: false },
    ]);

    // Saved Payment Methods
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 'pay_1', cardBrand: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
        { id: 'pay_2', cardBrand: 'Mastercard', last4: '8819', expiry: '09/27', isDefault: false },
    ]);

    // Quick Order History Snapshot
    const recentOrders = [
        { id: 'ORD-8921', date: 'Yesterday, 7:15 PM', items: '1x Large Spicy Pepperoni, 1x Garlic Knots', total: '$28.50', status: 'Delivered' },
        { id: 'ORD-8810', date: 'Jul 28, 2026', items: '2x Truffle Mushroom Pizzas, 2x Cokes', total: '$44.00', status: 'Delivered' },
    ];

    const handleDeleteAddress = (id: string) => {
        setAddresses(addresses.filter(a => a.id !== id));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 text-slate-100 p-4 sm:p-6 pb-20">

            {/* PROFILE HEADER / HERO BANNER */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl backdrop-blur-md">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-orange-950/50 border border-orange-400/30">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl sm:text-2xl font-extrabold text-white">{customer.name}</h1>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/60 text-amber-400 border border-amber-800/80 flex items-center gap-1 uppercase tracking-wider">
                                    <Crown size={12} /> {customer.memberTier}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                                <Mail size={12} /> {customer.email} • Member since {customer.memberSince}
                            </p>
                        </div>
                    </div>

                    {/* Quick Loyalty Points Chip */}
                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 px-5 flex items-center gap-3 self-stretch sm:self-auto justify-between">
                        <div>
                            <p className="text-[10px] uppercase font-mono text-slate-400">Loyalty Balance</p>
                            <p className="text-xl font-bold font-mono text-amber-400">{customer.points.toLocaleString()} pts</p>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                            <Sparkles size={18} />
                        </div>
                    </div>
                </div>

                {/* TABS NAVIGATION */}
                <div className="flex items-center gap-2 border-t border-slate-800/80 pt-6 mt-6 overflow-x-auto">
                    {[
                        { id: 'profile', label: 'Account Details', icon: User },
                        { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
                        { id: 'payments', label: 'Payment Methods', icon: CreditCard },
                        { id: 'orders', label: 'Recent Orders', icon: Clock },
                    ].map(tab => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${active
                                        ? 'bg-orange-950/60 text-orange-400 border border-orange-800/80 shadow-md'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                <Icon size={14} /> {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* TAB CONTENT AREAS */}

            {/* TAB 1: Profile Info */}
            {activeTab === 'profile' && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            <User size={16} className="text-orange-400" /> Personal Details
                        </h2>
                        <button className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1">
                            <Edit3 size={12} /> Edit Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                            <p className="text-[11px] text-slate-500 font-semibold uppercase">Full Name</p>
                            <p className="font-semibold text-slate-200">{customer.name}</p>
                        </div>

                        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                            <p className="text-[11px] text-slate-500 font-semibold uppercase">Email Address</p>
                            <p className="font-semibold text-slate-200">{customer.email}</p>
                        </div>

                        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                            <p className="text-[11px] text-slate-500 font-semibold uppercase">Phone Number</p>
                            <p className="font-semibold text-slate-200">{customer.phone}</p>
                        </div>

                        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                            <p className="text-[11px] text-slate-500 font-semibold uppercase">Password & Security</p>
                            <p className="font-semibold text-slate-200 flex items-center gap-1">
                                <Lock size={12} className="text-emerald-400" /> Firebase Secured
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: Addresses */}
            {activeTab === 'addresses' && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            <MapPin size={16} className="text-orange-400" /> Delivery Addresses
                        </h2>
                        <button className="bg-orange-950/60 text-orange-400 border border-orange-800/80 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-orange-900/40 transition-all flex items-center gap-1.5">
                            <Plus size={14} /> Add Address
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {addresses.map((addr) => (
                            <div key={addr.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-start space-y-2 relative">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-white">{addr.type}</span>
                                        {addr.isDefault && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Default</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-300 mt-2">{addr.street}</p>
                                    <p className="text-xs text-slate-500">{addr.city}, {addr.zip}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteAddress(addr.id)}
                                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 3: Payment Methods */}
            {activeTab === 'payments' && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            <CreditCard size={16} className="text-blue-400" /> Saved Cards
                        </h2>
                        <button className="bg-slate-950 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold hover:text-white transition-all flex items-center gap-1.5">
                            <Plus size={14} /> Add Card
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {paymentMethods.map((pay) => (
                            <div key={pay.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-300 font-mono uppercase">
                                        {pay.cardBrand}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white font-mono">•••• •••• •••• {pay.last4}</p>
                                        <p className="text-[10px] text-slate-500">Expires {pay.expiry}</p>
                                    </div>
                                </div>
                                {pay.isDefault && <CheckCircle2 size={16} className="text-emerald-400" />}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 4: Recent Order History */}
            {activeTab === 'orders' && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            <Clock size={16} className="text-amber-400" /> Recent Order History
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {recentOrders.map((ord) => (
                            <div key={ord.id} className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-bold text-white">{ord.id}</span>
                                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">{ord.status}</span>
                                    </div>
                                    <p className="text-xs text-slate-300">{ord.items}</p>
                                    <p className="text-[11px] text-slate-500">{ord.date}</p>
                                </div>

                                <div className="flex items-center gap-4 self-end sm:self-center">
                                    <span className="font-mono font-bold text-white text-sm">{ord.total}</span>
                                    <button className="bg-orange-950/60 text-orange-400 border border-orange-800/80 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-orange-900/40 transition-all">
                                        Reorder
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
} 