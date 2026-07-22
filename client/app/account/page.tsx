'use client';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { auth } from "@/components/firebase";
import { FaHeadset } from "react-icons/fa6";
import { Heart, Ticket, Crown, HelpCircle } from "lucide-react";
import { ListOrdered } from "lucide-react";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect, useState, ElementType } from "react";

// 1. Update interface so icon accepts a React Component instead of a string
interface MenuItem {
    label: string;
    icon: ElementType; // Accepts both Lucide & React-Icons components
    path: string;
    color: string;
    desc: string;
}

// 2. Pass imported icon component references directly (without quotes!)
const menuItems: MenuItem[] = [
    { label: "My Orders", icon: ListOrdered, path: "/order", color: "#ff6464", desc: "Track & reorder" },
    { label: "Wishlist", icon: Heart, path: "/wishlist", color: "#ff6b8a", desc: "Saved favourites" },
    { label: "Coupons", icon: Ticket, path: "/coupons", color: "#ffc850", desc: "Deals & offers" },
    { label: "Membership", icon: Crown, path: "/member", color: "#f5c842", desc: "Your tier & perks" },
    { label: "Help", icon: FaHeadset, path: "/help", color: "#50b4ff", desc: "Support & FAQs" },
];

const stagger = { animate: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const Account = () => {
    const navi = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast.success("Signed out successfully!");
            navi.push('/');
        } catch (error) {
            toast.error("Error signing out!");
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="page grain flex items-center justify-center min-h-screen text-white bg-black">
                <p className="text-sm font-medium tracking-widest animate-pulse">LOADING PROFILE...</p>
            </div>
        );
    }

    return (
        <div className="page grain" style={{ padding: "24px 20px 130px", backgroundColor: "#000", minHeight: "100vh", color: "#9ca3af" }}>

            <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
                className="text-4xl font-bold text-white block mb-4"
            >
                Pizz<span style={{ color: "var(--orange, #ea580c)" }}>A</span> Pala
                <span style={{ color: "var(--orange, #ea580c)" }}>C</span>
                <span style={{ color: "var(--orange, #ea580c)" }}>e</span>
            </motion.span>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <button
                    className="back-btn"
                    onClick={() => navi.push('/home')}
                    style={{ background: "#0f172a", border: "1px solid rgba(120,53,4,0.2)", padding: "6px 16px", borderRadius: "12px", color: "#fff", cursor: "pointer" }}
                >
                    ← Back
                </button>
                <h1 className="section-title text-xl font-bold text-white">My <span style={{ color: "#ea580c" }}>Account</span></h1>
            </div>

            {/* Profile Card State Selector */}
            {user ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                    style={{ padding: 20, marginBottom: 24, display: "flex", alignItems: "center", gap: 16, background: "#0f172a", borderRadius: 16 }}
                >
                    <div style={{ width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", flexShrink: 0, overflow: "hidden" }}>
                        <img
                            src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`}
                            alt="Profile avatar"
                            className="w-full h-full object-cover border-2 border-orange-500"
                        />
                    </div>
                    <div>
                        <p style={{ fontSize: "1.15rem", fontWeight: 600, color: "#fff" }}>
                            {user.displayName || "Formulation Engineer"}
                        </p>
                        <p style={{ color: "#6b7280", fontSize: "0.82rem" }}>
                            {user.email}
                        </p>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                    style={{ padding: 20, marginBottom: 24, display: "flex", alignItems: "center", gap: 16, background: "#0f172a", borderRadius: 16 }}
                >
                    <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #ea580c, #e63946)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, color: "#fff" }}>
                        👤
                    </div>
                    <div>
                        <p style={{ fontSize: "1.15rem", fontWeight: 600, color: "#fff" }}>Guest Mode</p>
                        <p style={{ color: "#6b7280", fontSize: "0.82rem" }}>Please login to unlock orders & tiers</p>
                    </div>
                </motion.div>
            )}

            {/* Navigation Options Menu */}
            <motion.div variants={stagger} initial="initial" animate="animate" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {menuItems.map(m => {
                    // 3. Assign component reference to a capitalized variable
                    const IconComponent = m.icon;

                    return (
                        <motion.div
                            key={m.path}
                            variants={fadeUp}
                            className="card"
                            onClick={() => navi.push(m.path)}
                            style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", background: "#0f172a", borderRadius: 16 }}
                            whileHover={{ x: 6, transition: { duration: 0.2 } }}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${m.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {/* 4. Render as a JSX Component */}
                                <IconComponent style={{ fontSize: 20, color: m.color, width: 20, height: 20 }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "#fff" }}>{m.label}</p>
                                <p style={{ color: "#6b7280", fontSize: "0.78rem" }}>{m.desc}</p>
                            </div>
                            <span style={{ color: "#6b7280", fontSize: 18 }}>→</span>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Action Triggers */}
            <div style={{ marginTop: 20 }}>
                {user ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <button
                            onClick={handleSignOut}
                            style={{ width: "100%", background: "rgba(230,57,70,0.1)", border: "1px solid rgba(230,57,70,0.25)", borderRadius: 14, padding: 13, color: "#e63946", fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(230,57,70,0.18)"}
                            onMouseLeave={e => e.currentTarget.style.background = "rgba(230,57,70,0.1)"}
                        >
                            Log out
                        </button>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <button
                            onClick={() => navi.push('/login')}
                            style={{ width: "100%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 14, padding: 13, color: "#22c55e", fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(34,197,94,0.2)"}
                            onMouseLeave={e => e.currentTarget.style.background = "rgba(34,197,94,0.1)"}
                        >
                            Log in to Account
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Account;