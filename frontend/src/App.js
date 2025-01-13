import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio';
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
                    <Route path="/" element={<Inicio />} />
                    <Route
                        path="/mascotas"
                        element={<MascotasList mascotas={mascotas} setMascotas={setMascotas} />}
                    />
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

