import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Manejar registro
    const handleRegister = async () => {
        setError('');
        try {
            const response = await fetch('http://tu-backend.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('Usuario registrado con éxito');
                setUsername('');
                setPassword('');
            } else {
                const data = await response.json();
                setError(data.message || 'Error al registrar usuario');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        }
    };

    // Manejar inicio de sesión
    const handleLogin = async () => {
        setError('');
        try {
            const response = await fetch('http://tu-backend.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Guarda el token
                navigate('/inicio'); // Redirige a la página principal
            } else {
                setError(data.message || 'Credenciales incorrectas');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        }
    };

    return (
        <div className="auth-container">
            <form
                onSubmit={(e) => e.preventDefault()} // Previene el submit automático
                className="auth-form"
            >
                <h2>Bienvenido a Petguardian</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="auth-buttons">
                    {/* Botón para registro */}
                    <button
                        type="button"
                        className="btn btn-register"
                        onClick={handleRegister}
                    >
                        ¿Primera visita?
                        Únete a nuestra comunidad
                    </button>
                    {/* Botón para inicio de sesión */}
                    <button
                        type="button"
                        className="btn btn-login"
                        onClick={handleLogin}
                    >
                        ¿Ya registrado?
                        Bienvenido de nuevo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
