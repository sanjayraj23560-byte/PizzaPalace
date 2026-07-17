'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

// 🚀 LESSON 1: Set explicit data types (string, number), NEVER literal booleans (true)
interface MenuItem {
  _id?: string;
  name: string;
  img: string;
  price: number;
  desc: string;
  type?: "pizza" | "drink"; // Optional type modifier tag for tracking
}

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const Home = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState(true);
  const [pizzas, setPizzas] = useState<MenuItem[]>([]);
  const [drinks, setDrinks] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");

  // 🚀 LESSON 2: Safe handling of optional state elements
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    // Safely check client-side window storage elements during runtime mounting
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed?.username) setUsername(parsed.username);
        } catch (e) {
          console.error("Local storage parse error", e);
        }
      }
    }

    const fetchFeatured = async () => {
      try {
        const [pizzaRes, drinkRes] = await Promise.all([
          axios.get(`http://localhost:4000/api/getpizza`),
          axios.get(`http://localhost:4000/api/getdrinks`)
        ]);

        // Safely pull variables depending on how your backend array payload is wrapped
        const pizzaData = pizzaRes.data.getPizza || pizzaRes.data.getpizzas || [];
        const drinkData = drinkRes.data.getDrinks || drinkRes.data.getdrinks || [];

        const slicedPizzas = pizzaData.slice(0, 3).map((p: any) => ({ ...p, type: "pizza" }));
        const slicedDrinks = drinkData.slice(0, 2).map((d: any) => ({ ...d, type: "drink" }));

        setDrinks(slicedDrinks);
        setPizzas(slicedPizzas);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch featured:", err);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleAdd = (item: MenuItem) => {
    toast.success(`${item.name} added to cart! 🛒`);
  };

  // 🚀 LESSON 3: Combine discrete state layers explicitly before running filters
  const featuredItems = [...pizzas, ...drinks];

  const filtered = featuredItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // 🌌 Premium edge-to-edge fullscreen setup
    <div className="min-h-screen w-full bg-black px-6 sm:px-10 pt-6 pb-36 font-sans">

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-8 text-center sm:text-left"
      >
        <span className="text-4xl font-black text-white tracking-tight">
          Pizz<span className="text-orange-500">A</span> Pala<span className="text-orange-600">c</span>e
        </span>
        <p className="text-gray-500 text-sm mt-2">
          Welcome back, <span className="text-amber-50 font-bold">{username}</span> 👋
        </p>
      </motion.div>

      <motion.div variants={stagger} initial="initial" animate="animate" className="w-full">

        {/* Search Bar Element */}
        <motion.div variants={fadeUp} className="w-full relative mb-8">
          <input
            className="w-full bg-slate-950/40 border border-amber-950/30 text-white rounded-2xl p-3.5 pl-5 text-sm focus:outline-none focus:border-orange-500 placeholder-gray-600 transition"
            placeholder="Search pizzas, drinks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </motion.div>

        {/* Quick Route Nav Buttons */}
        <motion.div variants={fadeUp} className="w-full grid grid-cols-3 gap-3 mb-10">
          <button
            onClick={() => navigate.push('/pizza')}
            className="bg-slate-950/70 border border-amber-950/20 hover:border-orange-500/30 text-amber-50 rounded-xl py-3 text-xs sm:text-sm font-bold transition cursor-pointer"
          >
            🍕 Pizzas
          </button>
          <button
            onClick={() => navigate.push('/drinks')}
            className="bg-slate-950/70 border border-amber-950/20 hover:border-orange-500/30 text-amber-50 rounded-xl py-3 text-xs sm:text-sm font-bold transition cursor-pointer"
          >
            🥤 Drinks
          </button>
          <button
            onClick={() => navigate.push('/cart')}
            className="bg-orange-500 text-black rounded-xl py-3 text-xs sm:text-sm font-black transition hover:bg-orange-600 cursor-pointer"
          >
            🛒 Checkout
          </button>
        </motion.div>

        {/* Featured Showcase Grid */}
        <motion.div variants={fadeUp} className="w-full">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide mb-6">
            Featured <span className="text-orange-500">Today</span>
          </h2>

          {loading ? (
            <div className="w-full text-center text-gray-500 py-16 text-sm font-medium">
              Stoking the ovens... 🔥
            </div>
          ) : filtered.length === 0 ? (
            <div className="w-full text-center text-gray-500 py-16 text-sm font-medium">
              No items found matching "{search}"
            </div>
          ) : (
            // Flex row to dynamic list grid matching standard responsive fullscreen layout
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((f, i) => (
                <motion.div
                  key={f._id || f.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="bg-slate-950/60 border border-amber-950/15 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300"
                >
                  <img
                    src={f.img}
                    alt={f.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-amber-950/10"
                  />
                  <div className="flex-1 min-w-0">
                    <span className={`text-[10px] font-black tracking-wider uppercase ${f.type === "pizza" ? "text-orange-400" : "text-sky-400"
                      }`}>
                      {f.type === "pizza" ? "🍕 Pizza" : "🥤 Drink"}
                    </span>
                    <h3 className="text-amber-50 text-sm sm:text-base font-bold truncate mt-0.5 mb-1">
                      {f.name}
                    </h3>
                    <p className="text-orange-400 font-black text-sm">
                      ₹{f.price}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAdd(f)}
                    className="bg-orange-500 text-black rounded-xl px-4 py-2 text-xs font-bold shrink-0 hover:bg-orange-600 active:scale-95 transition-all"
                  >
                    + Add
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Home;