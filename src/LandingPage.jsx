import React from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const reviews = [
    {
      name: "Alice",
      review: "SuiviProjet a transformé ma façon de gérer les tâches. Simple, rapide, efficace !",
    },
    {
      name: "Jean",
      review: "Une interface claire et un vrai gain de temps pour mon équipe !",
    },
    {
      name: "Leila",
      review: "Enfin un outil de gestion sans prise de tête. Je recommande vivement !",
    },
  ];

  return (
    <div className="text-white font-sans">
      {/* HERO SECTION */}
      <section
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center relative"
        style={{ backgroundImage: "url('/assets/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Gérez vos projets. Simplement.
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            L’app de gestion de tâches ultra intuitive, conçue pour les personnes qui veulent aller droit au but.
          </motion.p>
          <motion.a
            href="/app"
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lancer l’application
          </motion.a>
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section className="bg-white text-gray-900 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Pourquoi choisir SuiviProjet ?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-2">Ultra simple</h3>
            <p>Aucune complexité inutile. Vous ajoutez, modifiez et suivez vos tâches en 1 clic.</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-2">100% accessible</h3>
            <p>Gratuit, en ligne, fonctionne sur tous vos appareils sans téléchargement.</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-2">Collaboratif</h3>
            <p>Ajoutez des commentaires, discutez avec votre équipe, restez alignés.</p>
          </div>
        </div>
      </section>

      {/* APERÇU DE L’APP */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Un aperçu de votre futur outil préféré</h2>
        <img
          src="/assets/illustration.png"
          alt="Aperçu SuiviProjet"
          className="rounded-xl shadow-xl max-w-4xl mx-auto"
        />
      </section>

      {/* AVIS */}
      <section className="bg-gray-100 py-16 text-gray-900 px-6">
        <h3 className="text-2xl font-bold mb-8 text-center">Ce qu’en pensent nos utilisateurs :</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-md">
              <p className="italic text-gray-800">“{r.review}”</p>
              <p className="mt-2 text-right font-semibold text-indigo-700">– {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 text-sm">
        &copy; {new Date().getFullYear()} SuiviProjet. Créé avec ❤️ pour les gens efficaces.
      </footer>
    </div>
  );
}
