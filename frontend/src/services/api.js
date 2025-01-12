import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5171/api', // Cambia esta URL si tu backend está en otro puerto
});

export default api;
