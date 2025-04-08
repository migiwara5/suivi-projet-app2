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
    <div className="min-h-screen bg-gray-950 text-white font-sans overflow-x-hidden">
      <header className="flex items-center justify-between px-8 py-5 bg-gray-900 shadow-md">
        <h1 className="text-3xl font-bold text-orange-400 tracking-wide">SuiviProjet</h1>
        <a
          href="/app"
          className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition duration-200"
        >
          Accéder à l'app
        </a>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block bg-gray-800 text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Project Management Software
          </span>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Gérez vos projets de A à Z en toute simplicité
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
            Visualisez, organisez et collaborez avec fluidité. Gagnez du temps, restez concentré sur ce qui compte vraiment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/app"
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600"
            >
              Commencer maintenant
            </a>
            <a
              href="#"
              className="border border-orange-500 text-orange-400 px-6 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white"
            >
              Demander une démo
            </a>
          </div>
        </motion.section>

        <motion.section
          className="mt-32 grid md:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div>
            <h3 className="text-4xl font-bold mb-6 text-white">
              Pourquoi choisir SuiviProjet ?
            </h3>
            <ul className="space-y-5 text-lg text-gray-300">
              <li><strong className="text-white">Simplicité :</strong> interface claire et intuitive</li>
              <li><strong className="text-white">Efficacité :</strong> création, suivi et mise à jour instantanés</li>
              <li><strong className="text-white">Collaboration :</strong> commentaires et partages rapides</li>
              <li><strong className="text-white">Vue intelligente :</strong> filtres par statut, date, priorité</li>
              <li><strong className="text-white">Accessibilité :</strong> application web, responsive, gratuite</li>
            </ul>
          </div>
          <motion.div
            className="rounded-xl h-72 bg-gradient-to-br from-orange-500 to-orange-300 shadow-lg"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.section>

        <motion.section
          className="mt-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h4 className="text-3xl font-bold text-center mb-12 text-white">
            Ce que nos utilisateurs disent
          </h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition"
              >
                <p className="italic mb-3 text-gray-300">“{r.review}”</p>
                <p className="text-right font-semibold text-sm text-orange-400">&ndash; {r.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.p
          className="mt-24 text-center text-gray-400 text-base italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Lancez-vous en quelques secondes. Aucun apprentissage nécessaire.
        </motion.p>
      </main>

      <footer className="mt-24 py-10 text-center text-sm text-gray-500 bg-gray-900 border-t border-gray-800">
        &copy; {new Date().getFullYear()} SuiviProjet. Tous droits réservés.
      </footer>
    </div>
  );
}
