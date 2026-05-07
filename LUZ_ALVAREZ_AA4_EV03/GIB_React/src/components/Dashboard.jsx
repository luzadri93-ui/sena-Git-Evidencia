/**
 * Componente Dashboard - Panel principal del sistema GIB
 * 
 * Muestra resumen ejecutivo del sistema con:
 * - KPIs de inventario (total productos, stock bajo, por vencer)
 * - Alertas de stock critico (CU-005 - Ver alertas de stock bajo)
 * - Actividad reciente del sistema
 * - Acceso rapido a modulos principales
 * 
 * Basado en Historia de Usuario #1 y #5 de la especificacion de requerimientos
 * 
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 */
import React from 'react';
import './Dashboard.css';

/**
 * Datos de ejemplo del dashboard
 * En produccion se obtienen desde la API REST (AA5-EV03)
 */
const DATOS_DASHBOARD = {
  kpis: [
    { id: 1, titulo: 'Total Productos', valor: '48', icono: '📦', color: 'azul', descripcion: 'Productos activos' },
    { id: 2, titulo: 'Stock Bajo', valor: '5', icono: '⚠️', color: 'amarillo', descripcion: 'Por debajo del minimo' },
    { id: 3, titulo: 'Por Vencer', valor: '3', icono: '📅', color: 'naranja', descripcion: 'En los proximos 30 dias' },
    { id: 4, titulo: 'Pedidos Hoy', valor: '12', icono: '🛒', color: 'verde', descripcion: 'Pedidos registrados' },
    { id: 5, titulo: 'Clientes', valor: '87', icono: '👥', color: 'morado', descripcion: 'Clientes registrados' },
    { id: 6, titulo: 'Proveedores', valor: '14', icono: '🚚', color: 'rosado', descripcion: 'Proveedores activos' }
  ],
  alertas: [
    { producto: 'Shampoo Hidratante 500ml', stock: 2, minimo: 10, estado: 'critico' },
    { producto: 'Crema Anti-edad Colágeno', stock: 4, minimo: 10, estado: 'critico' },
    { producto: 'Base de Maquillaje Beige', stock: 6, minimo: 10, estado: 'bajo' },
    { producto: 'Mascarilla Capilar Keratina', stock: 7, minimo: 10, estado: 'bajo' },
    { producto: 'Serum Vitamina C', stock: 8, minimo: 10, estado: 'bajo' }
  ],
  actividadReciente: [
    { tipo: 'entrada', descripcion: 'Recepcion de 50 unidades - Perfume Floral 100ml', hora: '09:15 am', usuario: 'Admin' },
    { tipo: 'pedido', descripcion: 'Pedido #1023 registrado - Cliente: Maria Garcia', hora: '10:30 am', usuario: 'Vendedor' },
    { tipo: 'salida', descripcion: 'Venta de 3 unidades - Crema Hidratante', hora: '11:00 am', usuario: 'Vendedor' },
    { tipo: 'alerta', descripcion: 'Stock critico: Shampoo Hidratante (2 unidades)', hora: '11:30 am', usuario: 'Sistema' },
    { tipo: 'entrada', descripcion: 'Recepcion de 30 unidades - Labial Rojo Intenso', hora: '02:00 pm', usuario: 'Almacen' }
  ]
};

/**
 * Componente KPI - Tarjeta de indicador clave de rendimiento
 * @param {Object} kpi - Datos del indicador
 */
function TarjetaKPI({ kpi }) {
  return (
    <div className={`kpi-tarjeta kpi-${kpi.color}`}>
      <div className="kpi-icono">{kpi.icono}</div>
      <div className="kpi-info">
        <span className="kpi-valor">{kpi.valor}</span>
        <span className="kpi-titulo">{kpi.titulo}</span>
        <span className="kpi-descripcion">{kpi.descripcion}</span>
      </div>
    </div>
  );
}

/**
 * Componente Dashboard principal
 * @param {Object} usuario - Usuario autenticado
 */
function Dashboard({ usuario }) {
  return (
    <div className="dashboard">
      {/* Encabezado con bienvenida */}
      <div className="dashboard-encabezado">
        <div>
          <h1 className="titulo-seccion">
            👋 Bienvenido, {usuario?.nombre?.split(' ')[0]}
          </h1>
          <p className="subtitulo-seccion">
            Panel principal del Sistema GIB · Cosméticos Kitty · {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="dashboard-rol-badge">
          <span>🔐 {usuario?.rol}</span>
        </div>
      </div>

      {/* Grid de KPIs - Indicadores clave (CU-004 Generar reportes) */}
      <div className="kpi-grid">
        {DATOS_DASHBOARD.kpis.map(kpi => (
          <TarjetaKPI key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Seccion inferior: Alertas + Actividad reciente */}
      <div className="dashboard-inferior">
        {/* Alertas de stock bajo - CU-005 */}
        <div className="tarjeta dashboard-alertas">
          <h3 className="dashboard-seccion-titulo">
            ⚠️ Alertas de Stock Bajo
          </h3>
          <p className="dashboard-seccion-desc">Productos que requieren reabastecimiento inmediato</p>
          <div className="alertas-lista">
            {DATOS_DASHBOARD.alertas.map((alerta, idx) => (
              <div key={idx} className={`alerta-item alerta-${alerta.estado}`}>
                <div className="alerta-info">
                  <span className="alerta-producto">{alerta.producto}</span>
                  <span className="alerta-detalle">
                    Stock: {alerta.stock} / Mínimo: {alerta.minimo}
                  </span>
                </div>
                <span className={`badge badge-${alerta.estado === 'critico' ? 'critico' : 'bajo'}`}>
                  {alerta.estado === 'critico' ? '🔴 CRÍTICO' : '🟡 BAJO'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente del sistema */}
        <div className="tarjeta dashboard-actividad">
          <h3 className="dashboard-seccion-titulo">
            📋 Actividad Reciente
          </h3>
          <p className="dashboard-seccion-desc">Últimos movimientos del sistema hoy</p>
          <div className="actividad-lista">
            {DATOS_DASHBOARD.actividadReciente.map((item, idx) => (
              <div key={idx} className="actividad-item">
                <div className={`actividad-icono actividad-${item.tipo}`}>
                  {item.tipo === 'entrada' ? '📥' : item.tipo === 'salida' ? '📤' : item.tipo === 'pedido' ? '🛒' : '⚠️'}
                </div>
                <div className="actividad-info">
                  <span className="actividad-desc">{item.descripcion}</span>
                  <span className="actividad-meta">{item.hora} · {item.usuario}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
