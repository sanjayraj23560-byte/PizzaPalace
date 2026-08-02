'use client';

import React, { useEffect, useState } from 'react';
import {
    Crown,
    Sparkles,
    Gift,
    ChevronRight,
    Check,
    Zap,
    Flame,
    ShoppingBag,
    Clock,
    Copy,
    CheckCircle2,

} from 'lucide-react';
import { FaHand, FaHandcuffs } from 'react-icons/fa6';
import { auth } from '@/components/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// Mock Customer Profile State
const INITIAL_CUSTOMER = {
    name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    tier: 'Gold', // Bronze, Silver, Gold, VIP Palace
    points: 1850,
    nextTierPoints: 3000,
    nextTierName: 'VIP Palace',
};

// Available Loyalty Vouchers for Redemption
const REWARDS_CATALOG = [
    {
        id: 'rew_1',
        title: 'Free Garlic Knots',
        pointsCost: 400,
        description: 'Get a free order of buttery garlic knots with any large pizza.',
        code: 'FREEKNOTS2026',
        icon: '🥖'
    },
    {
        id: 'rew_2',
        title: '$10 Off Next Order',
        pointsCost: 800,
        description: 'Valid on any order over $25. Applied directly at checkout.',
        code: 'PALACE10OFF',
        icon: '💵'
    },
    {
        id: 'rew_3',
        title: 'Free Signature Pizza',
        pointsCost: 1500,
        description: 'Redeem one free Medium Pepperoni or Margherita Pizza.',
        code: 'FREEPIZZA26',
        icon: '🍕'
    },
    {
        id: 'rew_4',
        title: 'VIP Double Points Weekend',
        pointsCost: 2000,
        description: 'Earn 2x points on all orders for 48 hours.',
        code: 'DOUBLEPERK',
        icon: '👑'
    }
];

