import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { formatCurrency } from "../utils/FormatCurrency";

const Field = ({ label, ...props }) => (
  <div>
    <label className="block text-[11px] text-[#7a7870] mb-1.5 uppercase tracking-[1px]">
      {label}
    </label>
    <input
      className="w-full bg-[#141410] border border-[#1e1e1a] rounded-[4px] px-3 py-2.5 text-[13px] text-[#e0ddd6] placeholder-[#2a2a28] outline-none focus:border-[#3a3a2e] transition-colors duration-200"
      {...props}
    />
  </div>
);

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(
    () => `SZ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  );

  const handlePlace = () => {
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 flex items-center justify-center bg-[#141410] border border-[#2a4a2a] rounded-xl mx-auto mb-6 text-[#6a9e6a]">
          <FiShoppingBag size={24} />
        </div>
        <h2
          className="text-[36px] text-[#f0ede6] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Order Placed!
        </h2>
        <p className="text-[13px] text-[#9a9690] font-light mb-2">
          Order ID:{" "}
          <span className="text-[#c9b96c] font-medium">{orderId}</span>
        </p>
        <p className="text-[13px] text-[#9a9690] font-light mb-10">
          Thanks, {user?.name}! Your order arrives within 3–5 business days.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-[#c9b96c] hover:bg-[#d9cb88] text-[#0a0a0a] text-[12px] font-medium uppercase tracking-[1.5px] px-8 py-3 rounded-[4px] transition-colors duration-200"
        >
          Continue Shopping →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1
        className="text-[36px] md:text-[48px] text-[#f0ede6] mb-10"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Checkout
      </h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">

        {/* Left — Forms */}
        <div className="flex flex-col gap-4">

          {/* Shipping */}
          <div className="bg-[#0e0e0d] border border-[#1e1e1a] rounded-[10px] p-6">
            <h3 className="text-[10px] uppercase tracking-[4px] text-[#7a7870] font-medium mb-6">
              Shipping Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Field label="First Name" defaultValue={user?.name || ""} />
              <Field label="Last Name" />
            </div>
            <div className="flex flex-col gap-4">
              <Field label="Email" defaultValue={user?.email || ""} />
              <Field label="Address" placeholder="123 Main St" />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Field label="City" />
              <Field label="ZIP Code" />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-[#0e0e0d] border border-[#1e1e1a] rounded-[10px] p-6">
            <h3 className="text-[10px] uppercase tracking-[4px] text-[#7a7870] font-medium mb-6">
              Payment Details
            </h3>
            <div className="flex flex-col gap-4">
              <Field label="Card Number" placeholder="4242 4242 4242 4242" maxLength={19} />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Field label="Expiry" placeholder="MM / YY" />
              <Field label="CVV" type="password" maxLength={3} placeholder="•••" />
            </div>
          </div>
        </div>

        {/* Right — Summary */}
        <div className="bg-[#0e0e0d] border border-[#1e1e1a] rounded-[10px] p-6 h-fit lg:sticky lg:top-24">
          <h3 className="text-[10px] uppercase tracking-[4px] text-[#7a7870] font-medium mb-5">
            Order Summary
          </h3>

          <div className="flex flex-col gap-3 mb-5">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <span className="text-[12px] text-[#9a9690] font-light leading-[1.5] max-w-[200px]">
                  {item.title} × {item.qty}
                </span>
                <span className="text-[12px] text-[#7a7870] whitespace-nowrap">
                  {formatCurrency(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t border-[#1e1e1a] pt-4 mb-5">
            <span className="text-[12px] text-[#9a9890]">Total</span>
            <span
              className="text-[22px] font-bold text-[#c9b96c]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {formatCurrency(cartTotal)}
            </span>
          </div>

          <button
            onClick={handlePlace}
            className="w-full bg-[#c9b96c] hover:bg-[#d9cb88] text-[#0a0a0a] text-[12px] font-medium uppercase tracking-[1.5px] py-3.5 rounded-[4px] transition-colors duration-200"
          >
            Place Order →
          </button>

          <p className="text-center text-[11px] text-[#6a6860] mt-3 tracking-[0.3px]">
            Demo only — no real payment processed.
          </p>
        </div>
      </div>
    </div>
  );
}