import React from "react";
import { Link } from "react-router-dom";

const features = [
  { icon: "⚡", title: "Fast Shipping", sub: "Free delivery on orders over $50." },
  { icon: "🔒", title: "Secure Checkout", sub: "Your data is always protected." },
  { icon: "♻️", title: "Easy Returns", sub: "30-day hassle-free returns." },
  { icon: "🎁", title: "Loyalty Rewards", sub: "Earn points on every purchase." },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#0a0a0a]">

        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[320px] bg-[radial-gradient(ellipse_at_top,rgba(201,185,108,0.07),transparent_70%)] pointer-events-none" />

        {/* Animated badge */}
        <div className="inline-flex items-center gap-2 border border-[#3a3a2e] bg-[#141410] px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9b96c] animate-pulse" />
          <p className="uppercase tracking-[5px] text-[#c9b96c] text-[11px] font-medium">
            New Arrivals · Summer 2025
          </p>
        </div>

        {/* Headline */}
        <h1
          className="font-bold leading-[1.05] tracking-[-1.5px] mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 7vw, 80px)" }}
        >
          <span className="text-[#f0ede6]">Shop </span>
          <em className="text-[#c9b96c] italic">Without</em>
          <br />
          <span className="text-[#f0ede6]">Limits.</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-[480px] text-[#7a7870] text-[16px] leading-[1.8] font-light mb-10">
          Thousands of curated products — from electronics to fashion —
          made for the modern buyer. Quality you trust, prices you'll love.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/shop"
            className="bg-[#c9b96c] hover:bg-[#d9cb88] text-black text-[13px] font-medium uppercase tracking-widest px-8 py-3.5 rounded transition-colors duration-200"
          >
            Browse Products →
          </Link>
          <Link
            to="/contact"
            className="border border-[#2a2a2a] hover:border-[#4a4a4a] hover:text-[#c9b96c] text-[#9a9690] text-[13px] px-8 py-3.5 rounded transition-all duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="border-t border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#1a1a1a]">
          {features.map((feature) => (
            <div key={feature.title} className="p-8 md:p-10 text-left">
              <div className="w-10 h-10 flex items-center justify-center bg-[#141410] border border-[#2a2a24] rounded-lg mb-5 text-lg">
                {feature.icon}
              </div>
              <h3 className="text-[14px] font-medium text-[#e0ddd6] mb-2 tracking-[0.2px]">
                {feature.title}
              </h3>
              <p className="text-[13px] text-[#9a9890] leading-[1.7] font-light">
                {feature.sub}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}