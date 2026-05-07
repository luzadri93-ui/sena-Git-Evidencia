/**
 * AlertaStock.jsx - Componente de alerta para productos con stock bajo
 * Muestra una notificacion cuando el stock esta por debajo del minimo
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
import React from 'react';

/**
 * Componente de alerta de stock bajo
 * Recibe un producto por props y muestra la alerta si el stock es bajo
 *
 * @param {Object} props.producto - Objeto con datos del producto
 * @param {string} props.producto.nombreProducto - Nombre del producto
 * @param {number} props.producto.stockActual - Cantidad actual en inventario
 * @param {number} props.producto.stockMinimo - Cantidad minima requerida
 */
function AlertaStock({ producto }) {
  // Solo muestra la alerta si el stock esta por debajo del minimo
  if (!producto || producto.stockActual >= producto.stockMinimo) return null;

  // Calcula la cantidad necesaria para llegar al minimo
  const cantidadFaltante = producto.stockMinimo - producto.stockActual;

  return (
    <div style={{
      background: '#FEF3C7',
      border: '1px solid #F59E0B',
      borderRadius: '8px',
      padding: '12px 16px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Icono y mensaje de alerta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '18px' }}>⚠️</span>
        <div>
          <strong style={{ color: '#92400E', fontSize: '14px' }}>
            Stock bajo: {producto.nombreProducto}
          </strong>
          <p style={{ color: '#B45309', fontSize: '12px', margin: 0 }}>
            Stock actual: {producto.stockActual} uds. — Mínimo requerido: {producto.stockMinimo} uds.
          </p>
        </div>
      </div>

      {/* Cantidad faltante */}
      <span style={{
        background: '#FEF3C7',
        border: '1px solid #F59E0B',
        color: '#92400E',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        Faltan {cantidadFaltante} uds.
      </span>
    </div>
  );
}

export default AlertaStock;
