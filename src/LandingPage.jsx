import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import screenshot from "../public/assets/app-screenshot.png";

const supabase = createClient(
  "https://uhcrmatnvjvoeknfdmat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoY3JtYXRudmp2b2VrbmZkbWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTgxMDUsImV4cCI6MjA1OTE3NDEwNX0.2Wwv3SyqwSIB4DLN0XCvK4yrdbDyACMT1H7jZp51bg0"
);

export default function LandingPage() {
  const [showContact, setShowContact] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) alert("Erreur de connexion : " + error.message);
    else {
      setShowLogin(false);
      navigate("/app");
    }
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
    });
    if (error) alert("Erreur d'inscription : " + error.message);
    else {
      alert("Compte créé ! Vérifiez votre email.");
      setShowSignup(false);
    }
  };

  const validatePassword = (password) => {
    const length = password.length >= 12;
    const upper = /[A-Z]/.test(password);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const number = /[0-9]/.test(password);
    return { length, upper, special, number };
  };

  const passwordStrength = (password) => {
    const { length, upper, special, number } = validatePassword(password);
    const score = [length, upper, special, number].filter(Boolean).length;
    if (score === 4) return { text: "Fort", color: "bg-green-500" };
    if (score >= 2) return { text: "Moyen", color: "bg-yellow-400" };
    return { text: "Faible", color: "bg-red-500" };
  };

  const passwordCheck = validatePassword(signupPassword);
  const strength = passwordStrength(signupPassword);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shadow-sm bg-white">
        <div className="bg-gray-100 px-4 py-1 rounded-xl shadow-sm max-w-fit">
          <span className="text-lg font-semibold text-gray-800">Project Simple</span>
        </div>

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

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 bg-gradient-to-r from-fuchsia-50 to-blue-50">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">L'outil de suivi de tâches le plus simple du marché</h1>
          <p className="text-lg text-gray-700 mb-6">
            Vous trouvez les outils actuels trop compliqués ? Project Simple est fait pour vous. Minimaliste, intuitif, et efficace, il s'adresse à celles et ceux qui veulent aller à l'essentiel.
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-full shadow hover:bg-purple-700 transition">
            Commencer
          </button>
        </div>
        <div className="md:w-1/2">
          <img src="/assets/app-screenshot.png" alt="Aperçu de l'application" className="rounded-xl shadow-xl w-full" />
        </div>
      </section>

      {/* Modals */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Contactez-nous</h2>
            <form action="https://formsubmit.co/mathieu.baudesson@gmail.com" method="POST">
              <input type="text" name="name" placeholder="Votre nom" required className="w-full mb-3 p-2 border rounded" />
              <input type="email" name="email" placeholder="Votre email" required className="w-full mb-3 p-2 border rounded" />
              <textarea name="message" placeholder="Votre message" required className="w-full mb-3 p-2 border rounded"></textarea>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowContact(false)} className="text-sm text-gray-500">Annuler</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Envoyer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Connexion</h2>
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />
            <input type="password" placeholder="Mot de passe" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowLogin(false)} className="text-sm text-gray-500">Annuler</button>
              <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Se connecter</button>
            </div>
          </div>
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Créer un compte</h2>
            <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />
            <input type="password" placeholder="Mot de passe" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className="w-full mb-1 p-2 border rounded" />
            <div className="h-2 w-full mb-2 rounded bg-gray-200">
              <div className={`h-2 rounded ${strength.color}`} style={{ width: `${(Object.values(passwordCheck).filter(Boolean).length / 4) * 100}%` }}></div>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 mb-3">
              <li className={passwordCheck.length ? "text-green-600" : "text-red-500"}>✔️ 12 caractères minimum</li>
              <li className={passwordCheck.upper ? "text-green-600" : "text-red-500"}>✔️ Une majuscule</li>
              <li className={passwordCheck.special ? "text-green-600" : "text-red-500"}>✔️ Un caractère spécial</li>
              <li className={passwordCheck.number ? "text-green-600" : "text-red-500"}>✔️ Un chiffre</li>
            </ul>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowSignup(false)} className="text-sm text-gray-500">Annuler</button>
              <button onClick={handleSignup} className="bg-purple-600 text-white px-4 py-2 rounded">S'inscrire</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
