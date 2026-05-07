/**
 * Componente Reportes - Historia de Usuario #5: Reportes y analisis
 * CU-004: Generar reportes de ventas - Actor: Administrador
 * 
 * RF: Generar reporte de inventario (filtro por fechas, PDF/Excel)
 * Clase UML: Reporte (fechaInicio, fechaFin, tipo)
 * 
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
import React, { useState } from 'react';

const DATOS_REPORTE = {
  ventas: [
    { mes: 'Enero', total: 2450000, pedidos: 45 },
    { mes: 'Febrero', total: 3120000, pedidos: 58 },
    { mes: 'Marzo', total: 2890000, pedidos: 52 },
    { mes: 'Abril', total: 4100000, pedidos: 71 },
    { mes: 'Mayo', total: 1850000, pedidos: 32 }
  ],
  topProductos: [
    { producto: 'Shampoo Hidratante', ventas: 145, ingresos: 4060000 },
    { producto: 'Crema Anti-edad', ventas: 89, ingresos: 7565000 },
    { producto: 'Base de Maquillaje', ventas: 124, ingresos: 8060000 },
    { producto: 'Serum Vitamina C', ventas: 67, ingresos: 6365000 }
  ]
};

function Reportes({ usuario }) {
  const [tipoReporte, setTipoReporte] = useState('ventas');
  const [fechaInicio, setFechaInicio] = useState('2025-01-01');
  const [fechaFin, setFechaFin] = useState('2025-05-31');
  const [generado, setGenerado] = useState(false);

  const totalVentas = DATOS_REPORTE.ventas.reduce((sum, m) => sum + m.total, 0);
  const totalPedidos = DATOS_REPORTE.ventas.reduce((sum, m) => sum + m.pedidos, 0);

  const handleGenerar = () => {
    setGenerado(true);
  };

  return (
    <div>
      <div className="cabecera-modulo">
        <div>
          <h1 className="titulo-seccion">📊 Reportes y Análisis</h1>
          <p className="subtitulo-seccion">Historia de Usuario #5 · CU-004 Generar reportes</p>
        </div>
      </div>

      {/* Configuracion del reporte - RF: filtrar por fecha */}
      <div className="tarjeta">
        <h3 style={{ marginBottom: 16, fontFamily: 'Poppins', color: '#E91E8C' }}>⚙️ Configurar Reporte</h3>
        <div className="formulario-grid">
          <div className="campo-formulario">
            <label>Tipo de reporte</label>
            <select value={tipoReporte} onChange={e => setTipoReporte(e.target.value)}>
              <option value="ventas">Ventas por mes</option>
              <option value="inventario">Estado del inventario</option>
              <option value="productos">Top productos vendidos</option>
            </select>
          </div>
          <div className="campo-formulario">
            <label>Fecha inicio</label>
            <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Fecha fin</label>
            <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-primario" onClick={handleGenerar}>📊 Generar Reporte</button>
          <button className="btn-secundario" onClick={() => alert('Exportando a PDF...')}>📄 Exportar PDF</button>
          <button className="btn-secundario" onClick={() => alert('Exportando a Excel...')}>📋 Exportar Excel</button>
        </div>
      </div>

      {/* Resumen general */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div className="tarjeta" style={{ textAlign: 'center', borderTop: '4px solid #E91E8C' }}>
          <div style={{ fontSize: 32, fontFamily: 'Poppins', fontWeight: 700, color: '#E91E8C' }}>
            ${totalVentas.toLocaleString('es-CO')}
          </div>
          <div style={{ fontSize: 13, color: '#7F8C9A' }}>Total Ingresos</div>
        </div>
        <div className="tarjeta" style={{ textAlign: 'center', borderTop: '4px solid #27AE60' }}>
          <div style={{ fontSize: 32, fontFamily: 'Poppins', fontWeight: 700, color: '#27AE60' }}>{totalPedidos}</div>
          <div style={{ fontSize: 13, color: '#7F8C9A' }}>Total Pedidos</div>
        </div>
        <div className="tarjeta" style={{ textAlign: 'center', borderTop: '4px solid #3498DB' }}>
          <div style={{ fontSize: 32, fontFamily: 'Poppins', fontWeight: 700, color: '#3498DB' }}>87</div>
          <div style={{ fontSize: 13, color: '#7F8C9A' }}>Clientes Atendidos</div>
        </div>
      </div>

      {/* Tabla de ventas por mes */}
      <div className="tarjeta">
        <h3 style={{ marginBottom: 16, fontFamily: 'Poppins' }}>📅 Ventas por Mes ({fechaInicio} — {fechaFin})</h3>
        <table className="tabla-datos">
          <thead><tr><th>Mes</th><th>Pedidos</th><th>Total Ventas</th><th>Promedio por pedido</th></tr></thead>
          <tbody>
            {DATOS_REPORTE.ventas.map((mes, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600 }}>{mes.mes}</td>
                <td>{mes.pedidos}</td>
                <td style={{ color: '#27AE60', fontWeight: 700 }}>${mes.total.toLocaleString('es-CO')}</td>
                <td>${Math.round(mes.total / mes.pedidos).toLocaleString('es-CO')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top productos */}
      <div className="tarjeta">
        <h3 style={{ marginBottom: 16, fontFamily: 'Poppins' }}>🏆 Top Productos Vendidos</h3>
        <table className="tabla-datos">
          <thead><tr><th>#</th><th>Producto</th><th>Unidades vendidas</th><th>Ingresos generados</th></tr></thead>
          <tbody>
            {DATOS_REPORTE.topProductos.map((prod, idx) => (
              <tr key={idx}>
                <td><strong>#{idx + 1}</strong></td>
                <td style={{ fontWeight: 600 }}>{prod.producto}</td>
                <td>{prod.ventas} uds</td>
                <td style={{ color: '#E91E8C', fontWeight: 700 }}>${prod.ingresos.toLocaleString('es-CO')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reportes;
