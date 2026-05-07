/**
 * Componente Inventario - Gestion de Inventario del sistema GIB
 * 
 * Implementa Historia de Usuario #1: Gestion de inventario
 * Casos de uso: CU-001 Registrar producto, CU-002 Modificar/eliminar,
 *               CU-005 Ver alertas de stock bajo
 * 
 * Requisitos funcionales implementados:
 * - RF Agregar producto: nombre, cantidad, precio, codigo, categoria
 * - RF Actualizar producto: modificar cantidad y datos
 * - RF Eliminar producto: con confirmacion
 * - RF Consultar inventario: lista con filtros
 * 
 * Clase UML: Producto (id, nombre, precio, cantidad, fechaVencimiento)
 *            Inventario (id, ubicacion)
 *            Categoria (id, nombre)
 * 
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 */
import React, { useState } from 'react';

/**
 * Datos iniciales de inventario basados en el contexto del proyecto
 * Cosmeticos Kitty - Distribuidora de productos de belleza
 */
const INVENTARIO_INICIAL = [
  { id: 1, codigo: 'P001', nombre: 'Shampoo Hidratante 500ml', categoria: 'Cabello', precio: 28000, cantidad: 2, minimo: 10, fechaVencimiento: '2026-08-15', proveedor: 'Belleza Total' },
  { id: 2, codigo: 'P002', nombre: 'Crema Anti-edad Colágeno', categoria: 'Cuidado Piel', precio: 85000, cantidad: 4, minimo: 10, fechaVencimiento: '2026-06-30', proveedor: 'Cosméticos del Norte' },
  { id: 3, codigo: 'P003', nombre: 'Base de Maquillaje Beige', categoria: 'Maquillaje', precio: 65000, cantidad: 6, minimo: 10, fechaVencimiento: '2027-01-20', proveedor: 'Belleza Total' },
  { id: 4, codigo: 'P004', nombre: 'Mascarilla Capilar Keratina', categoria: 'Cabello', precio: 42000, cantidad: 15, minimo: 10, fechaVencimiento: '2026-12-10', proveedor: 'Distribuidora Beauty' },
  { id: 5, codigo: 'P005', nombre: 'Serum Vitamina C', categoria: 'Cuidado Piel', precio: 95000, cantidad: 20, minimo: 10, fechaVencimiento: '2026-09-05', proveedor: 'Cosméticos del Norte' },
  { id: 6, codigo: 'P006', nombre: 'Labial Rojo Intenso', categoria: 'Maquillaje', precio: 32000, cantidad: 30, minimo: 5, fechaVencimiento: '2027-03-15', proveedor: 'Belleza Total' },
  { id: 7, codigo: 'P007', nombre: 'Perfume Floral 100ml', categoria: 'Fragancias', precio: 120000, cantidad: 12, minimo: 5, fechaVencimiento: '2028-01-01', proveedor: 'Distribuidora Beauty' },
  { id: 8, codigo: 'P008', nombre: 'Acondicionador Argan 400ml', categoria: 'Cabello', precio: 35000, cantidad: 18, minimo: 8, fechaVencimiento: '2026-11-20', proveedor: 'Belleza Total' }
];

const CATEGORIAS = ['Todas', 'Cabello', 'Cuidado Piel', 'Maquillaje', 'Fragancias', 'Accesorios'];

/**
 * Determina el estado del stock de un producto
 * @param {number} cantidad - Cantidad actual
 * @param {number} minimo - Stock minimo
 * @returns {string} Estado: 'ok', 'bajo', 'critico'
 */
const obtenerEstadoStock = (cantidad, minimo) => {
  if (cantidad === 0) return 'critico';
  if (cantidad < minimo * 0.5) return 'critico';
  if (cantidad < minimo) return 'bajo';
  return 'ok';
};

/**
 * Componente Inventario
 * Modulo de gestion completa de productos e inventario
 * @param {Object} usuario - Usuario autenticado con su rol
 */
