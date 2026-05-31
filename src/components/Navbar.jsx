import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `text-[13px] tracking-[0.3px] transition-colors duration-200 ${
      isActive ? "text-[#c9b96c]" : "text-[#7a7870] hover:text-[#c9b96c]"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-[22px] tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-[#f0ede6]">Shop</span>
          <span className="text-[#c9b96c]">Zone</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            aria-label="Cart"
            className="relative w-9 h-9 flex items-center justify-center bg-[#141410] border border-[#2a2a24] rounded-[6px] text-[#c9b96c] hover:border-[#3a3a2e] transition-colors duration-200"
          >
            <FiShoppingCart size={15} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#c9b96c] text-[#0a0a0a] text-[10px] font-medium flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2a3a2a] bg-[#0f1a0f] rounded-[6px] text-[12px] text-[#6a9e6a]">
                <FiUser size={12} />
                {user.name}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1.5 text-[12px] text-[#9a9890] border border-[#2a2a2a] rounded-[6px] hover:border-[#3a3a3a] hover:text-[#9a9690] transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1.5 text-[12px] text-[#9a9690] border border-[#2a2a2a] rounded-[6px] hover:border-[#3a3a3a] hover:text-[#c9b96c] transition-colors duration-200"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#9a9690] hover:text-[#c9b96c] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0c] border-t border-[#1a1a1a]">
          <div className="flex flex-col p-5 gap-1">
            {["/ Home", "/shop Shop", "/contact Contact"].map((item) => {
              const [path, label] = item.split(" ");
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-[6px] text-[13px] transition-colors ${
                      isActive
                        ? "text-[#c9b96c] bg-[#141410]"
                        : "text-[#7a7870] hover:text-[#c9b96c] hover:bg-[#141410]"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              );
            })}

            <button
              onClick={() => { navigate("/cart"); setMenuOpen(false); }}
              className="flex items-center justify-between px-3 py-3 rounded-[6px] text-[13px] text-[#7a7870] hover:text-[#c9b96c] hover:bg-[#141410] transition-colors"
            >
              <span className="flex items-center gap-2">
                <FiShoppingCart size={14} /> Cart
              </span>
              {cartCount > 0 && (
                <span className="bg-[#c9b96c] text-[#0a0a0a] px-2 py-0.5 rounded-full text-[10px] font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="border-t border-[#1a1a1a] mt-2 pt-3">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 text-[12px] text-[#6a9e6a]">
                    <FiUser size={12} /> {user.name}
                  </div>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="w-full text-left px-3 py-3 text-[13px] text-[#9a9890] hover:text-[#9a9690] transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { navigate("/login"); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-3 text-[13px] text-[#9a9690] hover:text-[#c9b96c] transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
