import {createContext, useContext, useState} from 'react'
import { createTasksRequest, getTasksRequest } from '../api/tasks';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if(!context){
    throw new Error('useTasks must be used within a TasksProvider')
  }

  return context;
}

// eslint-disable-next-line react/prop-types
export function TasksProvider({ children}){
  const [tasks,setTasks] = useState([]);

  const getTasks = async () =>{
    try {
          const res = await getTasksRequest();
          setTasks(res.data)
          console.log(res);
    } catch (error) {
      console.log(error);
    }
  }


  const createTask = async (tasks) => {
    console.log('task');
    const res = await createTasksRequest(tasks)
    console.log(res);
  }

  return(
    <TaskContext.Provider value={{ 
      tasks,
      createTask,
      getTasks
    }}>
      { children }
    </TaskContext.Provider>
  )
}