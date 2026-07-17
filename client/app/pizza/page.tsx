'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import axios from "axios"

interface Pizza {
  img: string;
  name: string;
  desc: string;
  price: number;
}

const stagger = { animate: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

const PizzaSection = () => {
  const navi = useRouter()
  const [cart, Setcart] = useState([])
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  const addtoCart = () => {
    toast.success("Added pizza to cart! 🍕")
  }

  useEffect(() => {
    const Fetch_pizza = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/getpizza`)
        if (res.data && res.data.getPizza) {
          setPizzas(res.data.getPizza)
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to load your gourmet pizzas.")
      }
    };
    Fetch_pizza()
  }, []);

  return (
    // 🌌 Premium Fullscreen Black Background Canvas with edge-to-edge padding overrides
    <div className="min-h-screen w-full bg-black px-6 sm:px-10 pt-6 pb-36 font-sans">

      {/* Brand Title Frame */}
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.45,
          ease: "easeOut",
        }}
        className="text-4xl font-black text-white tracking-tight block mb-6 text-center sm:text-left"
      >
        Pizz<span className="text-orange-500">A</span> Pala
        <span className="text-orange-600">c</span>
        <span className="text-orange-500">e</span>
      </motion.span>

      {/* Header Context Action Bar matching Drinks page pattern */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            className="bg-orange-500 text-black px-5 py-2.5 rounded-2xl text-sm font-bold border-0 cursor-pointer hover:bg-orange-600 transition"
            onClick={() => navi.push('/')}
          >
            ← Back
          </button>
          <div>
            <h1 className="text-[clamp(1.5rem,3vw,2.2rem)] text-amber-50 font-extrabold tracking-wide leading-none mb-1">
              Our <span className="text-orange-500">Pizzas</span>
            </h1>
            <p className="text-gray-500 text-xs font-medium">{pizzas.length} varieties available right now</p>
          </div>
        </div>
      </div>

      {/* 🚀 Dynamic Fullscreen Grid: Wraps from 1 up to 6 responsive portrait columns */}
      <motion.div
        variants={stagger} initial="initial" animate="animate"
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
      >
        {pizzas.map((p, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}
            // 🎨 Dark Blue Card Base with smooth premium subtle borders
            className="bg-slate-950/70 border border-amber-950/20 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 w-full"
          >
            {/* Image Layer - Standing tall at h-56 to protect the vertical aspect ratio */}
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-56 object-cover block border-b border-amber-950/10"
            />

            {/* Context Details Layer */}
            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="text-amber-50 text-lg font-bold tracking-tight leading-tight">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-400 font-normal leading-relaxed line-clamp-2">
                  {p.desc}
                </p>
              </div>

              {/* Pricing & Call to Action Footer Row */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-orange-400 font-black text-lg tracking-wide">₹{p.price}</span>
                <button
                  onClick={addtoCart}
                  className="bg-orange-500 text-black border-none rounded-xl px-4 py-2 text-xs font-bold tracking-wide cursor-pointer hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all shadow-md shadow-orange-500/10"
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

export default PizzaSection;