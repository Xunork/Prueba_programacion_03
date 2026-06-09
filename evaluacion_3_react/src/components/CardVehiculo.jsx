import React from 'react';

const CardVehiculo = ({ vehiculo }) => {
  const { patente, marca, modelo, permanente } = vehiculo;

  const cardClass = `card ${permanente ? 'permanente' : 'visita'}`;
  const badgeClass = `badge ${permanente ? 'permanente' : 'visita'}`;

  return (
    <div className={cardClass}>
      <h3>{patente.toUpperCase()}</h3>
      <p><strong>Marca:</strong> {marca}</p>
      <p><strong>Modelo:</strong> {modelo}</p>
      <span className={badgeClass}>
        {permanente ? 'Permanente' : 'Visita'}
      </span>
    </div>
  );
};

export default CardVehiculo;
