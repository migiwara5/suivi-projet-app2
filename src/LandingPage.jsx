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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white font-sans">
      <header className="flex items-center justify-between px-8 py-6 shadow-md bg-opacity-80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="SuiviProjet Logo" className="w-10 h-10 rounded-xl" />
          <h1 className="text-xl font-bold tracking-wide">SuiviProjet</h1>
        </div>
        <a
          href="/app"
          className="bg-white text-blue-900 px-5 py-2 rounded-full font-semibold hover:bg-blue-200 transition"
        >
          Accéder à l'app
        </a>
      </header>

      <main className="px-8 py-20 text-center max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Gagnez en clarté. Simplifiez la gestion de vos tâches.
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-blue-100 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          L’outil tout-en-un pour suivre l’avancement de vos projets, collaborer efficacement et rester concentré sur l’essentiel.
        </motion.p>

        <motion.a
          href="/app"
          className="inline-block bg-yellow-400 text-blue-900 text-xl font-bold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-300 transition mb-16"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Commencer maintenant
        </motion.a>

        <motion.section
          className="grid md:grid-cols-2 gap-10 text-left bg-white text-gray-900 rounded-2xl p-10 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div>
            <h3 className="text-3xl font-bold mb-4">Pourquoi choisir SuiviProjet ?</h3>
            <ul className="space-y-3 text-lg">
              <li><strong>Simplicité :</strong> une interface claire, sans surcharge.</li>
              <li><strong>Rapidité :</strong> visualisez et mettez à jour vos tâches en quelques clics.</li>
              <li><strong>Commentaires :</strong> collaborez facilement sur chaque tâche.</li>
              <li><strong>Organisation :</strong> tout est trié par statut et échéance.</li>
              <li><strong>Accessibilité :</strong> gratuit, en ligne et disponible partout.</li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/assets/illustration.png"
              alt="Capture d'écran SuiviProjet"
              className="rounded-xl shadow-lg max-h-80"
            />
          </div>
        </motion.section>

        <motion.section
          className="mt-20 bg-indigo-900 bg-opacity-50 rounded-xl py-10 px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h4 className="text-2xl font-bold mb-6">Ce qu’en disent nos utilisateurs :</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white text-gray-900 rounded-lg p-4 shadow-md text-left"
              >
                <p className="italic">“{r.review}”</p>
                <p className="mt-2 text-right font-semibold">– {r.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.p
          className="mt-16 text-blue-200 italic text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Vous avez des projets, nous avons l’outil pour les réaliser.
        </motion.p>
      </main>

      <footer className="text-center py-10 text-blue-200 text-sm">
        &copy; {new Date().getFullYear()} SuiviProjet. Créé avec passion pour les créateurs de demain.
      </footer>
    </div>
  );
}
