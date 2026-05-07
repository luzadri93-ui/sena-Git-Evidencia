/**
 * Componente Clientes - Historia de Usuario #3: Gestion de clientes
 * Clase UML: Cliente (cedula, telefono, direccion)
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
import React, { useState } from 'react';

const CLIENTES_INICIALES = [
  { id: 1, cedula: '1020304050', nombre: 'María García López', telefono: '311-234-5678', email: 'mgarcia@email.com', direccion: 'Cra 15 #32-10, Bogotá' },
  { id: 2, cedula: '2030405060', nombre: 'Valentina Rojas P.', telefono: '320-876-5432', email: 'vrojas@email.com', direccion: 'Calle 45 #20-5, Bogotá' },
  { id: 3, cedula: '3040506070', nombre: 'Sofía Martínez C.', telefono: '315-432-1098', email: 'smartinez@email.com', direccion: 'Av 68 #55-20, Bogotá' },
  { id: 4, cedula: '4050607080', nombre: 'Ana Lucía Herrera', telefono: '318-654-3210', email: 'alherrera@email.com', direccion: 'Calle 100 #15-30, Bogotá' }
];

function Clientes({ usuario }) {
  const [clientes, setClientes] = useState(CLIENTES_INICIALES);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState({ cedula: '', nombre: '', telefono: '', email: '', direccion: '' });
  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');

  const mostrarMsg = (texto) => { setMensaje(texto); setTimeout(() => setMensaje(''), 3000); };

  const clientesFiltrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || c.cedula.includes(busqueda)
  );

  const handleGuardar = () => {
    if (!formulario.cedula || !formulario.nombre) {
      alert('Cédula y nombre son obligatorios');
      return;
    }
    // Validar duplicados (criterio de aceptacion HU#3)
    if (clientes.find(c => c.cedula === formulario.cedula)) {
      alert('Ya existe un cliente con esa cédula');
      return;
    }
    setClientes(prev => [...prev, { id: Date.now(), ...formulario }]);
    mostrarMsg(`✅ Cliente "${formulario.nombre}" registrado correctamente`);
    setFormulario({ cedula: '', nombre: '', telefono: '', email: '', direccion: '' });
    setMostrarFormulario(false);
  };

  const handleEliminar = (cliente) => {
    if (window.confirm(`¿Eliminar cliente "${cliente.nombre}"?`)) {
      setClientes(prev => prev.filter(c => c.id !== cliente.id));
      mostrarMsg(`✅ Cliente eliminado correctamente`);
    }
  };

  return (
    <div>
      <div className="cabecera-modulo">
        <div>
          <h1 className="titulo-seccion">👥 Gestión de Clientes</h1>
          <p className="subtitulo-seccion">Historia de Usuario #3 · {clientesFiltrados.length} clientes registrados</p>
        </div>
        {usuario?.rol === 'Administrador' && (
          <button className="btn-primario" onClick={() => setMostrarFormulario(!mostrarFormulario)}>+ Nuevo Cliente</button>
        )}
      </div>

      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      {mostrarFormulario && (
        <div className="tarjeta">
          <h3 style={{ marginBottom: 20, fontFamily: 'Poppins', color: '#E91E8C' }}>➕ Registrar Cliente</h3>
          <div className="formulario-grid">
            <div className="campo-formulario">
              <label>Cédula *</label>
              <input value={formulario.cedula} onChange={e => setFormulario(p => ({...p, cedula: e.target.value}))} placeholder="Número de cédula" />
            </div>
            <div className="campo-formulario">
              <label>Nombre Completo *</label>
              <input value={formulario.nombre} onChange={e => setFormulario(p => ({...p, nombre: e.target.value}))} placeholder="Nombre completo" />
            </div>
            <div className="campo-formulario">
              <label>Teléfono</label>
              <input value={formulario.telefono} onChange={e => setFormulario(p => ({...p, telefono: e.target.value}))} placeholder="Número de contacto" />
            </div>
            <div className="campo-formulario">
              <label>Correo electrónico</label>
              <input type="email" value={formulario.email} onChange={e => setFormulario(p => ({...p, email: e.target.value}))} placeholder="correo@ejemplo.com" />
            </div>
            <div className="campo-formulario campo-completo">
              <label>Dirección</label>
              <input value={formulario.direccion} onChange={e => setFormulario(p => ({...p, direccion: e.target.value}))} placeholder="Dirección completa" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primario" onClick={handleGuardar}>💾 Guardar Cliente</button>
            <button className="btn-secundario" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="tarjeta">
        <div className="barra-busqueda">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre o cédula..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              {usuario?.rol === 'Administrador' && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map(cliente => (
              <tr key={cliente.id}>
                <td><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>{cliente.cedula}</code></td>
                <td style={{ fontWeight: 600 }}>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.email}</td>
                <td style={{ fontSize: 12 }}>{cliente.direccion}</td>
                {usuario?.rol === 'Administrador' && (
                  <td>
                    <button className="btn-peligro" onClick={() => handleEliminar(cliente)}>🗑️ Eliminar</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
