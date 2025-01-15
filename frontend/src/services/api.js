import axios from 'axios';

// Configuración de Axios
const api = axios.create({
    baseURL: 'http://localhost:5171/api', // Ajusta esta URL si tu backend usa otro puerto
});

// Interceptor para agregar el token JWT a cada solicitud
api.interceptors.request.use(
    (config) => {
        // Obtén el token del localStorage
        const token = localStorage.getItem('token');

        if (token) {
            // Agrega el token al encabezado Authorization
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config; // Devuelve la configuración modificada
    },
    (error) => {
        // Manejo de errores antes de enviar la solicitud
        return Promise.reject(error);
    }
);

export default api;
