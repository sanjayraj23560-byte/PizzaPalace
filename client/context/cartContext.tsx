'use client';
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { auth } from "@/components/firebase";
import { User, onAuthStateChanged } from "firebase/auth";

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

export const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: async () => { },
    removeFromCart: async () => { },
    clearCart: () => { },
    getCartTotal: () => 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Keeps track of initial loading state

    // 1. Manage Auth State Subscription Lifecycle
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Stop loading once Firebase resolves the user status
            if (!currentUser) {
                setCart([]); // Clear state if user signs completely out
            }
        });

        return () => unsubscribe(); // Properly clean up the event listener on unmount
    }, []);

    // 2. Fetch Cart Data only when the actual user object shifts into place
    useEffect(() => {
        const fetchCart = async () => {
            if (!user?.uid) return; // Guard clause: Prevent fetching if UID doesn't exist yet

            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
                const res = await axios.get(`${apiUrl}/api/cart/${user.uid}`);
                if (res.data && res.data.items) {
                    setCart(res.data.items);
                }
            } catch (error) {
                console.log("No existing cart found or failed to fetch:", error);
            }
        };

        if (!loading && user) {
            fetchCart();
        }
    }, [user, loading]); // Fires specifically when user shifts from null -> authenticated status

    const addToCart = async (product: any) => {
        if (!user?.uid) {
            console.log("Cannot add to cart: No authenticated user found");
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`, {
                userId: user.uid, // Send the string UID instead of the whole object
                product: product,
                productId: product._id
            });
            console.log(product)
            console.log(response)
            if (response.data && response.data.items) {
                setCart(response.data.items);
            }
        } catch (error) {
            console.log("Error adding to cart:", error);
        }
    };

    const removeFromCart = async (productId: string) => {
        if (!user?.uid) return;
        console.log("Haaa!")
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove`, {
                userId: user.uid, // Send the string UID
                productId: productId
            });
            console.log(response)
            if (response.status === 201) {
                setCart(response.data.items);
            }
        } catch (error) {
            console.log("Error removing from cart:", error);
        }
    };

    const clearCart = () => {
        const res = axios.post(`http://localhost:4000/api/cart/clear`, {
            userID: "Hey there",
            user:user?.uid
        })
        console.log(res)
    }

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

export function useCart() {
    return useContext(CartContext);
}