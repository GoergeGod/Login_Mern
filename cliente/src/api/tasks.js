import axios from "./axios"

export const getTasksRequest = () => axios.get(`/tasks`)
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)
export const createTasksRequest = (task) => axios.post(`/task`, task)
export const updateTaskRequest = (task) => axios.put(`/task/${task._id}`,task)
export const deleteTaskRequest = (id) => axios.delete(`/task/${id}`)