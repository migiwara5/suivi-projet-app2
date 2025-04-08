import React from "react";

export default function LandingPage() {
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
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in-down">
          Gagnez en clarté. Simplifiez la gestion de vos tâches.
        </h2>

        <p className="text-xl md:text-2xl text-blue-100 mb-12 animate-fade-in-up delay-200">
          L’outil tout-en-un pour suivre vos projets, collaborer efficacement et rester concentré sur l’essentiel.
        </p>

        <a
          href="/app"
          className="inline-block bg-yellow-400 text-blue-900 text-xl font-bold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-300 transition mb-16 animate-pop"
        >
          Commencer maintenant
        </a>

        <section className="grid md:grid-cols-2 gap-10 text-left bg-white text-gray-900 rounded-2xl p-10 shadow-2xl animate-fade-in">
          <div>
            <h3 className="text-3xl font-bold mb-4">Pourquoi choisir SuiviProjet ?</h3>
            <ul className="space-y-3 text-lg">
              <li><strong>Simplicité :</strong> interface claire, sans surcharge.</li>
              <li><strong>Rapidité :</strong> mettez à jour vos tâches en 2 clics.</li>
              <li><strong>Commentaires :</strong> collaborez efficacement.</li>
              <li><strong>Organisation :</strong> tri automatique par statut et date.</li>
              <li><strong>Accessibilité :</strong> gratuit, accessible partout.</li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/assets/illustration.png"
              alt="Aperçu SuiviProjet"
              className="rounded-xl shadow-lg max-h-80"
            />
          </div>
        </section>

        <p className="mt-16 text-blue-200 italic text-lg animate-fade-in-up delay-700">
          Vous avez des projets. Nous avons l’outil pour les réaliser.
        </p>
      </main>

      <footer className="text-center py-10 text-blue-200 text-sm">
        &copy; {new Date().getFullYear()} SuiviProjet. Créé avec passion pour les créateurs de demain.
      </footer>

      <style>
        {`
          .animate-fade-in { animation: fadeIn 1s ease-out both; }
          .animate-fade-in-up { animation: fadeInUp 1s ease-out both; }
          .animate-fade-in-down { animation: fadeInDown 1s ease-out both; }
          .animate-pop { animation: popIn 0.6s ease-out both; }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
