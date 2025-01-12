import React, { useState } from 'react';
import MascotasList from './components/MascotasList';
import AddMascota from './components/AddMascota';

const App = () => {
    const [mascotas, setMascotas] = useState([]);

    const handleMascotaAdded = (newMascota) => {
        setMascotas((prevMascotas) => [...prevMascotas, newMascota]);
    };

    return (
        <div className="App">
            <AddMascota onMascotaAdded={handleMascotaAdded} />
            <MascotasList mascotas={mascotas} setMascotas={setMascotas} />
        </div>
    );
};

export default App;
