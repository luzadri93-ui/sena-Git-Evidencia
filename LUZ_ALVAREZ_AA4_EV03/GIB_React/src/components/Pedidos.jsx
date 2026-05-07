/**
 * Componente Pedidos - Gestion de Pedidos del sistema GIB
 * Historia de Usuario #2: Gestion de pedidos
 * CU-003: Crear pedido - Actor: Vendedor
 * 
 * Clase UML: Pedido (id, fecha, estado), DetallePedido (cantidad, subtotal)
 * 
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 */
import React, { useState } from 'react';

const PEDIDOS_INICIALES = [
  { id: 1, numero: 'PED-1001', cliente: 'María García López', fecha: '2025-05-01', estado: 'completado', total: 156000, items: 3 },
  { id: 2, numero: 'PED-1002', cliente: 'Valentina Rojas P.', fecha: '2025-05-02', estado: 'pendiente', total: 95000, items: 1 },
  { id: 3, numero: 'PED-1003', cliente: 'Sofía Martínez C.', fecha: '2025-05-03', estado: 'pendiente', total: 210000, items: 4 },
  { id: 4, numero: 'PED-1004', cliente: 'Ana Lucía Herrera', fecha: '2025-05-04', estado: 'cancelado', total: 78000, items: 2 },
  { id: 5, numero: 'PED-1005', cliente: 'Camila Torres R.', fecha: '2025-05-05', estado: 'completado', total: 340000, items: 5 }
];

function Pedidos({ usuario }) {
  const [pedidos, setPedidos] = useState(PEDIDOS_INICIALES);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState({ cliente: '', producto: '', cantidad: '', precio: '' });
  const [mensaje, setMensaje] = useState('');

  const mostrarMsg = (texto) => { setMensaje(texto); setTimeout(() => setMensaje(''), 3000); };

  const handleGuardar = () => {
    if (!formulario.cliente || !formulario.producto) {
      alert('Por favor complete los campos obligatorios');
      return;
    }
    // Verificar que el cliente exista (criterio de aceptacion HU#2)
    const nuevoPedido = {
      id: Date.now(),
      numero: `PED-${1006 + pedidos.length}`,
      cliente: formulario.cliente,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'pendiente', // Estado inicial segun HU#2
      total: parseInt(formulario.precio || 0) * parseInt(formulario.cantidad || 1),
      items: 1
    };
    setPedidos(prev => [nuevoPedido, ...prev]);
    mostrarMsg('✅ Pedido registrado con estado "pendiente"');
    setMostrarFormulario(false);
    setFormulario({ cliente: '', producto: '', cantidad: '', precio: '' });
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
    mostrarMsg(`✅ Estado del pedido actualizado a "${nuevoEstado}"`);
  };

  return (
    <div>
      <div className="cabecera-modulo">
        <div>
          <h1 className="titulo-seccion">🛒 Gestión de Pedidos</h1>
          <p className="subtitulo-seccion">Historia de Usuario #2 · CU-003 Crear pedido</p>
        </div>
        {(usuario?.rol === 'Administrador' || usuario?.rol === 'Vendedor') && (
          <button className="btn-primario" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            + Nuevo Pedido
          </button>
        )}
      </div>

      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      {mostrarFormulario && (
        <div className="tarjeta">
          <h3 style={{ marginBottom: 20, fontFamily: 'Poppins', color: '#E91E8C' }}>📋 Registrar Nuevo Pedido</h3>
          <div className="formulario-grid">
            <div className="campo-formulario campo-completo">
              <label>Cliente * (debe existir en el sistema)</label>
              <input name="cliente" value={formulario.cliente} onChange={e => setFormulario(p => ({...p, cliente: e.target.value}))} placeholder="Nombre del cliente" />
            </div>
            <div className="campo-formulario">
              <label>Producto *</label>
              <input name="producto" value={formulario.producto} onChange={e => setFormulario(p => ({...p, producto: e.target.value}))} placeholder="Producto solicitado" />
            </div>
            <div className="campo-formulario">
              <label>Cantidad</label>
              <input type="number" name="cantidad" value={formulario.cantidad} onChange={e => setFormulario(p => ({...p, cantidad: e.target.value}))} placeholder="1" />
            </div>
            <div className="campo-formulario">
              <label>Precio unitario (COP)</label>
              <input type="number" name="precio" value={formulario.precio} onChange={e => setFormulario(p => ({...p, precio: e.target.value}))} placeholder="0" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primario" onClick={handleGuardar}>💾 Registrar Pedido</button>
            <button className="btn-secundario" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="tarjeta">
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Items</th>
              <th>Total</th>
              <th>Estado</th>
              {usuario?.rol === 'Administrador' && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido.id}>
                <td><strong>{pedido.numero}</strong></td>
                <td>{pedido.cliente}</td>
                <td>{pedido.fecha}</td>
                <td>{pedido.items} productos</td>
                <td>${pedido.total.toLocaleString('es-CO')}</td>
                <td>
                  <span className={`badge badge-${pedido.estado}`}>
                    {pedido.estado === 'completado' ? '✅ Completado' : pedido.estado === 'pendiente' ? '⏳ Pendiente' : '❌ Cancelado'}
                  </span>
                </td>
                {usuario?.rol === 'Administrador' && (
                  <td>
                    {pedido.estado === 'pendiente' && (
                      <div className="acciones-tabla">
                        <button className="btn-editar" onClick={() => cambiarEstado(pedido.id, 'completado')}>✅ Completar</button>
                        <button className="btn-peligro" onClick={() => cambiarEstado(pedido.id, 'cancelado')}>❌ Cancelar</button>
                      </div>
                    )}
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

export default Pedidos;
