// src/utils/tasks.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://uhcrmatnvjvoeknfdmat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoY3JtYXRudmp2b2VrbmZkbWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTgxMDUsImV4cCI6MjA1OTE3NDEwNX0.2Wwv3SyqwSIB4DLN0XCvK4yrdbDyACMT1H7jZp51bg0"
);

export async function addTask(task) {
  const { error } = await supabase.from('tasks').insert([task]);
  if (error) throw error;
}

export async function updateStatus(taskId, status) {
  const { error } = await supabase.from('tasks').update({ status }).eq('id', taskId);
  if (error) throw error;
}

export async function deleteTask(taskId) {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) throw error;
}

export async function updateTask(taskId, updates) {
  const { error } = await supabase.from('tasks').update(updates).eq('id', taskId);
  if (error) throw error;
}

export async function addComment({ task_id, user_id, email, content }) {
  const { error } = await supabase.from('comments').insert([
    { task_id, user_id, email, content }
  ]);
  if (error) throw error;
}

export async function getComments(task_id) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('task_id', task_id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
