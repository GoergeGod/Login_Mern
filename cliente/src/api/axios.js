import axios from "axios";

const intance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true
})

export default intance