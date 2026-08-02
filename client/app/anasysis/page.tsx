'use client';

import React from 'react';
import { 
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { TrendingUp, Flame , CupSodaIcon, DollarSign, ArrowUpRight } from 'lucide-react';


// Mock Data for Weekly Sales Breakdown
const salesData = [
    { day: 'Mon', Pizzas: 120, Drinks: 95 },
    { day: 'Tue', Pizzas: 180, Drinks: 140 },
    { day: 'Wed', Pizzas: 250, Drinks: 190 },
    { day: 'Thu', Pizzas: 310, Drinks: 240 },
    { day: 'Fri', Pizzas: 480, Drinks: 390 },
    { day: 'Sat', Pizzas: 620, Drinks: 510 },
    { day: 'Sun', Pizzas: 540, Drinks: 430 },
];

// Mock Data for Top Performing Categories
const categoryData = [
    { name: 'Pepperoni Pizza', Sales: 420 },
    { name: 'Margherita', Sales: 310 },
    { name: 'Iced Lemon Tea', Sales: 280 },
    { name: 'BBQ Chicken', Sales: 260 },
    { name: 'Classic Cola', Sales: 220 },
];

// Custom Hover Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl shadow-2xl backdrop-blur-md">
                <p className="text-xs font-bold text-slate-300 mb-2">{label} Revenue Breakdown</p>
                {payload.map((entry: any, index: number) => (
                    <div key={`item-${index}`} className="flex items-center gap-2 text-xs py-0.5">
                        <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: entry.color }} 
                        />
                        <span className="text-slate-400 capitalize">{entry.name}:</span>
                        <span className="font-mono font-bold text-white">${entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function Analytics() {
    return (
        <div className="space-y-6 text-slate-100">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-5">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        Sales & Performance Analytics
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Real-time breakdown of Pizza vs. Beverage orders</p>
                </div>
                <div className="flex gap-2">
                    <span className="text-xs font-medium px-3 py-1.5 rounded-xl bg-orange-950/40 text-orange-400 border border-orange-800/50 flex items-center gap-1">
                        <Flame size={14} /> Peak Hours Active
                    </span>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Pizza Revenue */}
                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-orange-900/50 transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all" />
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-slate-400 font-medium">Total Pizza Sales</p>
                            <h3 className="text-2xl font-bold text-white mt-1">$2,500</h3>
                        </div>
                        <div className="p-2.5 rounded-xl bg-orange-950/60 text-orange-400 border border-orange-800/60">
                            <Flame size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400">
                        <ArrowUpRight size={14} />
                        <span>+18.4% from last week</span>
                    </div>
                </div>

                {/* Total Drinks Revenue */}
                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-blue-900/50 transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-slate-400 font-medium">Total Drink Sales</p>
                            <h3 className="text-2xl font-bold text-white mt-1">$1,960</h3>
                        </div>
                        <div className="p-2.5 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/60">
                            <CupSodaIcon size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400">
                        <ArrowUpRight size={14} />
                        <span>+12.1% from last week</span>
                    </div>
                </div>

                {/* Combined Growth */}
                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all sm:col-span-2 lg:col-span-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-slate-400 font-medium">Combined Revenue</p>
                            <h3 className="text-2xl font-bold text-white mt-1">$4,460</h3>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-orange-400">
                        <span>Pizzas account for 56% of total revenue</span>
                    </div>
                </div>
            </div>

            {/* CHART 1: Area Graph (Pizzas vs Drinks Over Time) */}
            <div className="bg-slate-900/80 border border-slate-800/80 p-6 rounded-2xl shadow-xl">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-base font-semibold text-white">Weekly Sales Comparison</h3>
                        <p className="text-xs text-slate-400">Hover over points to see exact daily earnings</p>
                    </div>
                </div>

                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                {/* Dark Orange Gradient */}
                                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0}/>
                                </linearGradient>
                                {/* Dark Blue Gradient */}
                                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.0}/>
                                </linearGradient>
                            </defs>
                            
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />

                            {/* Pizza Stream Line */}
                            <Area 
                                type="monotone" 
                                dataKey="Pizzas" 
                                stroke="#ea580c" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#orangeGradient)" 
                            />
                            {/* Drinks Stream Line */}
                            <Area 
                                type="monotone" 
                                dataKey="Drinks" 
                                stroke="#2563eb" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#blueGradient)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* CHART 2: Top Selling Items Bar Chart */}
            <div className="bg-slate-900/80 border border-slate-800/80 p-6 rounded-2xl shadow-xl">
                <div className="mb-6">
                    <h3 className="text-base font-semibold text-white">Top 5 Items Sold</h3>
                    <p className="text-xs text-slate-400">Volume distribution across top pizzas and beverages</p>
                </div>

                <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                            <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar 
                                dataKey="Sales" 
                                fill="#c2410c" 
                                radius={[8, 8, 0, 0]}
                                activeBar={{ fill: '#1e40af' }} // Changes to dark blue on hover!
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}