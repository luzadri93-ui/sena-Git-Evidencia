/**
 * ListaProductos.jsx - Pagina de gestion del inventario de productos GIB
 * Muestra todos los productos con opciones de agregar, editar y eliminar
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaStock from '../components/AlertaStock';

/**
 * Componente principal del modulo de inventario
 * Carga y muestra la lista de productos del sistema GIB
 */
function ListaProductos() {
  // Estado para la lista de productos
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');

  /**
   * Carga los productos al montar el componente
   */
  useEffect(() => {
    cargarProductos();
  }, []);

  /**
   * Obtiene los productos del inventario
   * En produccion conectaria con: GET http://localhost:8080/api/productos
   */
  const cargarProductos = () => {
    // Datos de ejemplo del inventario de Cosmeticos Kitty
    const productosEjemplo = [
      { idProducto: 1, nombreProducto: 'Limpiador Facial Hidratante', nombreCategoria: 'Cuidado de Piel', precioVenta: 78000, stockActual: 8, stockMinimo: 10, estado: 'activo' },
      { idProducto: 2, nombreProducto: 'Shampoo Nutritivo', nombreCategoria: 'Cabello', precioVenta: 50000, stockActual: 5, stockMinimo: 8, estado: 'activo' },
      { idProducto: 3, nombreProducto: 'Crema Anti-edad Premium', nombreCategoria: 'Skincare', precioVenta: 120000, stockActual: 20, stockMinimo: 5, estado: 'activo' },
      { idProducto: 4, nombreProducto: 'Base de Maquillaje', nombreCategoria: 'Maquillaje', precioVenta: 95000, stockActual: 15, stockMinimo: 10, estado: 'activo' }
    ];
    setProductos(productosEjemplo);
    setCargando(false);
  };

  /**
   * Elimina un producto por su ID
   * @param {number} idProducto - ID del producto a eliminar
   */
  const eliminarProducto = (idProducto) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      setProductos(prev => prev.filter(p => p.idProducto !== idProducto));
      setMensaje('Producto eliminado correctamente.');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  /**
   * Filtra los productos segun el texto de busqueda
   */
  const productosFiltrados = productos.filter(p =>
    p.nombreProducto.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando inventario...</div>;

  return (
    <div>
      {/* Encabezado de la pagina */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div className="titulo-pagina" style={{ margin: 0 }}>Inventario de Productos</div>
        <Link to="/productos/nuevo" className="btn-primario" style={{ textDecoration: 'none' }}>
          + Nuevo Producto
        </Link>
      </div>

      {/* Mensaje de exito */}
      {mensaje && (
        <div style={{ background: '#D1FAE5', color: '#065F46', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
          {mensaje}
        </div>
      )}

      {/* Alertas de stock bajo */}
      {productos.filter(p => p.stockActual < p.stockMinimo).map(p => (
        <AlertaStock key={p.idProducto} producto={p} />
      ))}

      {/* Buscador */}
      <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: '100%', padding: '10px 12px',
            border: '2px solid #eee', borderRadius: '8px',
            fontSize: '14px', outline: 'none'
          }}
        />
      </div>

      {/* Tabla de productos */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E8E8F0', overflow: 'hidden' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio Venta</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
                  No hay productos registrados
                </td>
              </tr>
            ) : (
              productosFiltrados.map((producto) => (
                <tr key={producto.idProducto}>
                  <td>{producto.idProducto}</td>
                  <td><strong>{producto.nombreProducto}</strong></td>
                  <td>{producto.nombreCategoria}</td>
                  <td><strong>${producto.precioVenta.toLocaleString()}</strong></td>
                  <td>{producto.stockActual} uds.</td>
                  <td>
                    <span className={producto.stockActual < producto.stockMinimo ? 'chip-bajo' : 'chip-ok'}>
                      {producto.stockActual < producto.stockMinimo ? 'Stock Bajo' : 'OK'}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    <Link
                      to={`/productos/editar/${producto.idProducto}`}
                      style={{
                        background: '#EDE9FE', color: '#5B21B6',
                        border: 'none', padding: '6px 12px',
                        borderRadius: '6px', fontSize: '12px',
                        textDecoration: 'none', cursor: 'pointer'
                      }}
                    >
                      Editar
                    </Link>
                    <button
                      className="btn-secundario"
                      onClick={() => eliminarProducto(producto.idProducto)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaProductos;
