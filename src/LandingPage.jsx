import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white font-sans">
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

      <main className="px-8 py-20 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          L'outil de gestion de tâches <span className="text-yellow-400">le plus simple</span> du marché
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-10">
          Suivez vos tâches à faire, en cours ou terminées en un clin d'œil. Simple, rapide et intuitif. Idéal pour les freelances, petites équipes ou particuliers débordés.
        </p>

        <div className="flex justify-center mb-12">
          <a
            href="/app"
            className="bg-yellow-400 text-blue-900 text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition"
          >
            Démarrer maintenant
          </a>
        </div>

        <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Pourquoi choisir SuiviProjet ?</h3>
          <ul className="text-left space-y-3">
            <li><strong>Simplicité :</strong> aucune configuration nécessaire, démarrez immédiatement.</li>
            <li><strong>Visibilité :</strong> une vue claire et triée de vos tâches par statut.</li>
            <li><strong>Collaboratif :</strong> ajoutez des commentaires à chaque tâche.</li>
            <li><strong>Gratuit :</strong> pas d'abonnement ni de publicité cachée.</li>
          </ul>
        </div>

        <p className="mt-10 text-blue-200 italic">
          Gagnez du temps. Concentrez-vous sur l'essentiel. Simplifiez-vous la vie avec SuiviProjet.
        </p>
      </main>

      <footer className="text-center py-8 text-blue-200 text-sm">
        &copy; {new Date().getFullYear()} SuiviProjet. Créé avec passion.
      </footer>
    </div>
  );
}
