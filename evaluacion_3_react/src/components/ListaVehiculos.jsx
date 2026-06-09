import React from 'react';
import CardVehiculo from './CardVehiculo';

const ListaVehiculos = ({ vehiculos }) => {
  if (vehiculos.length === 0) {
    return (
      <div className="panel list-container">
        <h2>Vehículos Estacionados</h2>
        <p style={{ color: '#94a3b8' }}>No hay vehículos registrados en este momento.</p>
      </div>
    );
  }

  return (
    <div className="panel list-container">
      <h2>Vehículos Estacionados</h2>
      <div className="cards-grid">
        {vehiculos.map((vehiculo) => (
          <CardVehiculo key={vehiculo.patente} vehiculo={vehiculo} />
        ))}
      </div>
    </div>
  );
};

export default ListaVehiculos;
