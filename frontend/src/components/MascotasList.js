import React, { useEffect, useState } from 'react';
import api from '../services/api';

const MascotasList = () => {
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        api.get('/mascotas')
            .then((response) => {
                setMascotas(response.data);
            })
            .catch((error) => {
                console.error('Error fetching mascotas:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Mascotas</h1>
            <ul>
                {mascotas.map((mascota) => (
                    <li key={mascota.id}>
                        {mascota.nombre} - {mascota.tipo}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MascotasList;
