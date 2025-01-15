import React, { useState } from 'react';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5171/api/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    email: formData.email,
                    passwordHash: formData.password,
                }),
            });

            if (response.ok) {
                setMessage('Usuario registrado con éxito.');
                setFormData({
                    nombre: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            } else {
                const data = await response.json();
                setError(data.message || 'Error al registrar usuario.');
            }
        } catch (err) {
            setError('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="register-container">
            <h2>Registro de Usuario</h2>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label>Confirmar Contraseña:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
