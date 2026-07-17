'use client';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";

interface DrinkItem {
  name: string;
  desc: string;
  img: string;
  price: number;
}

const DrinkSection = () => {
  const stagger = { animate: { transition: { staggerChildren: 0.06 } } }
  const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

  const [drinks, setDrinks] = useState<DrinkItem[]>([])
  const navi = useRouter()

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/getdrinks`);
        if (res.data && res.data.getDrinks) {
          setDrinks(res.data.getDrinks);
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        toast.error("Failed to load refreshing options.");
      }
    }
    fetchDrinks();
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return
      if (e.key === "p" || e.key === "P") navi.push('/pizza')
      if (e.key === "h" || e.key === "H") navi.push('/')
      if (e.key === "c" || e.key === "C") navi.push('/cart')
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [navi])

  const handleAdd = (d: DrinkItem) => {
    toast.success(`${d.name} added to cart! 🥤`);
  }

  return (
    // 🌌 Premium Black Background Canvas
    <div className="min-h-screen w-full bg-black px-6 sm:px-10 pt-6 pb-36 font-sans">

      {/* Brand Title Frame */}
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        className="text-4xl font-black text-white tracking-tight block mb-6 text-center sm:text-left"
      >
        Pizz<span className="text-orange-500">A</span> Pala
        <span className="text-orange-600">c</span>
        <span className="text-orange-500">e</span>
      </motion.span>

      {/* Header Context Action Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            className="bg-orange-500 text-black px-5 py-2.5 rounded-2xl text-sm font-bold border-0 cursor-pointer hover:bg-orange-600 transition"
            onClick={() => navi.push('/home')}
          >
            ← Back
          </button>
          <div>
            <h1 className="text-[clamp(1.5rem,3vw,2.2rem)] text-amber-50 font-extrabold tracking-wide leading-none mb-1">
              Cool <span className="text-orange-500">Drink</span>
            </h1>
            <p className="text-gray-500 text-xs font-medium">{drinks.length} refreshing options available</p>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="flex gap-2">
          <span className="bg-slate-900 border border-amber-950/20 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-gray-500 tracking-wider uppercase">P pizza</span>
          <span className="bg-slate-900 border border-amber-950/20 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-gray-500 tracking-wider uppercase">C cart</span>
        </div>
      </div>

      {/* 🚀 FIXED: Stripped max-w constraints. w-full forces it to stretch edge-to-edge */}
      <motion.div
        variants={stagger} initial="initial" animate="animate"
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
      >
        {drinks.map((d, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}
            className="bg-slate-950/70 border border-amber-950/20 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 w-full"
          >
            {/* Image Layer */}
            <img
              src={d.img}
              alt={d.name}
              className="w-full h-56 object-cover block border-b border-amber-950/10"
            />

            {/* Context Layer */}
            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="text-amber-50 text-lg font-bold tracking-tight leading-tight">{d.name}</h3>
                <p className="text-xs text-gray-400 font-normal leading-relaxed line-clamp-2">{d.desc}</p>
              </div>

              {/* Pricing & Button Row */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-orange-400 font-black text-lg tracking-wide">₹{d.price}</span>
                <button
                  className="bg-orange-500 text-black border-none rounded-xl px-4 py-2 text-xs font-bold tracking-wide cursor-pointer hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all shadow-md shadow-orange-500/10"
                  onClick={() => handleAdd(d)}
                >
                  + Add
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default DrinkSection;