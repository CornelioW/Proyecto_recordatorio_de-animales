import React, { useState } from 'react';
import api from '../services/api';

const AddMascota = ({ onMascotaAdded }) => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [edad, setEdad] = useState('');
    const [raza, setRaza] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newMascota = {
                nombre,
                tipo,
                edad: edad ? parseInt(edad) : null,
                raza: raza || null,
            };

            const response = await api.post('/mascotas', newMascota);
            onMascotaAdded(response.data); // Llama al callback para actualizar la lista
            setNombre('');
            setTipo('');
            setEdad('');
            setRaza('');
        } catch (error) {
            console.error('Error al agregar la mascota:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Agregar Mascota</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Tipo:</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                    <option value="">Seleccionar</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                </select>
            </div>
            <div>
                <label>Edad:</label>
                <input
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                />
            </div>
            <div>
                <label>Raza:</label>
                <input
                    type="text"
                    value={raza}
                    onChange={(e) => setRaza(e.target.value)}
                />
            </div>
            <button type="submit">Agregar</button>
        </form>
    );
};

export default AddMascota;
