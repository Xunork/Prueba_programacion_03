import React, { useState } from 'react';

const Formulario = ({ onAgregarVehiculo, disabled, vehiculosRegistrados }) => {
  const [formData, setFormData] = useState({
    patente: '',
    marca: '',
    modelo: '',
    permanente: false
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.patente.trim() || !formData.marca.trim() || !formData.modelo.trim()) {
      setError('Todos los campos de texto son obligatorios.');
      return;
    }

    const patenteRegex = /^[A-Za-z]{4}\d{2}$/;
    if (!patenteRegex.test(formData.patente.trim())) {
      setError('La patente debe tener el formato: 4 letras seguidas de 2 números (Ej: ABCD12).');
      return;
    }

    const existe = vehiculosRegistrados.some(
      (v) => v.patente.toUpperCase() === formData.patente.trim().toUpperCase()
    );
    if (existe) {
      setError('La patente ingresada ya se encuentra registrada.');
      return;
    }

    onAgregarVehiculo({
      ...formData,
      patente: formData.patente.trim().toUpperCase()
    });

    setFormData({
      patente: '',
      marca: '',
      modelo: '',
      permanente: false
    });
    setError('');
  };

  return (
    <div className="panel form-container">
      <h2>Registrar Ingreso</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patente">Patente</label>
          <input
            type="text"
            id="patente"
            name="patente"
            value={formData.patente}
            onChange={handleChange}
            placeholder="Ej: ABCD12"
            maxLength={6}
            disabled={disabled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="marca">Marca</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            placeholder="Ej: Toyota"
            disabled={disabled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            placeholder="Ej: Yaris"
            disabled={disabled}
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="permanente"
            name="permanente"
            checked={formData.permanente}
            onChange={handleChange}
            disabled={disabled}
          />
          <label htmlFor="permanente">¿Es estacionamiento permanente?</label>
        </div>

        {error && <p className="error-message">{error}</p>}
        {disabled && <p className="error-message" style={{ color: '#fbbf24' }}>No hay cupos disponibles.</p>}

        <button type="submit" disabled={disabled} style={{ marginTop: '1rem' }}>
          Registrar Vehículo
        </button>
      </form>
    </div>
  );
};

export default Formulario;
