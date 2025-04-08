import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [showContact, setShowContact] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shadow-sm bg-white">
        {/* Logo section */}
        <div className="bg-gray-100 px-4 py-1 rounded-xl shadow-sm max-w-fit">
          <span className="text-lg font-semibold text-gray-800">Project Simple</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            onClick={() => setShowContact(true)}
          >
            Contactez-nous
          </button>
          <div className="flex border border-gray-300 rounded-xl overflow-hidden">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              onClick={() => setShowLogin(true)}
            >
              Log In
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-fuchsia-500 hover:opacity-90 transition"
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Contactez-nous</h2>
            <form action="https://formsubmit.co/mathieu.baudesson@gmail.com" method="POST">
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                required
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                className="w-full mb-3 p-2 border rounded"
              />
              <textarea
                name="message"
                placeholder="Votre message"
                required
                className="w-full mb-3 p-2 border rounded"
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowContact(false)} className="text-sm text-gray-500">
                  Annuler
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Connexion</h2>
            <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
            <input type="password" placeholder="Mot de passe" className="w-full mb-3 p-2 border rounded" />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowLogin(false)} className="text-sm text-gray-500">Annuler</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Se connecter</button>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Créer un compte</h2>
            <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
            <input type="password" placeholder="Mot de passe" className="w-full mb-3 p-2 border rounded" />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowSignup(false)} className="text-sm text-gray-500">Annuler</button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded">S'inscrire</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
