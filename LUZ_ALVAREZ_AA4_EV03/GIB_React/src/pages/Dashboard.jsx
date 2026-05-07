/**
 * Dashboard.jsx - Panel principal del sistema GIB
 * Muestra un resumen del estado del inventario con estadisticas
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
import React, { useState, useEffect } from 'react';
import AlertaStock from '../components/AlertaStock';

/**
 * Componente del panel principal
 * Obtiene y muestra las estadisticas del inventario
 */
function Dashboard() {
  // Estado para las estadisticas del dashboard
  const [estadisticas, setEstadisticas] = useState({
    totalProductos: 0,
    productosStockBajo: 0,
    totalCategorias: 4,
    totalProveedores: 2
  });

  const [productosStockBajo, setProductosStockBajo] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Obtiene el nombre del usuario de la sesion
  const usuario = localStorage.getItem('usuario') || 'Administrador';

  /**
   * Carga las estadisticas al montar el componente
   * useEffect con array vacio ejecuta solo una vez
   */
  useEffect(() => {
    cargarEstadisticas();
  }, []);

  /**
   * Funcion que carga los datos del inventario
   * En produccion conectaria con la API REST del backend
   */
  const cargarEstadisticas = () => {
    setCargando(false);
    // Datos de ejemplo del inventario de Cosmeticos Kitty
    setEstadisticas({
      totalProductos: 4,
      productosStockBajo: 2,
      totalCategorias: 4,
      totalProveedores: 2
    });
    setProductosStockBajo([
      { idProducto: 1, nombreProducto: 'Limpiador Facial', stockActual: 3, stockMinimo: 10 },
      { idProducto: 2, nombreProducto: 'Shampoo Nutritivo', stockActual: 5, stockMinimo: 8 }
    ]);
  };

  if (cargando) return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando...</div>;

  return (
    <div>
      <div className="titulo-pagina">
        Panel de Control — Bienvenida, {usuario}
      </div>

      {/* Tarjetas de estadisticas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { titulo: 'Total Productos', valor: estadisticas.totalProductos, color: '#E91E8C' },
          { titulo: 'Stock Bajo', valor: estadisticas.productosStockBajo, color: '#F59E0B' },
          { titulo: 'Categorias', valor: estadisticas.totalCategorias, color: '#3B82F6' },
          { titulo: 'Proveedores', valor: estadisticas.totalProveedores, color: '#10B981' }
        ].map((stat) => (
          <div key={stat.titulo} className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{stat.titulo}</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: stat.color }}>{stat.valor}</p>
          </div>
        ))}
      </div>

      {/* Alertas de stock bajo */}
      {productosStockBajo.length > 0 && (
        <div className="card">
          <h3 style={{ color: '#E91E8C', marginBottom: '16px' }}>Alertas de Stock Bajo</h3>
          {productosStockBajo.map((producto) => (
            <AlertaStock key={producto.idProducto} producto={producto} />
          ))}
        </div>
      )}

      {/* Accesos rapidos */}
      <div className="card">
        <h3 style={{ color: '#E91E8C', marginBottom: '16px' }}>Accesos Rápidos</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="/productos" className="btn-primario" style={{ textDecoration: 'none' }}>
            Ver Inventario
          </a>
          <a href="/productos/nuevo" className="btn-primario" style={{ textDecoration: 'none', background: '#1A1D2E' }}>
            Agregar Producto
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
