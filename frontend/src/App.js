import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import MascotasList from './components/MascotasList';
import AddMascota from './components/AddMascota';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); // Cambia esto según tu lógica de autenticación
    return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
    const [mascotas, setMascotas] = useState([]);

    const handleMascotaAdded = (newMascota) => {
        setMascotas((prevMascotas) => [...prevMascotas, newMascota]);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Ruta inicial: login/registro */}
                    <Route path="/" element={<AuthForm />} />

                    {/* Ruta protegida para la lista de mascotas */}
                   <Route
                        path="/mascotas"
                        element={
                            <PrivateRoute>
                                <MascotasList mascotas={mascotas} setMascotas={setMascotas} />
                            </PrivateRoute>
                        }
                    />

                    {/* Ruta protegida para agregar mascota */}
                    <Route
                        path="/agregar-mascota"
                        element={
                            <PrivateRoute>
                                <AddMascota onMascotaAdded={handleMascotaAdded} />
                            </PrivateRoute>
                        }
                    />

                    {/* Ruta para manejar errores */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