function Inventario({ usuario }) {
  // Estado del inventario de productos
  const [productos, setProductos] = useState(INVENTARIO_INICIAL);
  
  // Estado del formulario para agregar/editar producto
  const [formulario, setFormulario] = useState({
    codigo: '', nombre: '', categoria: 'Cabello',
    precio: '', cantidad: '', minimo: '',
    fechaVencimiento: '', proveedor: ''
  });
  
  // Estados de control de UI
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditandoId, setProductoEditandoId] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  /**
   * Muestra un mensaje temporal al usuario
   * @param {string} tipo - 'exito' o 'error'
   * @param {string} texto - Contenido del mensaje
   */
  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
  };

  /**
   * Filtra los productos segun busqueda y categoria
   * RF: Consultar inventario con filtros
   */
  const productosFiltrados = productos.filter(p => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             p.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro;
    return coincideBusqueda && coincideCategoria;
  });

  /**
   * Maneja cambios en los campos del formulario
   */
  const handleCampoChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Abre el formulario para agregar un nuevo producto (CU-001)
   */
  const handleNuevoProducto = () => {
    setFormulario({ codigo: '', nombre: '', categoria: 'Cabello', precio: '', cantidad: '', minimo: '', fechaVencimiento: '', proveedor: '' });
    setModoEdicion(false);
    setProductoEditandoId(null);
    setMostrarFormulario(true);
  };

  /**
   * Abre el formulario para editar un producto existente (CU-002)
   * @param {Object} producto - Producto a editar
   */
  const handleEditar = (producto) => {
    setFormulario({
      codigo: producto.codigo,
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio.toString(),
      cantidad: producto.cantidad.toString(),
      minimo: producto.minimo.toString(),
      fechaVencimiento: producto.fechaVencimiento,
      proveedor: producto.proveedor
    });
    setModoEdicion(true);
    setProductoEditandoId(producto.id);
    setMostrarFormulario(true);
  };

  /**
   * Guarda el producto (nuevo o editado)
   * RF: Agregar producto / Actualizar producto
   * Validacion: no duplicados, campos obligatorios
   */
  const handleGuardar = () => {
    // Validacion de campos obligatorios (criterios de aceptacion HU#1)
    if (!formulario.codigo || !formulario.nombre || !formulario.precio || !formulario.cantidad) {
      mostrarMensaje('error', 'Por favor complete todos los campos obligatorios');
      return;
    }

    // Validacion de duplicados (criterio de aceptacion HU#1)
    const duplicado = productos.find(p => p.codigo === formulario.codigo && p.id !== productoEditandoId);
    if (duplicado) {
      mostrarMensaje('error', `Ya existe un producto con el código ${formulario.codigo}`);
      return;
    }

    if (modoEdicion) {
      // Actualizar producto existente (RF: Actualizar producto)
      setProductos(prev => prev.map(p =>
        p.id === productoEditandoId
          ? { ...p, ...formulario, precio: parseFloat(formulario.precio), cantidad: parseInt(formulario.cantidad), minimo: parseInt(formulario.minimo) }
          : p
      ));
      mostrarMensaje('exito', `✅ Producto "${formulario.nombre}" actualizado correctamente`);
    } else {
      // Agregar nuevo producto (RF: Agregar producto)
      const nuevoProducto = {
        id: Date.now(),
        ...formulario,
        precio: parseFloat(formulario.precio),
        cantidad: parseInt(formulario.cantidad),
        minimo: parseInt(formulario.minimo) || 5
      };
      setProductos(prev => [...prev, nuevoProducto]);
      mostrarMensaje('exito', `✅ Producto "${formulario.nombre}" registrado exitosamente`);
    }

    setMostrarFormulario(false);
  };

  /**
   * Elimina un producto del inventario (CU-002 / RF: Eliminar producto)
   * @param {Object} producto - Producto a eliminar
   */
  const handleEliminar = (producto) => {
    if (window.confirm(`¿Está seguro de eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`)) {
      setProductos(prev => prev.filter(p => p.id !== producto.id));
      mostrarMensaje('exito', `✅ Producto "${producto.nombre}" eliminado del inventario`);
    }
  };

  return (
    <div>
      {/* Cabecera del modulo */}
      <div className="cabecera-modulo">
        <div>
          <h1 className="titulo-seccion">📦 Gestión de Inventario</h1>
          <p className="subtitulo-seccion">Historia de Usuario #1 · {productosFiltrados.length} productos encontrados</p>
        </div>
        {/* Solo Administrador y Almacen pueden agregar productos */}
        {(usuario?.rol === 'Administrador' || usuario?.rol === 'Almacen') && (
          <button className="btn-primario" onClick={handleNuevoProducto}>
            + Registrar Producto
          </button>
        )}
      </div>

      {/* Mensajes de retroalimentacion */}
      {mensaje.texto && (
        <div className={mensaje.tipo === 'exito' ? 'mensaje-exito' : 'mensaje-error'}>
          {mensaje.texto}
        </div>
      )}

      {/* Formulario agregar/editar producto */}
      {mostrarFormulario && (
        <div className="tarjeta">
          <h3 style={{ marginBottom: 20, fontFamily: 'Poppins', color: '#E91E8C' }}>
            {modoEdicion ? '✏️ Editar Producto' : '➕ Registrar Nuevo Producto'}
          </h3>
          <div className="formulario-grid">
            <div className="campo-formulario">
              <label>Código *</label>
              <input name="codigo" value={formulario.codigo} onChange={handleCampoChange} placeholder="Ej: P001" />
            </div>
            <div className="campo-formulario">
              <label>Nombre del Producto *</label>
              <input name="nombre" value={formulario.nombre} onChange={handleCampoChange} placeholder="Nombre completo del producto" />
            </div>
            <div className="campo-formulario">
              <label>Categoría</label>
              <select name="categoria" value={formulario.categoria} onChange={handleCampoChange}>
                {CATEGORIAS.filter(c => c !== 'Todas').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="campo-formulario">
              <label>Proveedor</label>
              <input name="proveedor" value={formulario.proveedor} onChange={handleCampoChange} placeholder="Nombre del proveedor" />
            </div>
            <div className="campo-formulario">
              <label>Precio de Venta (COP) *</label>
              <input type="number" name="precio" value={formulario.precio} onChange={handleCampoChange} placeholder="0" />
            </div>
            <div className="campo-formulario">
              <label>Cantidad en Stock *</label>
              <input type="number" name="cantidad" value={formulario.cantidad} onChange={handleCampoChange} placeholder="0" />
            </div>
            <div className="campo-formulario">
              <label>Stock Mínimo</label>
              <input type="number" name="minimo" value={formulario.minimo} onChange={handleCampoChange} placeholder="10" />
            </div>
            <div className="campo-formulario">
              <label>Fecha de Vencimiento</label>
              <input type="date" name="fechaVencimiento" value={formulario.fechaVencimiento} onChange={handleCampoChange} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn-primario" onClick={handleGuardar}>
              💾 {modoEdicion ? 'Actualizar' : 'Guardar Producto'}
            </button>
            <button className="btn-secundario" onClick={() => setMostrarFormulario(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Barra de busqueda y filtros */}
      <div className="tarjeta">
        <div className="barra-busqueda">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre o código..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <select
            value={categoriaFiltro}
            onChange={e => setCategoriaFiltro(e.target.value)}
            style={{ padding: '10px 16px', border: '2px solid #E8EDF2', borderRadius: 10, fontFamily: 'Nunito' }}
          >
            {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Tabla de inventario */}
        <div style={{ overflowX: 'auto' }}>
          <table className="tabla-datos">
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Vencimiento</th>
                {(usuario?.rol === 'Administrador' || usuario?.rol === 'Almacen') && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map(producto => {
                const estado = obtenerEstadoStock(producto.cantidad, producto.minimo);
                return (
                  <tr key={producto.id}>
                    <td><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>{producto.codigo}</code></td>
                    <td style={{ fontWeight: 600 }}>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>${producto.precio.toLocaleString('es-CO')}</td>
                    <td style={{ fontWeight: 700 }}>{producto.cantidad} uds</td>
                    <td>
                      <span className={`badge badge-${estado}`}>
                        {estado === 'ok' ? '🟢 OK' : estado === 'bajo' ? '🟡 BAJO' : '🔴 CRÍTICO'}
                      </span>
                    </td>
                    <td style={{ fontSize: 12 }}>{producto.fechaVencimiento}</td>
                    {(usuario?.rol === 'Administrador' || usuario?.rol === 'Almacen') && (
                      <td>
                        <div className="acciones-tabla">
                          <button className="btn-editar" onClick={() => handleEditar(producto)}>✏️ Editar</button>
                          <button className="btn-peligro" onClick={() => handleEliminar(producto)}>🗑️ Eliminar</button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {productosFiltrados.length === 0 && (
          <p style={{ textAlign: 'center', padding: 30, color: '#7F8C9A' }}>No se encontraron productos</p>
        )}
      </div>
    </div>
  );
}

export default Inventario;
