'use client';
import React from 'react';
import Link from 'next/link';
import { FaPizzaSlice, FaCreditCard, FaTruck, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa6';
import { IoLocationSharp, IoCallSharp, IoMailSharp, IoShieldCheckmarkSharp } from 'react-icons/io5';

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-amber-950/30 text-gray-400 font-sans">

      {/* 🚀 TOP ROW: Value Proposition / App Features Grid */}
      {/* FIXED: Changed to w-full and boosted horizontal padding for fullscreen luxury layout */}
      <div className="w-full px-6 sm:px-10 py-8 sm:py-10 border-b border-amber-950/20">
        {/* Dynamic Grid: 1 column on mobile, 2 on tablets, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

          {/* Feature 1 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-5 rounded-2xl bg-slate-950/50 border border-amber-950/10 hover:border-orange-500/20 transition-all group">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all shrink-0">
              <FaPizzaSlice size={22} />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-semibold text-base">Gourmet Formulations</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Handcrafted artisanal crusts cooked to crispy perfection.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-5 rounded-2xl bg-slate-950/50 border border-amber-950/10 hover:border-orange-500/20 transition-all group">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all shrink-0">
              <FaCreditCard size={22} />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-semibold text-base">Instant Online Checkout</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Secure encryption tokens for rapid payments via dynamic UPI & cards.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-5 rounded-2xl bg-slate-950/50 border border-amber-950/10 hover:border-orange-500/20 transition-all group sm:col-span-2 lg:col-span-1">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all shrink-0">
              <FaTruck size={22} />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-semibold text-base">Live Delivery Tracking</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Monitor your dynamic route updates instantly from oven to doorstep.</p>
            </div>
          </div>

        </div>
      </div>

      {/* 📂 MIDDLE ROW: Organized Navigation Links */}
      {/* 🚀 FIXED: Replaced max-w-7xl with w-full and applied px-6 sm:px-10 for true fullscreen distribution */}
      <div className="w-full px-6 sm:px-10 py-12">
        {/* Responsive Grid wrapping dynamically from 1 column up to 4 clean rows based on device scaling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 xl:gap-12 text-center sm:text-left">

          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <span className="text-2xl font-black text-white tracking-tight">
              Pizz<span className="text-orange-500">A</span> Pala<span className="text-orange-600">c</span>e
            </span>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Serving unmatched luxury in culinary craft, direct online settlement networks, and active tracking streams.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="hover:text-orange-500 text-xl transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-orange-500 text-xl transition-colors"><FaFacebook /></a>
              <a href="#" className="hover:text-orange-500 text-xl transition-colors"><FaTwitter /></a>
            </div>
          </div>

          {/* Column 2: Order Menu Categories */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-white">Explore Menu</h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/pizza" className="hover:text-orange-500 transition-colors block py-1 sm:py-0">Signature Pizzas</Link></li>
              <li><Link href="/drinks" className="text-orange-500 font-medium hover:text-orange-400 transition-colors block py-1 sm:py-0">Refreshing Drinks</Link></li>
              <li><Link href="/sides" className="hover:text-orange-500 transition-colors block py-1 sm:py-0">Artisanal Sides</Link></li>
              <li><Link href="/deals" className="hover:text-orange-500 transition-colors block py-1 sm:py-0">Palace Combos</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-white">Our Services</h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/membership" className="hover:text-orange-500 transition-colors block py-1 sm:py-0">Premium Membership</Link></li>
              <li><Link href="/track" className="hover:text-orange-500 transition-colors block py-1 sm:py-0">Active GPS Track</Link></li>
              <li><Link href="/terms" className="hover:text-orange-500 transition-colors block py-1 sm:py-0">Terms & Operations</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-500 transition-colors block py-1 sm:py-0">Privacy Parameters</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-white">Contact Palace</h5>
            <ul className="flex flex-col items-center sm:items-start space-y-3 text-xs text-gray-500">
              <li className="flex items-center gap-2 max-w-xs text-center sm:text-left">
                <IoLocationSharp size={14} className="text-orange-500 shrink-0" />
                <span>Connaught Place, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2">
                <IoCallSharp size={14} className="text-orange-500 shrink-0" />
                <span>+91 87298 49847</span>
              </li>
              <li className="flex items-center gap-2">
                <IoMailSharp size={14} className="text-orange-500 shrink-0" />
                <span>support@pizzapalace.io</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 🔒 BOTTOM ROW: Copyright System */}
      <div className="w-full bg-neutral-950 py-5 border-t border-amber-950/10">
        {/* 🚀 FIXED: Replaced max-w-7xl container wrapper with full fluid distribution */}
        <div className="w-full px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-gray-600">
          <p className="flex flex-col sm:flex-row items-center gap-1.5">
            <span className="flex items-center gap-1">
              <IoShieldCheckmarkSharp size={14} className="text-emerald-600" />
              © Copyright 2026 Internarea (Scholiverse Educare Pvt. Ltd.).
            </span>
            <span>All Rights Reserved.</span>
          </p>
          <p className="tracking-wide hidden sm:block text-gray-700">Oven Cooked Engine v2.4.0</p>
        </div>
      </div>

    </footer>
  );
}