'use client';

import React, { useState } from 'react';
import { 
    Settings as SettingsIcon, 
    Store, 
    Bell, 
    Shield, 
    User, 
    Save, 
    Clock, 
    Flame, 
    CheckCircle2,
    Lock,
    Volume2
} from 'lucide-react';

export default function Settings() {
    // Settings State
    const [isStoreOpen, setIsStoreOpen] = useState(true);
    const [autoAcceptOrders, setAutoAcceptOrders] = useState(true);
    const [soundNotifications, setSoundNotifications] = useState(true);
    const [maxSimultaneousOrders, setMaxSimultaneousOrders] = useState(15);
    const [estimatedPrepTime, setEstimatedPrepTime] = useState(25);
    
    // Admin Details
    const [adminName, setAdminName] = useState('Store Manager');
    const [adminEmail, setAdminEmail] = useState('admin@pizzapalace.com');

    // UI Status Feedback
    const [savedSuccess, setSavedSuccess] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
        // Here you would send a PUT/POST request to your Express backend or update Firebase config
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 text-slate-100 pb-12">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <SettingsIcon className="text-orange-500" size={22} /> Dashboard Settings
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Configure kitchen availability, operational limits, and store preferences.
                    </p>
                </div>

                {savedSuccess && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-xs font-semibold animate-fade-in">
                        <CheckCircle2 size={14} /> Settings Saved!
                    </div>
                )}
            </div>

            <form onSubmit={handleSave} className="space-y-6">

                {/* SECTION 1: Kitchen & Store Operation Controls */}
                <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800/60 pb-3">
                        <Store size={18} className="text-orange-400" />
                        <span>Kitchen & Operations</span>
                    </div>

                    <div className="space-y-4">
                        {/* Store Status Toggle */}
                        <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                            <div>
                                <p className="text-sm font-semibold text-white">Store Status (Taking Orders)</p>
                                <p className="text-xs text-slate-400 mt-0.5">Turn off to temporarily block online order placements</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsStoreOpen(!isStoreOpen)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    isStoreOpen 
                                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80' 
                                        : 'bg-rose-950/60 text-rose-400 border-rose-800/80'
                                }`}
                            >
                                {isStoreOpen ? 'KITCHEN OPEN' : 'KITCHEN CLOSED'}
                            </button>
                        </div>

                        {/* Prep Time & Order Limits */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5 items-center gap-1.5">
                                    <Clock size={14} className="text-slate-400" /> Estimated Prep Time (Mins)
                                </label>
                                <input
                                    type="number"
                                    value={estimatedPrepTime}
                                    onChange={(e) => setEstimatedPrepTime(Number(e.target.value))}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5 items-center gap-1.5">
                                    <Flame size={14} className="text-slate-400" /> Max Live Active Orders
                                </label>
                                <input
                                    type="number"
                                    value={maxSimultaneousOrders}
                                    onChange={(e) => setMaxSimultaneousOrders(Number(e.target.value))}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: Notification & Sound Preferences */}
                <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800/60 pb-3">
                        <Bell size={18} className="text-blue-400" />
                        <span>Live Notifications & Alerts</span>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <Volume2 size={16} className="text-slate-400" />
                                <div>
                                    <p className="text-xs font-semibold text-slate-200">Audio Chime for New Orders</p>
                                    <p className="text-[11px] text-slate-500">Play an alert sound when a new order arrives on the dashboard</p>
                                </div>
                            </div>
                            <input 
                                type="checkbox"
                                checked={soundNotifications}
                                onChange={(e) => setSoundNotifications(e.target.checked)}
                                className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <Store size={16} className="text-slate-400" />
                                <div>
                                    <p className="text-xs font-semibold text-slate-200">Auto-Accept Incoming Orders</p>
                                    <p className="text-[11px] text-slate-500">Automatically set incoming paid orders to 'Preparing'</p>
                                </div>
                            </div>
                            <input 
                                type="checkbox"
                                checked={autoAcceptOrders}
                                onChange={(e) => setAutoAcceptOrders(e.target.checked)}
                                className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                            />
                        </label>
                    </div>
                </div>

                {/* SECTION 3: Admin Profile & Security */}
                <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800/60 pb-3">
                        <User size={18} className="text-amber-400" />
                        <span>Admin Account & Access</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Display Name</label>
                            <input
                                type="text"
                                value={adminName}
                                onChange={(e) => setAdminName(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Email</label>
                            <input
                                type="email"
                                value={adminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={() => alert('Password reset email dispatched via Firebase Auth.')}
                            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                        >
                            <Lock size={14} /> Send Password Reset Email
                        </button>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-950/40 flex items-center gap-2"
                    >
                        <Save size={16} />
                        Save Dashboard Changes
                    </button>
                </div>

            </form>
        </div>
    );
}