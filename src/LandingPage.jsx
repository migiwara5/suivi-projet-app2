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
    <div className="min-h-screen bg-orange-50 text-gray-900 font-sans overflow-x-hidden">
      <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
        <h1 className="text-3xl font-extrabold text-orange-600">SuiviProjet</h1>
        <a
          href="/app"
          className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Accéder à l'app
        </a>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Project Management Software
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Manage and Execute Your Projects in One Place
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Get both a high-level and granular view of tasks, deadlines, and resources so you can get more done, faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/app"
              className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600"
            >
              Get started free
            </a>
            <a
              href="#"
              className="border border-orange-500 text-orange-600 px-6 py-3 rounded-md font-semibold hover:bg-orange-100"
            >
              Get a demo
            </a>
          </div>
        </motion.section>

        <motion.section
          className="mt-24 grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">
              Why Choose SuiviProjet?
            </h3>
            <ul className="space-y-4 text-gray-700 text-lg">
              <li><strong>Simplicity:</strong> A clear and intuitive interface.</li>
              <li><strong>Efficiency:</strong> Create, edit and track tasks in a few clicks.</li>
              <li><strong>Collaboration:</strong> Share and comment seamlessly.</li>
              <li><strong>Smart Views:</strong> Filter by status, deadline, and more.</li>
              <li><strong>Accessible:</strong> Web-based, responsive, and free.</li>
            </ul>
          </div>
          <motion.div
            className="rounded-lg h-64 bg-orange-200"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.section>

        <motion.section
          className="mt-28"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h4 className="text-2xl font-bold text-center mb-10 text-gray-800">
            What Our Users Say:
          </h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition"
              >
                <p className="italic mb-3 text-gray-700">“{r.review}”</p>
                <p className="text-right font-semibold text-sm text-gray-900">&ndash; {r.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.p
          className="mt-20 text-center text-gray-500 text-base italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          No training needed. Start managing like a pro today.
        </motion.p>
      </main>

      <footer className="mt-24 py-10 text-center text-sm text-gray-400 bg-white border-t">
        &copy; {new Date().getFullYear()} SuiviProjet. All rights reserved.
      </footer>
    </div>
  );
}
