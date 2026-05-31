import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiStar, FiCheck } from "react-icons/fi";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-[#111110] border border-[#1e1e1e] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2a2a24]"
    >
      {/* Image */}
      <div className="h-52 bg-[#f8f8f6] flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2.5">
        <span className="text-[10px] uppercase tracking-[4px] text-[#c9b96c] font-medium">
          {product.category}
        </span>

        <h3 className="text-[13px] text-[#e0ddd6] font-normal leading-[1.55] line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        <div className="flex items-center gap-1.5 text-[#c9b96c]">
          <FiStar size={12} />
          <span className="text-[12px] text-[#7a7870]">
            {Number(product.rating).toFixed(1)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#1a1a1a] px-4 py-3 flex items-center justify-between">
        <span
          className="text-[18px] font-medium text-[#c9b96c]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {formatCurrency(product.price)}
        </span>

        <button
          onClick={handleAdd}
          className={`flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.5px] px-4 py-2 rounded-[4px] transition-all duration-300 ${
            added
              ? "bg-[#1a3a1a] text-[#6a9e6a] border border-[#2a4a2a]"
              : "bg-[#c9b96c] text-[#0a0a0a] hover:bg-[#d9cb88]"
          }`}
        >
          {added ? <FiCheck size={13} /> : <FiShoppingCart size={13} />}
          {added ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
}