import React from "react";
import { motion } from "framer-motion";
const logo = "/assets/logo.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shadow-sm bg-white">
        {/* Logo section */}
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-1 rounded-xl shadow-sm">
          <img
            src={logo}
            alt="SuiviProjet Logo"
            className="h-8 w-auto max-w-[100px] object-contain"
          />
          <span className="text-sm font-medium text-gray-700">
            The everything app, for work.
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
            Contactez-nous
          </button>
          <div className="flex border border-gray-300 rounded-xl overflow-hidden">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
              Log In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-fuchsia-500 hover:opacity-90 transition">
              Sign Up
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
