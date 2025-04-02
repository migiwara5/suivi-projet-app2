// App de suivi de projet (clé en main avec Supabase + Auth + Table + Kanban + Tailwind CSS)

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import './index.css';

const supabase = createClient(
  "https://uhcrmatnvjvoeknfdmat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoY3JtYXRudmp2b2VrbmZkbWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTgxMDUsImV4cCI6MjA1OTE3NDEwNX0.2Wwv3SyqwSIB4DLN0XCvK4yrdbDyACMT1H7jZp51bg0"
);

export default function ProjectApp() {
  const [session, setSession] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '', status: 'À faire' });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  useEffect(() => {
    if (session) fetchTasks();
  }, [session]);

  const fetchTasks = async () => {
    const { data } = await supabase.from('tasks').select('*').order('due_date', { ascending: true });
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask.title) return;
    await supabase.from('tasks').insert([newTask]);
    setNewTask({ title: '', description: '', due_date: '', status: 'À faire' });
    fetchTasks();
  };

  const updateStatus = async (taskId, newStatus) => {
    await supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);
    fetchTasks();
  };

  if (!session) {
    return <AuthForm />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Suivi de projet</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input placeholder="Titre de la tâche" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} className="mb-2" />
          <Textarea placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} className="mb-2" />
          <Input type="date" value={newTask.due_date} onChange={e => setNewTask({ ...newTask, due_date: e.target.value })} className="mb-2" />
          <Button onClick={addTask}>Ajouter</Button>
        </div>

        {["À faire", "En cours", "Terminé"].map(status => (
          <Card key={status}>
            <CardContent>
              <h2 className="font-semibold mb-2">{status}</h2>
              {tasks.filter(t => t.status === status).map(task => (
                <div key={task.id} className="p-2 border mb-2 rounded">
                  <div className="font-semibold">{task.title}</div>
                  <div className="text-sm text-gray-500">{task.description}</div>
                  <div className="text-xs text-gray-400">Pour le {task.due_date}</div>
                  {status !== "Terminé" && (
                    <Button variant="outline" size="sm" className="mt-1" onClick={() => updateStatus(task.id, status === "À faire" ? "En cours" : "Terminé")}>Passer à {status === "À faire" ? "En cours" : "Terminé"}</Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    if (isLogin) {
      await supabase.auth.signInWithPassword({ email, password });
    } else {
      await supabase.auth.signUp({ email, password });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isLogin ? 'Connexion' : 'Inscription'}</h2>
      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-2" />
      <Input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="mb-2" />
      <Button onClick={handleAuth}>{isLogin ? 'Se connecter' : 'Créer un compte'}</Button>
      <div className="mt-2 text-sm text-center">
        {isLogin ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}
        <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 underline">
          {isLogin ? 'Créer un compte' : 'Se connecter'}
        </button>
      </div>
    </div>
  );
}
