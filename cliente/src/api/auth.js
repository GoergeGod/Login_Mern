import axios from "axios";

const API = 'http://localhost:5001/api';

export const registerRequest = user => axios.post(`/register`, user);

export const loginRequeset = user => axios.post(`/login`, user);

export const verifyTokenRequeset = ( ) => { axios.get(`/verify`)}