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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '', status: 'À faire' });
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTab, setActiveTab] = useState('Accueil');

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
    const { data, error } = await supabase.from('tasks').select('*').eq('user_id', session.user.id);
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate ? task.due_date === filterDate : true;
    return matchesSearch && matchesDate;
  });

  const renderNavbar = () => (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shadow-sm bg-white mb-4">
      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold px-4 py-1 rounded-xl shadow-sm max-w-fit">
        Project Simple
      </div>
      <div className="flex gap-2">
        <input
          className="border border-gray-300 rounded-md px-3 py-2"
          placeholder="Rechercher une tâche"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 rounded-md px-3 py-2"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button
          className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          onClick={() => {
            setSearchTerm('');
            setFilterDate('');
          }}
        >
          Réinitialiser
        </button>
      </div>
    </nav>
  );

  if (session === undefined) return <div className="text-center py-10">Chargement...</div>;
  if (!session) return <div className="text-center py-10">Non connecté</div>;

  return (
    <div className="p-6 font-sans text-gray-900 bg-white min-h-screen">
      {renderNavbar()}
      <h5 className="text-sm text-gray-500 mb-3">Connecté en tant que {session.user.email}</h5>

      <div className="flex gap-4 mb-4">
        {['Accueil', 'À faire', 'En cours', 'Terminé'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${activeTab === tab ? 'bg-purple-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex justify-end mb-3">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow"
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
        >
          + Nouvelle tâche
        </button>
      </div>

     {activeTab === 'Accueil' ? (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {['À faire', 'En cours', 'Terminé'].map(status => (
      <div key={status} className="bg-gray-50 border rounded-lg shadow-sm p-4">
        <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">{status}</h4>
        <ul className="space-y-2">
          {filteredTasks.filter(t => t.status === status).map(task => (
            <li key={task.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow hover:bg-gray-100 transition">
              <span className="font-medium text-sm text-gray-800">{task.title}</span>
              <button
                className="text-blue-600 text-xs hover:underline"
                onClick={() => { setSelectedTask(task); fetchComments(task.id); }}
              >Détail</button>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
) : (
  <div className="overflow-auto">
    <table className="min-w-full bg-white shadow rounded-lg">
      <thead>
        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
          <th className="py-3 px-4">Titre</th>
          <th className="py-3 px-4">Description</th>
          <th className="py-3 px-4">Date</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredTasks.filter(t => t.status === activeTab).map(task => (
          <tr key={task.id} className="hover:bg-gray-50 transition">
            <td className="py-2 px-4">{task.title}</td>
            <td className="py-2 px-4">{task.description}</td>
            <td className="py-2 px-4">{task.due_date}</td>
            <td className="py-2 px-4">
              <div className="flex gap-2">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => { setSelectedTask(task); fetchComments(task.id); }}
                >Détails</button>
                <button
                  className="text-yellow-600 hover:underline text-sm"
                  onClick={() => handleEditTask(task)}
                >Modifier</button>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => handleDeleteTask(task.id)}
                >Supprimer</button>
                {task.status !== 'Terminé' && (
                  <button
                    className="text-green-600 hover:underline text-sm"
                    onClick={() => handleUpdateStatus(task)}
                  >Suivant</button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      {/* Modal Ajouter Tâche */}
      <div className="modal fade" id="addTaskModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nouvelle tâche</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input placeholder="Titre" className="form-control mb-2" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
              <textarea placeholder="Description" className="form-control mb-2" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
              <input type="date" className="form-control mb-2" value={newTask.due_date} onChange={e => setNewTask({ ...newTask, due_date: e.target.value })} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button className="btn btn-primary" onClick={handleAddTask} data-bs-dismiss="modal">Ajouter</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Modifier Tâche */}
      <div className="modal fade" id="editTaskModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modifier la tâche</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                placeholder="Titre"
                className="form-control mb-2"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="form-control mb-2"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <input
                type="date"
                className="form-control mb-2"
                value={newTask.due_date}
                onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button className="btn btn-primary" onClick={handleUpdateTask} data-bs-dismiss="modal">Enregistrer</button>
            </div>
          </div>
        </div>
      </div>


      {/* Modal Détail */}
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
