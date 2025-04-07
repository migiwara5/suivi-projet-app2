// ProjectApp.jsx — composant principal de l'application

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  addTask,
  updateStatus,
  deleteTask,
  updateTask,
} from './utils/tasks';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const supabase = createClient(
  "https://uhcrmatnvjvoeknfdmat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoY3JtYXRudmp2b2VrbmZkbWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTgxMDUsImV4cCI6MjA1OTE3NDEwNX0.2Wwv3SyqwSIB4DLN0XCvK4yrdbDyACMT1H7jZp51bg0",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

export default function ProjectApp() {
  const [session, setSession] = useState(undefined);
  const [form, setForm] = useState({ title: '', description: '', due_date: '', status: 'À faire' });
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    init();
  }, []);

  useEffect(() => {
    if (session) fetchTasks();
  }, [session]);

  const fetchTasks = async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', session.user.id)
      .order('due_date', { ascending: true });

    if (data) setTasks(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    if (!form.title || !form.due_date) return alert("Titre et date requis");
    await addTask({ ...form, user_id: session.user.id });
    setForm({ title: '', description: '', due_date: '', status: 'À faire' });
    setShowModal(false);
    fetchTasks();
  };

  if (session === undefined) return <div>Chargement...</div>;
  if (!session) return <div>Non connecté</div>;

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light mb-4 justify-content-between">
        <span className="navbar-brand">Suivi de projet</span>
        <span className="text-muted small">Connecté en tant que : {session.user.email}</span>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Se déconnecter</button>
      </nav>

      {/* Bouton flottant */}
      <button
        className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4"
        style={{ width: '60px', height: '60px', fontSize: '24px' }}
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {/* Modal d'ajout */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter une tâche</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input name="title" className="form-control mb-2" placeholder="Titre" value={form.title} onChange={handleFormChange} />
                <textarea name="description" className="form-control mb-2" placeholder="Description" value={form.description} onChange={handleFormChange} />
                <input type="date" name="due_date" className="form-control mb-2" value={form.due_date} onChange={handleFormChange} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button className="btn btn-primary" onClick={handleFormSubmit}>Ajouter</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {['À faire', 'En cours', 'Terminé'].map(status => (
          <div className="col-md-4 mb-4" key={status}>
            <div className="card">
              <div className="card-header fw-bold">{status}</div>
              <div className="card-body">
                {tasks.filter(task => task.status === status).map(task => (
                  <div key={task.id} className="border rounded p-2 mb-2">
                    <strong>{task.title}</strong>
                    <p className="mb-1 small text-muted">{task.description}</p>
                    <p className="mb-1 text-secondary small">Pour le {task.due_date}</p>
                    {status !== 'Terminé' && (
                      <button className="btn btn-sm btn-outline-success" onClick={() => {
                        updateStatus(task.id, getNextStatus(task.status));
                        fetchTasks();
                      }}>Passer à {getNextStatus(task.status)}</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getNextStatus(current) {
  if (current === "À faire") return "En cours";
  if (current === "En cours") return "Terminé";
  return "À faire";
}
