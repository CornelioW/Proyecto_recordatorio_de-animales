import React, { useEffect } from 'react';
import api from '../services/api';

const MascotasList = ({ mascotas, setMascotas }) => {
    useEffect(() => {
        api.get('/mascotas')
            .then((response) => {
                setMascotas(response.data);
            })
            .catch((error) => {
                console.error('Error fetching mascotas:', error);
            });
    }, [setMascotas]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar esta mascota?"
        );

        if (!confirmDelete) {
            return; // Si el usuario cancela, no hacemos nada
        }

        try {
            await api.delete(`/mascotas/${id}`);
            setMascotas((prevMascotas) =>
                prevMascotas.filter((mascota) => mascota.id !== id)
            );
        } catch (error) {
            console.error('Error borrando mascota:', error);
        }
    };


    return (
        <div>
            <h1>Lista de Mascotas</h1>
            <ul>
                {mascotas.map((mascota) => (
                    <li key={mascota.id}>
                        {mascota.nombre} - {mascota.tipo}
                        <button onClick={() => handleDelete(mascota.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MascotasList;

