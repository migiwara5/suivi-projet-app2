// src/utils/tasks.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://uhcrmatnvjvoeknfdmat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoY3JtYXRudmp2b2VrbmZkbWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTgxMDUsImV4cCI6MjA1OTE3NDEwNX0.2Wwv3SyqwSIB4DLN0XCvK4yrdbDyACMT1H7jZp51bg0"
);

// ✅ Ajouter une tâche
export async function addTask(task, userId) {
  const taskToInsert = { ...task, user_id: userId };
  const { data, error } = await supabase.from('tasks').insert([taskToInsert]).select();

  if (error) throw error;
  return data?.[0];
}

// ✅ Mettre à jour le statut
export async function updateStatus(taskId, newStatus) {
  const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);
  if (error) throw error;
}

// ✅ Supprimer une tâche
export async function deleteTask(taskId) {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) throw error;
}

// ✅ Modifier une tâche complète
export async function updateTask(taskId, updates) {
  const { error } = await supabase.from('tasks').update(updates).eq('id', taskId);
  if (error) throw error;
}
