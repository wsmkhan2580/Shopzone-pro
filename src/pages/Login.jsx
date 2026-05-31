import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { isLoggedIn, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isLoggedIn) navigate(from, { replace: true });
  }, [isLoggedIn, navigate, from]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] bg-[#0e0e0d] border border-[#1e1e1a] rounded-[10px] p-10 text-center">

        {/* Logo */}
        <h1
          className="text-[28px] mb-1.5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-[#f0ede6]">Shop</span>
          <span className="text-[#c9b96c]">Zone</span>
        </h1>

        <p className="text-[13px] text-[#9a9690] font-light mb-8">
          Sign in to continue shopping
        </p>

        {/* Guest Login Button */}
        <button
          onClick={loginAsGuest}
          className="w-full flex items-center justify-center gap-2 bg-[#c9b96c] hover:bg-[#d9cb88] text-[#0a0a0a] text-[12px] font-medium uppercase tracking-[1.5px] py-3.5 rounded-[4px] transition-colors duration-200 mb-6"
        >
          <FiUser size={14} />
          Login as Guest
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#1a1a1a]" />
          <span className="text-[10px] text-[#6a6860] uppercase tracking-[3px]">
            Demo App
          </span>
          <div className="flex-1 h-px bg-[#1a1a1a]" />
        </div>

        {/* Note */}
        <p className="text-[12px] text-[#7a7870] leading-[1.8] font-light">
          No account required. Click{" "}
          <span className="text-[#7a7870]">"Login as Guest"</span>{" "}
          to instantly access all features including checkout.
        </p>

        {/* Redirect Notice */}
        {from !== "/" && (
          <div className="mt-5 px-4 py-3 bg-[#141410] border border-[#2a2a1e] rounded-[6px] text-[12px] text-[#9a9890] leading-[1.7]">
            Redirected from{" "}
            <span className="text-[#c9b96c]">{from}</span>
            {" "}— you'll be sent back after login.
          </div>
        )}
      </div>
    </div>
  );
}