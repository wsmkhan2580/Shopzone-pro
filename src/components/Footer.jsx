import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-3">
              ShopZone
            </h2>

            <p className="text-gray-400 text-sm leading-6">
              Premium online shopping experience with modern products,
              secure checkout and fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                Home
              </Link>

              <Link
                to="/shop"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                Shop
              </Link>

              <Link
                to="/cart"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                Cart
              </Link>

              <Link
                to="/contact"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Connect
            </h3>

            <div className="flex gap-4 text-xl">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <FiFacebook />
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <FiInstagram />
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <FiTwitter />
              </a>

              <a
                href="https://github.com/wsmkhan2580/ShopZone"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <FiGithub />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ShopZone. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}