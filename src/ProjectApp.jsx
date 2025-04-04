// ProjectApp.jsx — composant principal de l'application

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  addTask,
  updateStatus,
  deleteTask,
  updateTask,
} from './utils/tasks';

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
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '', status: 'À faire' });
  const [editingTask, setEditingTask] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getCurrentSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
    };

    getCurrentSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if (session) fetchTasks();
  }, [session]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', session.user.id)
      .order('due_date', { ascending: true });

    if (error) console.error("Erreur lors du chargement des tâches:", error);
    else setTasks(data);
  };

  const handleAdd = async () => {
    const result = await addTask(supabase, session, newTask);
    if (result.success) {
      setNewTask({ title: '', description: '', due_date: '', status: 'À faire' });
      setFeedback('Tâche ajoutée avec succès ✔️');
      setShowModal(false);
      fetchTasks();
    } else {
      alert(result.message);
    }
  };

  const handleUpdate = async () => {
    const result = await updateTask(supabase, editingTask, newTask);
    if (result.success) {
      setEditingTask(null);
      setNewTask({ title: '', description: '', due_date: '', status: 'À faire' });
      setFeedback('Tâche modifiée ✏️');
      setShowModal(false);
      fetchTasks();
    } else {
      alert(result.message);
    }
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    await updateStatus(supabase, taskId, newStatus);
    setFeedback('Statut mis à jour ✅');
    fetchTasks();
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Confirmer la suppression de cette tâche ?")) {
      await deleteTask(supabase, taskId);
      setFeedback('Tâche supprimée 🗑️');
      fetchTasks();
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description, due_date: task.due_date, status: task.status });
    setShowModal(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (session === undefined) return <div className="text-center p-4">Chargement...</div>;
  if (!session) return <AuthForm supabase={supabase} />;

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light mb-4 justify-content-between">
        <span className="navbar-brand">Suivi de projet</span>
        <span className="text-muted small">Connecté en tant que : {session.user.email}</span>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Se déconnecter</button>
      </nav>

      {feedback && <div className="alert alert-info text-center py-2">{feedback}</div>}

      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={() => { setShowModal(true); setEditingTask(null); }}>+ Ajouter une tâche</button>
      </div>

      <div className="row">
        {['À faire', 'En cours', 'Terminé'].map(status => (
          <div className="col-md-4 mb-4" key={status}>
            <div className="card">
              <div className="card-header fw-bold">{status}</div>
              <div className="card-body">
                {Array.isArray(tasks) && tasks.filter(t => t.status === status).map(task => (
                  <div key={task.id} className="border rounded p-2 mb-2">
                    <strong>{task.title}</strong>
                    <p className="mb-1 small text-muted">{task.description}</p>
                    <p className="mb-1 text-secondary small">Pour le {task.due_date}</p>
                    <div className="d-flex justify-content-between">
                      {status !== 'Terminé' && (
                        <button className="btn btn-sm btn-outline-success" onClick={() => handleStatusUpdate(task.id, status === 'À faire' ? 'En cours' : 'Terminé')}>Passer à {status === 'À faire' ? 'En cours' : 'Terminé'}</button>
                      )}
                      <button className="btn btn-sm btn-outline-primary ms-1" onClick={() => handleEdit(task)}>Modifier</button>
                      <button className="btn btn-sm btn-outline-danger ms-1" onClick={() => handleDelete(task.id)}>Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingTask ? 'Modifier la tâche' : 'Nouvelle tâche'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input className="form-control mb-2" placeholder="Titre" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
                <textarea className="form-control mb-2" placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
                <input type="date" className="form-control mb-2" value={newTask.due_date} onChange={e => setNewTask({ ...newTask, due_date: e.target.value })} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button className="btn btn-primary" onClick={editingTask ? handleUpdate : handleAdd}>{editingTask ? 'Modifier' : 'Ajouter'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AuthForm({ supabase }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const passwordStrength = password.length >= 10 ? 'Fort' : password.length >= 6 ? 'Moyen' : 'Faible';
  const passwordColor = password.length >= 10 ? 'text-success' : password.length >= 6 ? 'text-warning' : 'text-danger';

  const handleAuth = async () => {
    setError('');
    setMessage('');

    if (!email || !password) return setError('Veuillez remplir tous les champs.');
    if (!isLogin && password.length < 10) return setError('Le mot de passe doit contenir au moins 10 caractères.');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError("Email ou mot de passe incorrect");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage("Inscription réussie ! Veuillez vérifier votre email.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <div className="card p-4 shadow">
        <h2 className="mb-3">{isLogin ? 'Connexion' : 'Inscription'}</h2>
        {error && <div className="alert alert-danger py-1">{error}</div>}
        {message && <div className="alert alert-success py-1">{message}</div>}
        <input className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <div className="input-group mb-1">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Cacher' : 'Voir'}
          </button>
        </div>
        <div className={`small ${passwordColor} mb-3`}>Force : {passwordStrength}</div>
        <button className="btn btn-primary w-100 mb-2" onClick={handleAuth}>{isLogin ? 'Se connecter' : 'Créer un compte'}</button>
        <p className="text-center small">
          {isLogin ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}
          <span className="text-primary" role="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Créer un compte' : 'Se connecter'}
          </span>
        </p>
      </div>
    </div>
  );
}
