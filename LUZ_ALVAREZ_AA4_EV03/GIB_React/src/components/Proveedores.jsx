/**
 * Componente Proveedores - Historia de Usuario #4: Gestion de proveedores
 * Clase UML: Proveedor (id, nombre, contacto)
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
import React, { useState } from 'react';

const PROVEEDORES_INICIALES = [
  { id: 1, nit: '900123456-1', nombre: 'Belleza Total S.A.S', contacto: 'Carlos Mendoza', telefono: '601-234-5678', email: 'ventas@bellezatotal.com', estado: 'activo' },
  { id: 2, nit: '800987654-2', nombre: 'Cosméticos del Norte', contacto: 'Ana Ruiz', telefono: '604-876-5432', email: 'info@cosmeticosnorte.com', estado: 'activo' },
  { id: 3, nit: '700456789-3', nombre: 'Distribuidora Beauty', contacto: 'Luis Castro', telefono: '605-543-2109', email: 'pedidos@beauty.com', estado: 'activo' }
];

function Proveedores({ usuario }) {
  const [proveedores, setProveedores] = useState(PROVEEDORES_INICIALES);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState({ nit: '', nombre: '', contacto: '', telefono: '', email: '' });
  const [mensaje, setMensaje] = useState('');

  const mostrarMsg = (texto) => { setMensaje(texto); setTimeout(() => setMensaje(''), 3000); };

  const handleGuardar = () => {
    if (!formulario.nit || !formulario.nombre) { alert('NIT y nombre son obligatorios'); return; }
    setProveedores(prev => [...prev, { id: Date.now(), ...formulario, estado: 'activo' }]);
    mostrarMsg(`✅ Proveedor "${formulario.nombre}" registrado correctamente`);
    setFormulario({ nit: '', nombre: '', contacto: '', telefono: '', email: '' });
    setMostrarFormulario(false);
  };

  return (
    <div>
      <div className="cabecera-modulo">
        <div>
          <h1 className="titulo-seccion">🚚 Gestión de Proveedores</h1>
          <p className="subtitulo-seccion">Historia de Usuario #4 · {proveedores.length} proveedores registrados</p>
        </div>
        <button className="btn-primario" onClick={() => setMostrarFormulario(!mostrarFormulario)}>+ Nuevo Proveedor</button>
      </div>

      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      {mostrarFormulario && (
        <div className="tarjeta">
          <h3 style={{ marginBottom: 20, fontFamily: 'Poppins', color: '#E91E8C' }}>➕ Registrar Proveedor</h3>
          <div className="formulario-grid">
            <div className="campo-formulario"><label>NIT *</label><input value={formulario.nit} onChange={e => setFormulario(p=>({...p,nit:e.target.value}))} placeholder="NIT del proveedor" /></div>
            <div className="campo-formulario"><label>Nombre de la empresa *</label><input value={formulario.nombre} onChange={e => setFormulario(p=>({...p,nombre:e.target.value}))} placeholder="Nombre completo" /></div>
            <div className="campo-formulario"><label>Persona de contacto</label><input value={formulario.contacto} onChange={e => setFormulario(p=>({...p,contacto:e.target.value}))} placeholder="Nombre del contacto" /></div>
            <div className="campo-formulario"><label>Teléfono</label><input value={formulario.telefono} onChange={e => setFormulario(p=>({...p,telefono:e.target.value}))} placeholder="Teléfono" /></div>
            <div className="campo-formulario campo-completo"><label>Email</label><input type="email" value={formulario.email} onChange={e => setFormulario(p=>({...p,email:e.target.value}))} placeholder="correo@empresa.com" /></div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primario" onClick={handleGuardar}>💾 Guardar</button>
            <button className="btn-secundario" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="tarjeta">
        <table className="tabla-datos">
          <thead><tr><th>NIT</th><th>Empresa</th><th>Contacto</th><th>Teléfono</th><th>Email</th><th>Estado</th></tr></thead>
          <tbody>
            {proveedores.map(p => (
              <tr key={p.id}>
                <td><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>{p.nit}</code></td>
                <td style={{ fontWeight: 600 }}>{p.nombre}</td>
                <td>{p.contacto}</td>
                <td>{p.telefono}</td>
                <td>{p.email}</td>
                <td><span className="badge badge-ok">✅ Activo</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { Proveedores as default };
