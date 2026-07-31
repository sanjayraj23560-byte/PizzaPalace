'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
    ShoppingBag,
    UtensilsCrossed,
    BarChart3,
    Users,
    Settings,
    Pizza,
    LogOut,
    Bell,
    Sparkles
} from 'lucide-react';
import AdminPanel from '../adminPanel/page'; // <-- Your Order Management page component
import { toast } from 'react-toastify';
// import FoodCatalog from '../food/page';   <-- Example: Import your Food page
// import Analytics from '../analytics/page'; <-- Example: Import your Analytics page
// import UserManagement from '../users/page';<-- Example: Import your Users page

export default function Section() {
    // State to track which page is currently selected
    const navi = useRouter()
    const [activeTab, setActiveTab] = useState<'orders' | 'food' | 'analytics' | 'users' | 'settings'>('orders');

    // Sidebar navigation items
    const navItems = [
        { id: 'orders', label: 'Order Management', icon: ShoppingBag, badge: 'Live' },
        { id: 'food', label: 'Food Catalog & Menu', icon: UtensilsCrossed },
        { id: 'analytics', label: 'Analytics & Sales', icon: BarChart3 },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'settings', label: 'Dashboard Settings', icon: Settings },
    ];

    // Helper function to render the active page dynamically
    const renderActivePage = () => {
        switch (activeTab) {
            case 'orders':
                return <AdminPanel />; // Displays your active Orders page

            case 'food':
                // return <FoodCatalog />;
                return <div className="text-slate-400 p-8">Food Catalog Page Component Goes Here</div>;

            case 'analytics':
                // return <Analytics />;
                return <div className="text-slate-400 p-8">Analytics Page Component Goes Here</div>;

            case 'users':
                // return <UserManagement />;
                return <div className="text-slate-400 p-8">User Management Page Component Goes Here</div>;

            case 'settings':
                return <div className="text-slate-400 p-8">Dashboard Settings Page Component Goes Here</div>;

            default:
                return <AdminPanel />;
        }
    };

    return (
        <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">

            {/* 1. SIDEBAR */}
            <aside className="w-64 bg-slate-900/90 border-r border-slate-800/80 flex flex-col justify-between p-4 select-none shrink-0">
                <div>
                    {/* Brand Header */}
                    <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800/60">
                        <div className="bg-linear-to-tr from-orange-600 to-amber-500 p-2.5 rounded-xl shadow-lg shadow-orange-950/50">
                            <Pizza className="text-white" size={22} />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-white tracking-tight">
                                Pizza Palace
                            </h2>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-orange-400 bg-orange-950/60 px-1.5 py-0.5 rounded border border-orange-900/40">
                                Admin Suite
                            </span>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <nav className="space-y-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id as any)} // Navigates to the page
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-orange-950/40 text-orange-400 border border-orange-800/50 shadow-sm'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={18} className={isActive ? 'text-orange-400' : 'text-slate-400'} />
                                        <span>{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 animate-pulse">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="border-t border-slate-800/60 pt-4 space-y-3">
                    <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs border border-orange-500/30">
                            A
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-slate-200 truncate">Store Manager</p>
                            <p className="text-[10px] text-slate-500 truncate">admin@pizzapalace.com</p>
                        </div>
                    </div>

                    <button
                        onClick={() => (toast.success("Signed Out"), navi.push('/'))}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/30 border border-transparent transition-all"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* 2. MAIN CONTENT DISPLAY AREA */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">

                {/* Header Bar */}
                <header className="h-16 border-b border-slate-800/80 bg-slate-900/40 px-8 flex items-center justify-between shrink-0">
                    <h1 className="text-lg font-bold text-white capitalize flex items-center gap-2">
                        {activeTab.replace('-', ' ')}
                    </h1>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500"></span>
                        </button>

                        <div className="h-4 w-px bg-slate-800"></div>

                        <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                            <Sparkles size={14} className="text-amber-400" />
                            <span>Kitchen Live</span>
                        </div>
                    </div>
                </header>

                {/* 3. DYNAMIC PAGE VIEWPORT */}
                <main className="flex-1 overflow-y-auto p-8">
                    {renderActivePage()}
                </main>
            </div>
        </div>
    );
}