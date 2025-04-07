// src/ProjectApp.jsx

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  addTask,
  updateStatus,
  deleteTask,
  updateTask,
  addComment,
  getComments
} from './utils/tasks';

const supabase = createClient(
  "https://uhcrmatnvjvoeknfdmat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoY3JtYXRudmp2b2VrbmZkbWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTgxMDUsImV4cCI6MjA1OTE3NDEwNX0.2Wwv3SyqwSIB4DLN0XCvK4yrdbDyACMT1H7jZp51bg0"
);

export default function ProjectApp() {
  const [session, setSession] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '', status: 'À faire' });
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchTasks();
  }, [session]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', session.user.id);
    if (error) console.error(error);
    else setTasks(data);
  };

  const fetchComments = async (task_id) => {
    const data = await getComments(task_id);
    setComments(data);
  };

  const handleAddComment = async () => {
    if (!commentContent || !selectedTask) return;
    try {
      await addComment({
        task_id: selectedTask.id,
        user_id: session.user.id,
        email: session.user.email,
        content: commentContent,
      });
      setCommentContent('');
      fetchComments(selectedTask.id);
    } catch (e) {
      alert("Erreur : " + e.message);
    }
  };

  const handleAddTask = async () => {
    try {
      await addTask({ ...newTask, user_id: session.user.id });
      setNewTask({ title: '', description: '', due_date: '', status: 'À faire' });
      fetchTasks();
    } catch (e) {
      alert("Erreur : " + e.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (confirm("Supprimer cette tâche ?")) {
      await deleteTask(taskId);
      fetchTasks();
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description, due_date: task.due_date, status: task.status });
  };

  const handleUpdateTask = async () => {
    await updateTask(editingTask.id, newTask);
    setEditingTask(null);
    setNewTask({ title: '', description: '', due_date: '', status: 'À faire' });
    fetchTasks();
  };

  const handleUpdateStatus = async (task) => {
    const next = task.status === 'À faire' ? 'En cours' : task.status === 'En cours' ? 'Terminé' : 'Terminé';
    await updateStatus(task.id, next);
    fetchTasks();
  };

  if (session === undefined) return <div>Chargement...</div>;
  if (!session) return <div>Non connecté</div>;

  return (
    <div className="container mt-4">
      <h2>Bienvenue, {session.user.email}</h2>
      <div className="mb-3">
        <input placeholder="Titre" className="form-control mb-2" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
        <textarea placeholder="Description" className="form-control mb-2" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
        <input type="date" className="form-control mb-2" value={newTask.due_date} onChange={e => setNewTask({ ...newTask, due_date: e.target.value })} />
        {editingTask ? (
          <button className="btn btn-warning" onClick={handleUpdateTask}>Mettre à jour</button>
        ) : (
          <button className="btn btn-primary" onClick={handleAddTask}>Ajouter</button>
        )}
      </div>

      <div className="row">
        {["À faire", "En cours", "Terminé"].map(status => (
          <div className="col-md-4" key={status}>
            <h4>{status}</h4>
            {tasks.filter(t => t.status === status).map(task => (
              <div key={task.id} className="card mb-2 p-2">
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <small>{task.due_date}</small>
                <div className="d-flex gap-1">
                  <button className="btn btn-sm btn-info" onClick={() => { setSelectedTask(task); fetchComments(task.id); }}>Détails</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEditTask(task)}>Modifier</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTask(task.id)}>Supprimer</button>
                  {task.status !== 'Terminé' && (
                    <button className="btn btn-sm btn-success" onClick={() => handleUpdateStatus(task)}>Passer à l'étape suivante</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Détail : {selectedTask.title}</h5>
                <button className="btn-close" onClick={() => { setSelectedTask(null); setCommentContent(''); setComments([]); }}></button>
              </div>
              <div className="modal-body">
                <p><strong>Description :</strong> {selectedTask.description}</p>
                <p><strong>Statut :</strong> {selectedTask.status}</p>
                <p><strong>Date de livraison :</strong> {selectedTask.due_date}</p>

                <h6>Commentaires :</h6>
                <ul className="list-group mb-2">
                  {comments.map((c, i) => (
                    <li key={i} className="list-group-item">
                      <strong>{c.email}</strong> ({new Date(c.created_at).toLocaleString()}):<br />
                      {c.content}
                    </li>
                  ))}
                </ul>

                <textarea
                  className="form-control mb-2"
                  placeholder="Ajouter un commentaire..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => { setSelectedTask(null); setCommentContent(''); setComments([]); }}>Fermer</button>
                <button className="btn btn-primary" onClick={handleAddComment}>Sauvegarder le commentaire</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
