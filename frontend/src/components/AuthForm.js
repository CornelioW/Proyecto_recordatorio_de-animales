import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
    const navigate = useNavigate(); // Hook de React Router para navegación

    return (
        <div
            className="auth-container"
            style={{
                backgroundImage: "url('/images/fondo.png')", // Ruta desde la raíz del servidor
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            >
            <form className="auth-form">
                <h2>Bienvenido a Petguardian</h2>
                <div className="auth-buttons">
                    <button
                        type="button"
                        className="btn btn-register"
                        onClick={() => navigate('/register')}
                    >
                        ¿Primera visita? Únete a nuestra comunidad
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
