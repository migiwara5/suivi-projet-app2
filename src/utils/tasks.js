// src/utils/tasks.js

export async function addTask(supabase, session, task) {
  if (!task.title) return { success: false, message: "Titre requis" };
  if (!session?.user?.id) return { success: false, message: "Utilisateur non connecté" };

  const taskToInsert = { ...task, user_id: session.user.id };
  const { data, error } = await supabase.from('tasks').insert([taskToInsert]).select();

  if (error) return { success: false, message: error.message };
  return { success: true, data };
}

export async function updateTask(supabase, taskToEdit, updates) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', taskToEdit.id)
    .select();

  if (error) return { success: false, message: error.message };
  return { success: true, data };
}

export async function deleteTask(supabase, taskId) {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  return !error;
}

export async function updateStatus(supabase, taskId, newStatus) {
  const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);
  return !error;
}
