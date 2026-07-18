'use client';
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { auth } from "@/components/firebase";
import { onAuthStateChanged } from "firebase/auth";

// 1. Explicitly Type check your structure shapes
interface CartItem {
    productId: string;
    name: string;
    price: number;
    img: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: any) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => void;
    getCartTotal: () => number;
}

// 2. FIXED: Give the Context a explicit fallback structural object instead of blank/undefined
export const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: async () => { },
    removeFromCart: async () => { },
    clearCart: () => { },
    getCartTotal: () => 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const getUser = () => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("user") || "{}");
        }
        return null;
    };

    const getUserId = () => getUser()?._id;

    // FIXED: Track auth state asynchronously instead of executing static check once globally
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchCart();
            } else {
                setCart([]); // Clear state if user signs completely out
            }
        });

        const fetchCart = async () => {
            try {
                // Fall back to target server address safely
                const apiUrl = process.env.NEXT_API_URL || "http://localhost:4000";
                const res = await axios.get(`${apiUrl}/api/cart`);
                if (res.data && res.data.items) {
                    setCart(res.data.items);
                }
            } catch (error) {
                console.log("No existing cart found:", error);
            }
        };

        return () => unsubscribe();
    }, []);

    const addToCart = async (product: any) => {
        const userId = getUserId();
        if (!userId) return;
        try {
            const response = await axios.post(`http://localhost:4000/api/cart/add`, {
                userId: userId,
                product: product,
            });
            console.log(response)
            console.log(product)
            if (response.data && response.data.items) {
                setCart(response.data.items);
            }
        } catch (error) {
            console.log("Error adding to cart:", error);
        }
    };

    const removeFromCart = async (productId: string) => {
        const userId = getUserId();
        if (!userId) return;
        try {
            const response = await axios.post(`${process.env.VITE_API_URL}/api/cart/remove`, {
                userId    :    userId,
                productId  : productId,
            });
            if (response.data && response.data.items) {
                setCart(response.data.items);
            }
        } catch (error) {
            console.log("Error removing from cart:", error);
        }
    };

    const clearCart = () => setCart([]);

    const getCartTotal = (): number => {
        if (!cart || !Array.isArray(cart)) return 0;
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};