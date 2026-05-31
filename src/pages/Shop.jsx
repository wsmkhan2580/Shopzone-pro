import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
      } catch {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-10 h-10 border border-[#2a2a24] border-t-[#c9b96c] rounded-full animate-spin" />
        <p className="text-[13px] text-[#7a7870] font-light tracking-[2px] uppercase">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-32">
        <p className="text-[13px] text-[#a05050]">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-[42px] md:text-[56px] text-[#f0ede6] leading-[1.05] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The <em className="text-[#c9b96c] italic">Shop</em>
        </h1>
        <p className="text-[13px] text-[#9a9690] font-light">
          Browse our full collection of premium products.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#0e0e0d] border border-[#1e1e1a] rounded-[6px] px-4 py-2.5 text-[13px] text-[#e0ddd6] placeholder-[#2a2a28] outline-none focus:border-[#3a3a2e] transition-colors duration-200"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#0e0e0d] border border-[#1e1e1a] rounded-[6px] px-4 py-2.5 text-[13px] text-[#7a7870] outline-none focus:border-[#3a3a2e] transition-colors duration-200"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p className="text-[12px] text-[#7a7870] mb-6 tracking-[0.3px]">
        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="w-14 h-14 flex items-center justify-center bg-[#141410] border border-[#2a2a24] rounded-xl mx-auto mb-5 text-[#c9b96c] text-xl">
            ?
          </div>
          <h3
            className="text-[20px] text-[#e0ddd6] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            No Products Found
          </h3>
          <p className="text-[13px] text-[#9a9690] font-light">
            Try searching with a different keyword or category.
          </p>
        </div>
      )}
    </div>
  );
}