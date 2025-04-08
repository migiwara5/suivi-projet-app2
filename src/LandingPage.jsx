import React from "react";
import { motion } from "framer-motion";
const logo = "/assets/logo.png";

export default function LandingPage() {
  const reviews = [
    {
      name: "Alice",
      review:
        "SuiviProjet a transformé ma façon de gérer les tâches. Simple, rapide, efficace !",
    },
    {
      name: "Jean",
      review:
        "Une interface claire et un vrai gain de temps pour mon équipe !",
    },
    {
      name: "Leila",
      review:
        "Enfin un outil de gestion sans prise de tête. Je recommande vivement !",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans overflow-x-hidden">
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-gray-800">
        <div className="flex items-center space-x-2 bg-gray-700 px-4 py-1 rounded-xl">
          <img src={logo} alt="SuiviProjet Logo" className="w-6 h-6" />
          <span className="font-bold text-white text-lg">SuiviProjet</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-gray-300 hover:underline">S'abonner</a>
          <a href="/app" className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition">Log In / Sign Up</a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6 text-white">
              La plateforme la plus simple du marché
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Gérez vos projets et vos tâches facilement, sans courbe d'apprentissage. Tout ce qu'il vous faut, rien de superflu.
            </p>
            <div className="flex gap-4">
              <a
                href="/app"
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600"
              >
                Commencer maintenant
              </a>
              <a
                href="#"
                className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white"
              >
                Demander une démo
              </a>
            </div>
          </div>
          <motion.div
            className="h-96 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-400 to-blue-400 shadow-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.section>

        <motion.section
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h4 className="text-3xl font-bold text-center mb-12 text-white">
            Ce que nos utilisateurs disent
          </h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <p className="italic mb-3 text-gray-300">“{r.review}”</p>
                <p className="text-right font-semibold text-sm text-blue-400">&ndash; {r.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.p
          className="mt-20 text-center text-gray-400 text-base italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Lancez-vous en quelques secondes. Aucun apprentissage nécessaire.
        </motion.p>
      </main>

      <footer className="mt-24 py-10 text-center text-sm text-gray-500 border-t border-gray-700">
        &copy; {new Date().getFullYear()} SuiviProjet. Tous droits réservés.
      </footer>
    </div>
  );
}
