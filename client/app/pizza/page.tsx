'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { useContext } from "react"
// import { CartContext } from '@/context/cartContext'
import axios from "axios"

const stagger = { animate: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

const PizzaSection = () => {
  const pizzas = [
    { name: "Margherita Royale", desc: "Fresh tomato, mozzarella, basil", price: 299, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
    { name: "BBQ Chicken Feast", desc: "Smoky BBQ, grilled chicken, red onion", price: 349, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80" },
    { name: "Pepperoni Storm", desc: "Double pepperoni, jalapeño, cheese", price: 329, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
    { name: "Veggie Garden", desc: "Bell pepper, olive, mushroom, spinach", price: 279, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80" },
    { name: "Paneer Tikka", desc: "Indian spiced paneer, capsicum, onion", price: 319, img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80" },
    { name: "Truffle Mushroom", desc: "Truffle oil, wild mushrooms, parmesan", price: 379, img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&q=80" },
    { name: "Four Cheese", desc: "Mozzarella, cheddar, gouda, parmesan", price: 359, img: "https://images.unsplash.com/photo-1548369937-47519962c11a?w=400&q=80" },
    { name: "Spicy Arrabbiata", desc: "Spicy tomato, chilli flakes, fresh basil", price: 289, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
  ];

  // export default pizzas;
  const navi = useRouter()
  const [cart, Setcart] = useState([])
  const [btn, setbtn] = useState(true)
  // const { addToCart } = useContext(CartContext)
  const [toast, setToast] = useState(false)

  // useEffect(() => {
  //   const Fetch_pizza = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:4000/api/getpizza`)
  //       console.log(res)
  //       setPizzas(res.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   };
  //   Fetch_pizza()
  // }, []);

  const handleAdd = (p: any) => {
    // addToCart(p)
    setTimeout(() => setToast(false), 2000)
  }

  return (
    <div className="min-h-dvh bg-(--bg) px-6 pt-6 pb-35">
      {/* pizza palace frame motion  */}
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.45,
          ease: "easeOut",
        }}
        className="text-4xl font-bold text-white">
        Pizz
        <span className="text-(--orange)">A</span> Pala
        <span className="text-(--orange)">C</span>
        <span className="text-(--orange)">e</span>
      </motion.span>

      {/* availabel dishes and items  */}

      <div className="flex items-center gap-3 mb-6">
        <button className="bg-amber-700 p-3 rounded-2xl text-2xl font-bold" onClick={() => navi.push('/')}>← Back</button>
        <div>
          <h1 className="text-[clamp(1.4rem,3vw,2rem)] text-(--cream) font-bold">
            Our <span className="text-(--orange)">Pizzas</span>
          </h1>
          <p className="text-(--muted) text-[0.8rem]">{pizzas.length} varieties available</p>
        </div>
      </div>
      {toast && (
        <div className="fixed top-6 right-6 z-30 w-56 flex items-center justify-center gap-2 rounded-2xl border-2 border-green-800 bg-green-700 p-3 shadow-lg">
          <p className="text-white font-medium">Added to cart!</p>
        </div>
      )}

      <motion.div
        variants={stagger} initial="initial" animate="animate"
        className="grid gap-6.5 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">

        {pizzas.map((p, index) => (
          <motion.div key={p.name} variants={fadeUp}
            whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(0,0,0,0.45)" }}
            className="bg-(--card) border border-[rgba(253,240,220,0.12)] rounded-2xl overflow-hidden flex flex-col">

            <img src={p.img} alt={p.name} className="w-full h-37.5 object-cover block" />
            <div className="px-3.5 pt-3 pb-3.5 flex flex-col flex-1">
              <h3 className="text-[0.95rem] text-(--cream) font-semibold mb-1 leading-[1.3]">
                {p.name}
              </h3>
              <p className="text-xs text-(--muted) mb-3 flex-1 leading-normal">
                {p.desc}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-(--orange) font-bold text-[0.95rem]">₹{p.price}</span>
                <button
                  className="bg-amber-700 text-white border-none rounded-lg px-3.5 py-1.5 text-[0.78rem] font-semibold"
                  onClick={() => handleAdd(p)}
                >+ Add</button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
export default PizzaSection