import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListaVehiculos from './components/ListaVehiculos';
import './index.css';

const CAPACIDAD_TOTAL = 10;

function App() {
  const [vehiculos, setVehiculos] = useState(() => {
    const guardados = localStorage.getItem('vehiculosEstacionados');
    if (guardados) {
      return JSON.parse(guardados);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('vehiculosEstacionados', JSON.stringify(vehiculos));
  }, [vehiculos]);

  const cuposDisponibles = CAPACIDAD_TOTAL - vehiculos.length;
  const sinCupos = cuposDisponibles <= 0;

  const agregarVehiculo = (nuevoVehiculo) => {
    if (!sinCupos) {
      setVehiculos([...vehiculos, nuevoVehiculo]);
    }
  };

  return (
    <>
      <header>
        <h1>SmartParking</h1>
        <p>Sistema de Gestión de Estacionamientos</p>
      </header>

      <main>
        <Formulario 
          onAgregarVehiculo={agregarVehiculo} 
          disabled={sinCupos}
          vehiculosRegistrados={vehiculos}
        />
        
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
          <div className="status-bar">
            <span>Ocupación: {vehiculos.length} / {CAPACIDAD_TOTAL}</span>
            <span className={sinCupos ? 'spots-full' : 'spots-free'}>
              {sinCupos ? 'ESTACIONAMIENTO LLENO' : `${cuposDisponibles} cupos disponibles`}
            </span>
          </div>
          <ListaVehiculos vehiculos={vehiculos} />
        </div>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} - Sistema de Gestión de Estacionamientos.</p>
      </footer>
    </>
  );
}

export default App;
