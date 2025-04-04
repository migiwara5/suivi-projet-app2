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

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function ProjectApp() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '1rem' }}>
        <Link to="/todo" style={{ marginRight: '1rem' }}>📋 Tâches à faire</Link>
        <Link to="/in-progress" style={{ marginRight: '1rem' }}>🚧 Tâches en cours</Link>
        <Link to="/done">✅ Tâches terminées</Link>
      </nav>
      <Routes>
        <Route path="/todo" element={<TaskTable status="À faire" />} />
        <Route path="/in-progress" element={<TaskTable status="En cours" />} />
        <Route path="/done" element={<TaskTable status="Terminé" />} />
      </Routes>
    </Router>
  );
}

function TaskTable({ status }) {
  const [session, setSession] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', due_date: '', status: status });

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
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('status', status)
      .order('due_date', { ascending: true });

    if (!error) setTasks(data);
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer cette tâche ?")) {
      await deleteTask(id);
      fetchTasks();
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateStatus(id, newStatus);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setForm({ title: task.title, description: task.description, due_date: task.due_date, status: task.status });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    if (!form.title || !form.due_date) return alert("Titre et date requis");
    await updateTask(editingTask.id, form);
    setEditingTask(null);
    fetchTasks();
  };

  if (session === undefined) return <div>Chargement...</div>;
  if (!session) return <div>Non connecté</div>;

  return (
    <div className="container">
      <h2>{status}</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date de livraison</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.due_date}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleStatusChange(task.id, getNextStatus(task.status))}>Changer statut</button>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(task)}>Modifier</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTask && (
        <div className="card p-3 mb-3">
          <h5>Modifier la tâche</h5>
          <input name="title" className="form-control mb-2" placeholder="Titre" value={form.title} onChange={handleFormChange} />
          <textarea name="description" className="form-control mb-2" placeholder="Description" value={form.description} onChange={handleFormChange} />
          <input type="date" name="due_date" className="form-control mb-2" value={form.due_date} onChange={handleFormChange} />
          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={handleFormSubmit}>Enregistrer</button>
            <button className="btn btn-secondary" onClick={() => setEditingTask(null)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}

function getNextStatus(current) {
  if (current === "À faire") return "En cours";
  if (current === "En cours") return "Terminé";
  return "À faire";
}