export default function CustomerLoyaltyHub() {
    const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
    const [claimedCodes, setClaimedCodes] = useState<{ [key: string]: string }>({});
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [user, setCurrentUser] = useState<User|null>(null)

    // Calculate Progress Percentage to Next Tier
    const progressPercent = Math.min(
        100,
        Math.round((customer.points / customer.nextTierPoints) * 100)
    );
    // Redeem Reward Handler
    const handleRedeem = (reward: typeof REWARDS_CATALOG[0]) => {
        if (customer.points < reward.pointsCost) return;

        // Deduct Points Optimistically
        setCustomer(prev => ({
            ...prev,
            points: prev.points - reward.pointsCost
        }));

        // Store Claimed Code
        setClaimedCodes(prev => ({
            ...prev,
            [reward.id]: reward.code
        }));
    };

    // Copy Voucher Code to Clipboard
    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 text-slate-100 p-4 sm:p-6 pb-16">

            {/* HERO CARD: Current Status & Points Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-950 to-orange-950/40 border border-slate-800 p-6 sm:p-8 shadow-2xl">
                {/* Background Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/60 text-amber-400 border border-amber-800/80 uppercase tracking-wide flex items-center gap-1.5">
                                <Crown size={12} /> {customer.tier} Member
                            </span>
                            <span className="text-xs text-slate-400 font-mono">ID: #PV-9918</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                            Welcome Back, {auth.currentUser?.displayName}! <FaHand />
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Earn 10 points for every $1 spent at Pizza Palace.
                        </p>
                    </div>

                    {/* Big Points Badge */}
                    <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-4 min-w-50 justify-between">
                        <div>
                            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Available Balance</p>
                            <p className="text-3xl font-extrabold text-amber-400 font-mono mt-0.5">
                                {customer.points.toLocaleString()} <span className="text-xs text-slate-400 font-normal">pts</span>
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                            <Sparkles size={20} />
                        </div>
                    </div>
                </div>

                {/* TIER PROGRESS BAR */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium flex items-center gap-1.5">
                            <Zap size={14} className="text-amber-400" />
                            Progress to <strong className="text-white">{customer.nextTierName}</strong>
                        </span>
                        <span className="font-mono text-slate-400">
                            <strong className="text-amber-400 font-bold">{customer.points}</strong> / {customer.nextTierPoints} pts
                        </span>
                    </div>

                    {/* Outer Bar */}
                    <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800">
                        {/* Progress Fill */}
                        <div
                            className="bg-linear-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500 shadow-lg shadow-orange-500/20"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>

                    <p className="text-[11px] text-slate-500 text-right">
                        Only {customer.nextTierPoints - customer.points} more points needed to unlock 15% off orders & free delivery!
                    </p>
                </div>
            </div>

            {/* SECTION 2: Redeem Rewards Catalog */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Gift size={20} className="text-orange-500" /> Redeem Reward Vouchers
                        </h2>
                        <p className="text-xs text-slate-400">Trade your earned loyalty points for instant food rewards & discounts.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {REWARDS_CATALOG.map((reward) => {
                        const canAfford = customer.points >= reward.pointsCost;
                        const claimedCode = claimedCodes[reward.id];

                        return (
                            <div
                                key={reward.id}
                                className={`bg-slate-900/80 border p-5 rounded-2xl flex flex-col justify-between space-y-4 transition-all ${claimedCode
                                    ? 'border-emerald-800/60 bg-emerald-950/10'
                                    : 'border-slate-800 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-3xl p-2 bg-slate-950 rounded-xl border border-slate-800">{reward.icon}</span>
                                        <div>
                                            <h3 className="text-sm font-bold text-white">{reward.title}</h3>
                                            <p className="text-xs text-slate-400 mt-0.5">{reward.description}</p>
                                        </div>
                                    </div>
                                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-950/40 text-amber-400 border border-amber-800/60 shrink-0">
                                        {reward.pointsCost} pts
                                    </span>
                                </div>

                                {/* Action Area */}
                                <div>
                                    {claimedCode ? (
                                        <div className="flex items-center justify-between bg-slate-950 border border-emerald-800/60 p-2.5 rounded-xl">
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <CheckCircle2 size={12} /> Voucher Claimed!
                                                </p>
                                                <p className="font-mono text-xs font-bold text-white tracking-widest">{claimedCode}</p>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(claimedCode)}
                                                className="bg-slate-900 hover:bg-slate-800 text-slate-300 p-2 rounded-lg text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1"
                                            >
                                                {copiedCode === claimedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                                {copiedCode === claimedCode ? 'Copied' : 'Copy'}
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleRedeem(reward)}
                                            disabled={!canAfford}
                                            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${canAfford
                                                ? 'bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-950/40'
                                                : 'bg-slate-950 text-slate-600 border border-slate-800/80 cursor-not-allowed'
                                                }`}
                                        >
                                            {canAfford ? 'Redeem Voucher' : `Need ${reward.pointsCost - customer.points} more pts`}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* SECTION 3: Loyalty Perks Breakdown */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Crown size={16} className="text-amber-400" /> Membership Tier Benefits
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-950 border border-slate-800/60 p-4 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-amber-700 uppercase font-mono">Bronze</span>
                        <p className="text-xs font-semibold text-slate-200">0 - 499 Pts</p>
                        <ul className="text-[11px] text-slate-400 space-y-1 pt-2">
                            <li>• 10 pts per $1 spent</li>
                            <li>• Birthday Treat Voucher</li>
                        </ul>
                    </div>

                    <div className="bg-slate-950 border border-amber-800/60 p-4 rounded-xl space-y-1 relative">
                        <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">★ Current Tier (Gold)</span>
                        <p className="text-xs font-semibold text-slate-200">1,500 - 2,999 Pts</p>
                        <ul className="text-[11px] text-slate-400 space-y-1 pt-2">
                            <li>• 15 pts per $1 spent</li>
                            <li>• Free Delivery on $20+</li>
                            <li>• Priority Kitchen Queue</li>
                        </ul>
                    </div>

                    <div className="bg-slate-950 border border-orange-500/40 p-4 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-orange-400 uppercase font-mono">VIP Palace</span>
                        <p className="text-xs font-semibold text-slate-200">3,000+ Pts</p>
                        <ul className="text-[11px] text-slate-400 space-y-1 pt-2">
                            <li>• 20 pts per $1 spent</li>
                            <li>• Always Free Delivery</li>
                            <li>• Exclusive Secret Menu</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}