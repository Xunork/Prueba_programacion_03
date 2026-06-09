import React, { useState } from 'react';
import CardVehiculo from './CardVehiculo';

const ListaVehiculos = ({ vehiculos, onEliminarVehiculo }) => {
  const [filtro, setFiltro] = useState('');

  const vehiculosFiltrados = vehiculos.filter((v) => 
    v.patente.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="panel list-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Vehículos Estacionados</h2>
        {vehiculos.length > 0 && (
          <input 
            type="text" 
            placeholder="Buscar por patente..." 
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="filter-input"
          />
        )}
      </div>
      
      {vehiculos.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No hay vehículos registrados en este momento.</p>
      ) : vehiculosFiltrados.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No se encontraron vehículos que coincidan con la búsqueda.</p>
      ) : (
        <div className="cards-grid">
          {vehiculosFiltrados.map((vehiculo) => (
            <CardVehiculo 
              key={vehiculo.patente} 
              vehiculo={vehiculo} 
              onEliminarVehiculo={onEliminarVehiculo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaVehiculos;
