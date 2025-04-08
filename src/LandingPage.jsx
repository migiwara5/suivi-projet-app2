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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 text-white font-sans overflow-x-hidden">
      <header className="flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-blue-950 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-full shadow-lg" />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">SuiviProjet</h1>
        </div>
        <a
          href="/app"
          className="mt-4 md:mt-0 bg-white text-blue-950 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-yellow-300 hover:text-black transition"
        >
          Accéder à l'app
        </a>
      </header>

      <main className="px-6 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Simplifiez votre quotidien professionnel.
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10">
            SuiviProjet vous aide à garder le cap, organiser vos priorités et gagner en productivité.
          </p>
          <a
            href="/app"
            className="bg-yellow-400 text-blue-950 px-10 py-4 rounded-full font-bold shadow-xl hover:bg-yellow-300 hover:scale-105 transition-transform"
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
          <div className="text-left">
            <h3 className="text-3xl font-bold mb-4 text-yellow-300">Pourquoi SuiviProjet ?</h3>
            <ul className="space-y-3 text-lg text-blue-100">
              <li><strong>Simplicité :</strong> interface claire, sans surcharge.</li>
              <li><strong>Rapidité :</strong> gérez vos tâches en quelques clics.</li>
              <li><strong>Collaboratif :</strong> ajoutez des commentaires, suivez le fil.</li>
              <li><strong>Vue par statut :</strong> À faire, en cours, terminé.</li>
              <li><strong>Gratuit :</strong> accessible en ligne, sans frais cachés.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-yellow-300 to-pink-500 rounded-2xl h-60 md:h-72 shadow-2xl" />
        </motion.section>

        <motion.section
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h4 className="text-2xl md:text-3xl font-bold text-center mb-10 text-yellow-300">Ils utilisent SuiviProjet :</h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white text-gray-800 rounded-xl p-6 shadow-xl transform transition hover:scale-105"
              >
                <p className="italic mb-3">“{r.review}”</p>
                <p className="text-right font-semibold text-sm">&ndash; {r.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.p
          className="mt-20 text-center text-blue-100 text-lg italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Créez votre première tâche en moins de 10 secondes.
        </motion.p>
      </main>

      <footer className="mt-20 py-10 text-center text-blue-300 text-sm">
        &copy; {new Date().getFullYear()} SuiviProjet. L’outil simple pour travailler mieux.
      </footer>
    </div>
  );
}
