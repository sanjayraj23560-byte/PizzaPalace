'use client';

import React, { useState } from 'react';
import { 
    Crown, 
    Award, 
    Gift, 
    Search, 
    Plus, 
    Minus, 
    Sparkles, 
    TrendingUp, 
    ChevronRight,
    Users,
    ShieldAlert
} from 'lucide-react';

// Mock Tier Breakdown
const TIERS = [
    { name: 'Bronze', minPoints: 0, count: 1240, color: 'from-amber-700/30 to-amber-900/10', border: 'border-amber-800/50', badge: 'text-amber-500' },
    { name: 'Silver', minPoints: 500, count: 680, color: 'from-slate-600/30 to-slate-800/10', border: 'border-slate-700/50', badge: 'text-slate-300' },
    { name: 'Gold', minPoints: 1500, count: 320, color: 'from-amber-500/30 to-amber-700/10', border: 'border-amber-600/50', badge: 'text-amber-400' },
    { name: 'VIP Palace', minPoints: 3000, count: 95, color: 'from-orange-600/30 to-indigo-900/20', border: 'border-orange-500/60', badge: 'text-orange-400' },
];

// Mock Members Data
const INITIAL_MEMBERS = [
    { id: 'mem_1', name: 'Marcus Vance', email: 'marcus.v@example.com', tier: 'VIP Palace', points: 3450, totalSpent: '$1,280', joined: '2025-01-10' },
    { id: 'mem_2', name: 'Elena Rostova', email: 'elena.r@example.com', tier: 'Gold', points: 1820, totalSpent: '$740', joined: '2025-02-14' },
    { id: 'mem_3', name: 'David Kim', email: 'dkim99@example.com', tier: 'Silver', points: 890, totalSpent: '$310', joined: '2025-03-01' },
    { id: 'mem_4', name: 'Jessica Taylor', email: 'jtaylor@example.com', tier: 'Bronze', points: 210, totalSpent: '$95', joined: '2025-05-18' },
];

export default function Membership() {
    const [members, setMembers] = useState(INITIAL_MEMBERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTier, setSelectedTier] = useState('All');

    // Filter Logic
    const filteredMembers = members.filter((member) => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTier = selectedTier === 'All' || member.tier === selectedTier;
        return matchesSearch && matchesTier;
    });

    // Quick Point Modification Handlers
    const handleAdjustPoints = (id: string, amount: number) => {
        setMembers(prev => prev.map(m => {
            if (m.id === id) {
                const newPoints = Math.max(0, m.points + amount);
                return { ...m, points: newPoints };
            }
            return m;
        }));
    };

    return (
        <div className="space-y-6 text-slate-100 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Crown className="text-orange-500" size={24} /> Membership & Loyalty Program
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Track VIP customers, manage rewards points balance, and adjust tier perks.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-orange-950/40 text-orange-400 border border-orange-800/60 flex items-center gap-1.5">
                        <Sparkles size={14} /> Total Points Awarded: <span className="font-mono font-bold text-white">637,000 pts</span>
                    </span>
                </div>
            </div>

            {/* Tier Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {TIERS.map((tier) => (
                    <div 
                        key={tier.name}
                        className={`bg-linear-to-br ${tier.color} border ${tier.border} p-5 rounded-2xl relative overflow-hidden backdrop-blur-sm`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${tier.badge}`}>
                                    {tier.name}
                                </span>
                                <h3 className="text-2xl font-bold text-white mt-1 font-mono">{tier.count}</h3>
                                <p className="text-[11px] text-slate-400 mt-1">Min: {tier.minPoints} pts</p>
                            </div>
                            <Award className={tier.badge} size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search member name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                </div>

                {/* Tier Filter Pills */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    {['All', 'Bronze', 'Silver', 'Gold', 'VIP Palace'].map((tier) => (
                        <button
                            key={tier}
                            onClick={() => setSelectedTier(tier)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                                selectedTier === tier
                                    ? 'bg-orange-950/60 text-orange-400 border border-orange-800/60 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                            }`}
                        >
                            {tier}
                        </button>
                    ))}
                </div>
            </div>

            {/* Members Table */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Users size={16} className="text-orange-400" /> Loyalty Members Directory
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono tracking-wider">
                                <th className="p-4">Member</th>
                                <th className="p-4">Membership Tier</th>
                                <th className="p-4">Points Balance</th>
                                <th className="p-4">Lifetime Spend</th>
                                <th className="p-4">Member Since</th>
                                <th className="p-4 text-center">Adjust Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        No members found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-slate-800/30 transition-colors">
                                        
                                        {/* Name & Email */}
                                        <td className="p-4">
                                            <div>
                                                <p className="font-semibold text-slate-200 text-sm">{member.name}</p>
                                                <p className="text-[11px] text-slate-400">{member.email}</p>
                                            </div>
                                        </td>

                                        {/* Tier Badge */}
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                                member.tier === 'VIP Palace' ? 'bg-orange-950/60 text-orange-400 border-orange-800/80' :
                                                member.tier === 'Gold' ? 'bg-amber-950/60 text-amber-400 border-amber-800/80' :
                                                member.tier === 'Silver' ? 'bg-slate-800 text-slate-300 border-slate-700' :
                                                'bg-amber-950/30 text-amber-600 border-amber-900/50'
                                            }`}>
                                                {member.tier}
                                            </span>
                                        </td>

                                        {/* Points */}
                                        <td className="p-4">
                                            <span className="font-mono font-bold text-amber-400 text-sm">{member.points.toLocaleString()} pts</span>
                                        </td>

                                        {/* Total Spend */}
                                        <td className="p-4">
                                            <span className="font-mono font-semibold text-emerald-400">{member.totalSpent}</span>
                                        </td>

                                        {/* Joined Date */}
                                        <td className="p-4 text-slate-400 font-mono">
                                            {member.joined}
                                        </td>

                                        {/* Adjust Points Buttons */}
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => handleAdjustPoints(member.id, -50)}
                                                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-rose-400 hover:bg-rose-950/40 hover:border-rose-800 transition-all"
                                                    title="Deduct 50 points"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <button 
                                                    onClick={() => handleAdjustPoints(member.id, 100)}
                                                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-800 transition-all"
                                                    title="Add 100 points"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
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