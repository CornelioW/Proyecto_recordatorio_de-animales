import React from 'react';

const Paginacion = ({ paginaActual, totalPaginas, onPaginaCambiar }) => {
    return (
        <div>
            <button
                onClick={() => onPaginaCambiar(paginaActual - 1)}
                disabled={paginaActual === 1}
            >
                Anterior
            </button>
            <span>{` Página ${paginaActual} de ${totalPaginas} `}</span>
            <button
                onClick={() => onPaginaCambiar(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Paginacion;
