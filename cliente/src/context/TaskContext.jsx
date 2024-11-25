import { createContext, useContext, useState } from 'react';
import { createTasksRequest, getTasksRequest, deleteTaskRequest, updateTaskRequest } from '../api/tasks';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }

  return context;
}

// eslint-disable-next-line react/prop-types
export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Obtener tareas
  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Crear tarea
  const createTask = async (task) => {
    try {
      const res = await createTasksRequest(task);
      setTasks([...tasks, res.data]); // Agrega la nueva tarea a la lista
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  // Actualizar tarea
  const updateTask = async (id, updatedTask) => {
    try {
      const res = await updateTaskRequest(id, updatedTask);
      setTasks(tasks.map(task => (task._id === id ? res.data : task))); // Actualiza la tarea en la lista
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  // Eliminar tarea
  const deleteTask = async (id) => {
    try {
      await deleteTaskRequest(id);
      setTasks(tasks.filter(task => task._id !== id)); // Filtra la tarea eliminada
      console.log(`Task with id ${id} deleted`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      createTask,
      getTasks,
      updateTask,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  )
}
