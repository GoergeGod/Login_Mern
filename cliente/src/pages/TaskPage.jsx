import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskPage = () => {
  const { getTasks, tasks, deleteTask, updateTask } = useTasks();
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', id: null });

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleDelete = async (id) => {
    await deleteTask(id);
    getTasks(); 
  };

  const handleEdit = (task) => {
    setCurrentTask({ title: task.title, description: task.description, id: task._id });
    setEditMode(true);
  };

  const handleUpdate = async () => {
    const { id, title, description } = currentTask;

    if (!id) {
      console.error("ID de tarea no válido");
      return;
    }

    await updateTask(id, { title, description });
    resetEditMode();
    getTasks(); 
  };

  const resetEditMode = () => {
    setEditMode(false);
    setCurrentTask({ title: '', description: '', id: null });
  };

  return (
    <div>
      <h1>{editMode ? 'Editar Tarea' : 'Lista de Tareas'}</h1>
      {editMode ? (
        <div>
          <input
            type="text"
            value={currentTask.title}
            onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
            placeholder="Título"
            className="w-[25rem] px-4 py-2 my-4 text-white rounded-md bg-zinc-700"
          />
          <br />
          <input
            type="text"
            value={currentTask.description}
            onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
            placeholder="Descripción"
            className="w-[25rem] px-4 py-2 my-4 text-white rounded-md bg-zinc-700"
          />
          <br />
          <button onClick={handleUpdate}>Actualizar</button>
          <button onClick={resetEditMode}>Cancelar</button>
        </div>
      ) : (
        tasks.map(task => (
          <div key={task._id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <button onClick={() => handleDelete(task._id)}>Eliminar</button>
            <button onClick={() => handleEdit(task)}>Editar</button>
            <br />
          </div>
        ))
      )}
    </div>
  );
};

export default TaskPage;
