import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiCheck, FiArrowLeft } from "react-icons/fi";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/FormatCurrency";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setActiveImg(0);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-10 h-10 border border-[#2a2a24] border-t-[#c9b96c] rounded-full animate-spin" />
        <p className="text-[13px] text-[#7a7870] font-light tracking-[2px] uppercase">
          Loading...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center py-32">
        <p className="text-[13px] text-[#a05050]">Product not found.</p>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [product.thumbnail];

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-[12px] text-[#7a7870] hover:text-[#c9b96c] transition-colors duration-200 uppercase tracking-[2px]"
      >
        <FiArrowLeft size={13} /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-14">

        {/* Images */}
        <div>
          <div className="bg-[#f8f8f6] rounded-[10px] flex justify-center items-center min-h-[420px] p-10">
            <img
              src={images[activeImg]}
              alt={product.title}
              className="max-h-[380px] object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2.5 flex-wrap mt-4">
              {images.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImg(index)}
                  className={`bg-[#f8f8f6] rounded-[6px] p-1.5 border transition-colors duration-200 ${
                    activeImg === index
                      ? "border-[#c9b96c]"
                      : "border-transparent hover:border-[#2a2a24]"
                  }`}
                >
                  <img src={src} alt="" className="w-14 h-14 object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-[10px] uppercase tracking-[4px] text-[#c9b96c] font-medium mb-3">
            {product.category}
          </p>

          <h1
            className="text-[36px] md:text-[44px] text-[#f0ede6] leading-[1.1] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {product.title}
          </h1>

          <p className="text-[13px] text-[#9a9690] font-light mb-5">
            By{" "}
            <span className="text-[#9a9690] font-normal">
              {product.brand || "ShopZone Brand"}
            </span>
          </p>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-[#1e1e1a] text-[10px] text-[#9a9690] tracking-[0.5px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-[13px] text-[#9a9690] leading-[1.8] font-light mb-8">
            {product.description}
          </p>

          {/* Price */}
          <div
            className="text-[42px] text-[#c9b96c] font-bold mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {formatCurrency(product.price)}
          </div>

          {product.discountPercentage > 0 && (
            <p className="text-[12px] text-[#4a7a5a] mb-2">
              Save {product.discountPercentage.toFixed(1)}% today
            </p>
          )}

          <p className="text-[12px] text-[#7a7870] mb-8 tracking-[0.3px]">
            {product.stock} units available
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleAdd}
              disabled={added}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-[4px] text-[12px] font-medium uppercase tracking-[1.5px] transition-all duration-300 ${
                added
                  ? "bg-[#1a3a1a] text-[#6a9e6a] border border-[#2a4a2a]"
                  : "bg-[#c9b96c] hover:bg-[#d9cb88] text-[#0a0a0a]"
              }`}
            >
              {added ? <FiCheck size={14} /> : <FiShoppingCart size={14} />}
              {added ? "Added to Cart" : "Add to Cart"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="w-full py-3.5 rounded-[4px] border border-[#1e1e1e] hover:border-[#3a3835] text-[#9a9690] hover:text-[#7a7870] text-[12px] uppercase tracking-[1.5px] transition-all duration-200"
            >
              View Cart
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-10">
            {[
              { val: product.rating || "4.8", lbl: "Rating" },
              { val: "Free", lbl: "Shipping" },
              { val: "30 Days", lbl: "Returns" },
            ].map(({ val, lbl }) => (
              <div
                key={lbl}
                className="bg-[#0e0e0d] border border-[#1a1a1a] rounded-[8px] p-4 text-center"
              >
                <p className="text-[14px] font-medium text-[#e0ddd6] mb-1">{val}</p>
                <p className="text-[10px] text-[#7a7870] uppercase tracking-[1px]">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}