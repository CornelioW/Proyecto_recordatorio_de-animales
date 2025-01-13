import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm'; // Importamos el componente combinado
import MascotasList from './components/MascotasList';
import AddMascota from './components/AddMascota';

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

                    {/* Ruta para la lista de mascotas */}
                    <Route
                        path="/mascotas"
                        element={<MascotasList mascotas={mascotas} setMascotas={setMascotas} />}
                    />

                    {/* Ruta para agregar mascota */}
                    <Route
                        path="/agregar-mascota"
                        element={<AddMascota onMascotaAdded={handleMascotaAdded} />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
