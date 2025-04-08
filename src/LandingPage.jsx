import React from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <header className="flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-gray-900 shadow-md">
        <h1 className="text-3xl font-bold text-white">SuiviProjet</h1>
        <a
          href="/app"
          className="mt-4 md:mt-0 bg-white text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition"
        >
          Accéder à l'app
        </a>
      </header>

      <main className="px-6 py-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl font-extrabold leading-tight mb-6 text-white">
            La gestion de tâches réinventée.
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Une interface moderne, rapide et intuitive pour gérer vos projets sans effort.
          </p>
          <a
            href="/app"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition"
          >
            Commencer maintenant
          </a>
        </motion.div>

        <motion.section
          className="mt-20 grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div>
            <h3 className="text-3xl font-bold mb-4 text-white">
              Pourquoi choisir SuiviProjet ?
            </h3>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li><strong>Simplicité :</strong> Une interface claire et intuitive.</li>
              <li><strong>Efficacité :</strong> Créez, modifiez, suivez en quelques clics.</li>
              <li><strong>Collaboratif :</strong> Partagez et commentez vos tâches.</li>
              <li><strong>Vue intelligente :</strong> Filtrage par statut, échéance, et plus.</li>
              <li><strong>Accessibilité :</strong> Web, responsive, gratuit.</li>
            </ul>
          </div>
          <motion.div
            className="bg-gray-800 rounded-xl h-56 md:h-64 shadow-inner"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.section>

        <motion.section
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h4 className="text-2xl font-bold text-center mb-10 text-white">
            Ce qu’ils en pensent :
          </h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow hover:shadow-xl transition"
              >
                <p className="italic mb-3 text-gray-300">“{r.review}”</p>
                <p className="text-right font-semibold text-sm text-white">&ndash; {r.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.p
          className="mt-20 text-center text-gray-400 text-base italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Pas besoin de tutoriel. Lancez-vous dès maintenant.
        </motion.p>
      </main>

      <footer className="mt-20 py-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SuiviProjet. Tous droits réservés.
      </footer>
    </div>
  );
}
