import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/FormatCurrency";

export default function Cart() {
  const { items, cartTotal, removeItem, increment, decrement, clearCart } =
    useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1
          className="text-[36px] text-[#f0ede6] mb-16 text-left"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Cart
        </h1>
        <div className="flex flex-col items-center gap-4 py-16">
          <div className="w-16 h-16 flex items-center justify-center bg-[#141410] border border-[#2a2a24] rounded-xl text-[#c9b96c]">
            <FiShoppingCart size={24} />
          </div>
          <p className="text-[14px] text-[#9a9690] font-light">
            Your cart is empty.
          </p>
          <Link
            to="/shop"
            className="text-[13px] text-[#c9b96c] hover:text-[#d9cb88] transition-colors duration-200 uppercase tracking-[2px]"
          >
            Continue Shopping →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1
        className="text-[36px] text-[#f0ede6] mb-10"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Your Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Cart Items Table */}
        <div className="lg:col-span-2 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#1e1e1e]">
                {["Product", "Price", "Qty", "Subtotal", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-3 text-[10px] uppercase tracking-[4px] text-[#7a7870] font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#161614] group"
                >
                  {/* Product */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-12 object-contain bg-[#f8f8f6] rounded-[6px] p-1 flex-shrink-0"
                      />
                      <span className="text-[13px] text-[#e0ddd6] font-normal leading-[1.45] max-w-[180px]">
                        {item.title}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-3 text-[13px] text-[#9a9890]">
                    {formatCurrency(item.price)}
                  </td>

                  {/* Qty */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrement(item.id)}
                        className="w-7 h-7 flex items-center justify-center bg-[#141410] border border-[#2a2a24] rounded-[4px] text-[#9a9690] hover:border-[#c9b96c] hover:text-[#c9b96c] transition-all duration-200 text-[14px]"
                      >
                        −
                      </button>
                      <span className="text-[13px] text-[#e0ddd6] font-medium min-w-[20px] text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        className="w-7 h-7 flex items-center justify-center bg-[#141410] border border-[#2a2a24] rounded-[4px] text-[#9a9690] hover:border-[#c9b96c] hover:text-[#c9b96c] transition-all duration-200 text-[14px]"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Subtotal */}
                  <td className="py-4 px-3 text-[14px] font-medium text-[#c9b96c]">
                    {formatCurrency(item.price * item.qty)}
                  </td>

                  {/* Remove */}
                  <td className="py-4 px-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#2a1a1a] hover:text-[#a05050] transition-colors duration-200 text-[13px] px-2"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="bg-[#0e0e0d] border border-[#1e1e1a] rounded-[10px] p-5 h-fit">
          <h3 className="text-[11px] uppercase tracking-[4px] text-[#7a7870] font-medium mb-5">
            Order Summary
          </h3>

          <div className="flex justify-between mb-3">
            <span className="text-[13px] text-[#9a9890]">Subtotal</span>
            <span className="text-[13px] text-[#7a7870]">
              {formatCurrency(cartTotal)}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="text-[13px] text-[#9a9890]">Shipping</span>
            <span className="text-[13px] text-[#4a7a5a]">Free</span>
          </div>

          <div className="flex justify-between border-t border-[#1e1e1a] pt-4 mt-4">
            <span className="text-[13px] text-[#7a7870]">Total</span>
            <span className="text-[20px] font-medium text-[#c9b96c]">
              {formatCurrency(cartTotal)}
            </span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-5 bg-[#c9b96c] hover:bg-[#d9cb88] text-[#0a0a0a] text-[12px] font-medium uppercase tracking-[1px] py-3 rounded-[4px] transition-colors duration-200"
          >
            Proceed to Checkout →
          </button>

          <button
            onClick={clearCart}
            className="w-full mt-2 bg-transparent border border-[#1e1e1e] hover:border-[#3a3835] text-[#7a7870] hover:text-[#9a9890] text-[12px] py-3 rounded-[4px] transition-all duration-200"
          >
            Clear Cart
          </button>
        </div>

      </div>
    </div>
  );
}