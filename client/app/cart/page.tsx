'use client';
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from '../../components/firebase';
import { FaBowlFood } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { FaPizzaSlice } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../../context/cartContext";

import axios from "axios";
import { toast } from "react-toastify";
import { reload } from "firebase/auth";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
}

interface AddressState {
  name: string;
  phone: string;
  street: string;
  city: string;
  pincode: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Cart: React.FC = () => {
  const navi = useRouter();

  // Destructuring types inferred directly from CartContext framework layout
  const { cart, addToCart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);

  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [address, setAddress] = useState<AddressState>({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: ""
  });
  const [placing, setPlacing] = useState<boolean>(false);
  const [step, setStep] = useState<string>("address");

  const user = auth.currentUser;
  const userId = auth.currentUser?.uid;

  const removeItemFromCart = (item: any) => {
    reload
    removeFromCart(item)
    toast.info("Removed from cart")
  }
  // Fully Typed Input Change Handler
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isAddressValid = (): boolean => {
    return !!(address.name && address.phone && address.street && address.city && address.pincode);
  };

  const handleAddressConfirm = (): void => {
    if (!isAddressValid()) return;
    setStep("payment");
  };

  const handlePayment = async (): Promise<void> => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    setPlacing(true);

    try {
      const res = await axios.post(`http://localhost:4000/api/orderPayment/create-order`, {
        amount: getCartTotal()
      });

      console.log(res)
      const order = res.data;
      if (!order || !order.amount) {
        alert("Payment initialization failed! Please try again.");
        setPlacing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "PizzaPalace",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response: { razorpay_payment_id: string }) => {
          try {
            await axios.post(`${process.env.NEXT_API_URL}/api/orderpayment/verify-sign`, {
              cart: cart,
              total: getCartTotal(),
              username: auth.currentUser?.displayName,
              userId: userId,
              address: address,
              paymentId: response.razorpay_payment_id
            });
            clearCart();
            setShowAddressModal(false);
            setStep("address");
            navi.push('/order');
          } catch (err) {
            console.error("Order Error:", err);
            alert("Payment done but order failed! Contact support.");
            setPlacing(false);
          }
        },
        prefill: {
          name: address.name,
          contact: address.phone,
        },
        theme: { color: "#ea580c" },
        modal: {
          ondismiss: () => setPlacing(false)
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("Payment init error:", err);
      setPlacing(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black font-sans px-5 pt-6 pb-32 text-gray-400">

      {/* Brand Title Row */}
      <div className="mb-4">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="text-4xl font-black text-white tracking-tight"
        >
          Pizz<span className="text-orange-500">A</span> Pala<span className="text-orange-600">c</span>e
        </motion.span>
      </div>

      {/* Navigation Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          className="px-4 py-1.5 rounded-xl bg-slate-950/50 border border-amber-950/20 text-white text-xs font-semibold tracking-wide hover:border-orange-500/30 transition-all duration-200 active:scale-[0.98]"
          onClick={() => navi.push('/home')}
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold text-white">
          Your <span className="text-orange-500">Cart</span>
        </h1>
      </div>

      {(!cart || cart.length === 0) ? (
        <div className="text-center mt-16 text-gray-500">
          <i className="ti ti-shopping-cart text-5xl block mb-3 text-gray-600" />
          <h2 className="text-xl font-bold text-amber-200 mb-2">Empty cart </h2>
          <button onClick={() => navi.push('/')} className="border-2 border-gray-600 rounded-2xl p-4 text-xl font-bold text-amber-600 mb-2">Get healthy snack <div className="flex flex-row justify-between"> <FaBowlFood /> <IoFastFoodSharp /> <FaPizzaSlice /></div></button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-6">

          {/* Item List Stack */}
          <div className="space-y-3">
            {cart.map((item: CartItem, i: number) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/50 border border-amber-950/10"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-amber-950/20 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                  <p className="text-sm font-bold text-orange-500 mt-0.5">₹{item.price}</p>
                </div>

                {/* Counter Control Grid */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-black border border-amber-950/30 text-white text-base hover:border-orange-500/30 active:scale-95 transition-all"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium text-white min-w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-500 text-black text-base font-bold hover:bg-orange-600 active:scale-95 transition-all"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItemFromCart(item)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-500 text-black text-base font-bold hover:bg-orange-600 active:scale-95 transition-all"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing Aggregation Card */}
          <motion.div
            className="p-5 rounded-2xl bg-slate-950/50 border border-amber-950/10 space-y-3 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between text-xs font-medium">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-white">₹{getCartTotal()}</span>
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-gray-500">Delivery</span>
              <span className="text-emerald-500 font-semibold">Free</span>
            </div>

            <div className="border-t border-amber-950/20 my-2" />

            <div className="flex justify-between items-center pb-3">
              <span className="text-sm font-bold text-white">Total Amount</span>
              <span className="text-lg font-black text-orange-500">₹{getCartTotal()}</span>
            </div>

            <button
              className="w-full py-3 bg-orange-500 text-black font-bold rounded-xl text-sm tracking-wide shadow-lg shadow-orange-500/10 hover:bg-orange-600 active:scale-[0.98] transition-all duration-200"
              onClick={() => { setStep("address"); setShowAddressModal(true); }}
            >
              Proceed to Checkout →
            </button>
          </motion.div>
        </div>
      )
      }

      {/* Checkout Drawer Sheet Container */}
      <AnimatePresence>
        {showAddressModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowAddressModal(false); setStep("address"); setPlacing(false); }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-9998"
            />

            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto bg-slate-950 border-t border-amber-950/40 rounded-t-3xl z-9999 h-[75vh] flex flex-col text-gray-400"
            >
              <div className="flex justify-center py-3 shrink-0">
                <div className="w-10 h-1 rounded-full bg-amber-950/40" />
              </div>

              {/* Progress Stepper System */}
              <div className="flex items-center gap-2 px-5 pb-4 border-b border-amber-950/10 shrink-0">
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide transition-all duration-200 ${step === "address" ? "bg-orange-500 text-black" : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"}`}>
                  <i className={`ti ${step === "address" ? "ti-map-pin" : "ti-check"} text-xs`} />
                  <span>Address</span>
                </div>

                <div className={`flex-1 h-px transition-all duration-300 ${step === "payment" ? "bg-orange-500/50" : "bg-amber-950/20"}`} />

                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide border transition-all duration-200 ${step === "payment" ? "bg-orange-500 text-black border-transparent" : "bg-black text-gray-600 border-amber-950/20"}`}>
                  <i className="ti ti-credit-card text-xs" />
                  <span>Payment</span>
                </div>
              </div>

              {/* Step 1: Delivery Information */}
              {step === "address" && (
                <>
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Delivery <span className="text-orange-500">Address</span>
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">Where should we deliver your gourmet formulations?</p>
                    </div>

                    <div className="space-y-3">
                      <input
                        name="name"
                        placeholder="Full Name"
                        value={address.name}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-amber-950/30 text-white text-sm placeholder-gray-700 outline-none transition-all focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/5"
                      />
                      <input
                        name="phone"
                        placeholder="Phone Number"
                        type="tel"
                        value={address.phone}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-amber-950/30 text-white text-sm placeholder-gray-700 outline-none transition-all focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/5"
                      />
                      <input
                        name="street"
                        placeholder="Street / Flat / Area"
                        value={address.street}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-amber-950/30 text-white text-sm placeholder-gray-700 outline-none transition-all focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/5"
                      />
                      <div className="flex gap-3">
                        <input
                          name="city"
                          placeholder="City"
                          value={address.city}
                          onChange={handleAddressChange}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-amber-950/30 text-white text-sm placeholder-gray-700 outline-none transition-all focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/5"
                        />
                        <input
                          name="pincode"
                          placeholder="Pincode"
                          type="number"
                          value={address.pincode}
                          onChange={handleAddressChange}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-amber-950/30 text-white text-sm placeholder-gray-700 outline-none transition-all focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 border-t border-amber-950/10 bg-slate-950 shrink-0 pb-8">
                    <button
                      onClick={handleAddressConfirm}
                      disabled={!isAddressValid()}
                      className={`w-full py-3 font-bold rounded-xl text-sm tracking-wide transition-all duration-200 ${isAddressValid() ? 'bg-orange-500 text-black active:scale-[0.98] cursor-pointer' : 'bg-neutral-900 text-gray-600 border border-amber-950/20 cursor-not-allowed'}`}
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: Checkout / Payment Summary */}
              {step === "payment" && (
                <>
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Order <span className="text-orange-500">Summary</span>
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">Please review your final placement attributes.</p>
                    </div>

                    <div className="bg-black border border-amber-950/20 rounded-xl p-4 space-y-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Delivering to</span>
                        <button
                          onClick={() => setStep("address")}
                          className="text-xs font-bold text-orange-500 hover:text-orange-400"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-white">{address.name} • {address.phone}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {address.street}, {address.city} - {address.pincode}
                      </p>
                    </div>

                    <div className="bg-black border border-amber-950/20 rounded-xl p-4 space-y-2">
                      {cart.map((item: CartItem, i: number) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <span className="text-gray-300">{item.name} <span className="text-gray-500 font-semibold">x{item.quantity}</span></span>
                          <span className="font-semibold text-orange-500">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="border-t border-amber-950/10 mt-2 pt-2 flex justify-between items-center">
                        <span className="text-sm font-bold text-white">Total</span>
                        <span className="text-base font-black text-orange-500">₹{getCartTotal()}</span>
                      </div>
                    </div>

                    <div className="bg-black border border-amber-950/20 rounded-xl p-4">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-2">Accepted Secure Channels</p>
                      <div className="flex gap-2 flex-wrap">
                        {["UPI", "Cards", "Net Banking", "Wallets"].map((method: string) => (
                          <span key={method} className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-950 text-gray-400 border border-amber-950/30 font-medium">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 border-t border-amber-950/10 bg-slate-950 shrink-0 pb-8">
                    <button
                      onClick={handlePayment}
                      disabled={placing}
                      className={`w-full py-3 flex items-center justify-center gap-2 bg-orange-500 text-black font-black rounded-xl text-sm tracking-wide shadow-lg shadow-orange-500/10 transition-all duration-200 ${placing ? 'opacity-70 cursor-wait' : 'hover:bg-orange-600 active:scale-[0.98]'}`}
                    >
                      <i className="ti ti-lock text-base" />
                      {placing ? "Opening Payment Gateway..." : `Pay ₹${getCartTotal()} via Razorpay`}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div >
  );
};

export default Cart;