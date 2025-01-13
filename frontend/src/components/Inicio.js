import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>¡Bienvenido a tu Gestor de Mascotas!</h1>
            <p>
                Aquí puedes llevar el control de tus mascotas: su información, recordatorios y mucho más.
            </p>
            <div>
                <Link to="/mascotas">
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Ver Mascotas</button>
                </Link>
                <Link to="/agregar-mascota">
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Agregar Mascota</button>
                </Link>
            </div>
        </div>
    );
};

export default Inicio;
