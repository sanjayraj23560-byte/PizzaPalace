'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function AskMe() {
    const router = useRouter();

    return (
        <div className="fixed bottom-15 right-6 z-50">
            <button
                onClick={() => router.push('/chat')}
                className="group relative flex items-center gap-2.5 px-5 py-3 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-100 font-medium text-sm shadow-[0_8px_32px_0_rgba(124,58,237,0.25)] backdrop-blur-lg hover:bg-violet-900/50 hover:border-violet-400/60 hover:shadow-[0_8px_32px_0_rgba(139,92,246,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
                {/* Ambient Liquid Glass Reflection Light */}
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-violet-400/20 rounded-full blur-xl group-hover:bg-violet-300/30 transition-all duration-500 pointer-events-none" />

                {/* Violet Glowing Backlight Aura */}
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-violet-600/30 via-fuchsia-600/20 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />

                {/* Liquid Glass Icon Container */}
                <div className="w-7 h-7 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300 group-hover:bg-violet-500 group-hover:text-white group-hover:border-violet-400 transition-all duration-300 shadow-inner">
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-300 animate-pulse" />
                </div>

                {/* Label */}
                <span className="tracking-wide text-violet-100 group-hover:text-white font-medium drop-shadow-sm">
                    Ask Ace
                </span>
            </button>
        </div>
    );
}