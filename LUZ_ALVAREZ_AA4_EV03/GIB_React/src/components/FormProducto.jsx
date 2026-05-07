/**
 * FormProducto.jsx - Formulario para registrar y editar productos en GIB
 * Se usa tanto para crear nuevos productos como para editar existentes
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * Componente de formulario reutilizable para productos
 * Detecta automaticamente si es modo creacion o edicion segun el parametro id
 */
function FormProducto() {
  // Obtiene el id de la URL si existe (modo edicion)
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del formulario con valores iniciales vacios
  const [producto, setProducto] = useState({
    nombreProducto: '',
    idCategoria: '',
    idProveedor: '',
    precioVenta: '',
    stockActual: '',
    stockMinimo: '',
    estado: 'activo'
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Modo edicion: si hay id en la URL, carga los datos del producto
  const modoEdicion = Boolean(id);

  /**
   * Si es modo edicion, carga los datos del producto al montar
   */
  useEffect(() => {
    if (modoEdicion) {
      // En produccion: GET http://localhost:8080/api/productos/{id}
      setProducto({
        nombreProducto: 'Limpiador Facial Hidratante',
        idCategoria: '1',
        idProveedor: '1',
        precioVenta: '78000',
        stockActual: '8',
        stockMinimo: '10',
        estado: 'activo'
      });
    }
  }, [id, modoEdicion]);

  /**
   * Maneja los cambios en los campos del formulario
   * Actualiza el estado con el nuevo valor del campo
   * @param {Event} e - Evento del campo de formulario
   */
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Valida que los campos obligatorios esten completos
   * @returns {boolean} true si el formulario es valido
   */
  const validarFormulario = () => {
    if (!producto.nombreProducto.trim()) {
      setError('El nombre del producto es obligatorio.');
      return false;
    }
    if (!producto.precioVenta || producto.precioVenta <= 0) {
      setError('El precio de venta debe ser mayor a 0.');
      return false;
    }
    if (!producto.stockActual || producto.stockActual < 0) {
      setError('El stock actual no puede ser negativo.');
      return false;
    }
    return true;
  };

  /**
   * Maneja el envio del formulario
   * Valida y guarda el producto (crea o actualiza segun el modo)
   * @param {Event} e - Evento de submit
   */
  const manejarSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validarFormulario()) return;

    // En produccion conectaria con la API:
    // POST http://localhost:8080/api/productos (crear)
    // PUT  http://localhost:8080/api/productos/{id} (editar)
    setMensaje(modoEdicion ? 'Producto actualizado correctamente.' : 'Producto registrado correctamente.');
    setTimeout(() => navigate('/productos'), 2000);
  };

  return (
    <div>
      <div className="titulo-pagina">
        {modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}
      </div>

      <div className="card">
        {/* Mensaje de exito */}
        {mensaje && (
          <div style={{ background: '#D1FAE5', color: '#065F46', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
            {mensaje}
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {/* Formulario de producto */}
        <form onSubmit={manejarSubmit}>
          <div className="form-grid">
            {/* Nombre del producto */}
            <div className="campo" style={{ gridColumn: '1 / -1' }}>
              <label>Nombre del Producto *</label>
              <input
                type="text"
                name="nombreProducto"
                value={producto.nombreProducto}
                onChange={manejarCambio}
                placeholder="Ej: Crema Hidratante Premium"
              />
            </div>

            {/* Categoria */}
            <div className="campo">
              <label>Categoría</label>
              <select name="idCategoria" value={producto.idCategoria} onChange={manejarCambio}>
                <option value="">Seleccionar...</option>
                <option value="1">Cuidado de Piel</option>
                <option value="2">Cabello</option>
                <option value="3">Maquillaje</option>
                <option value="4">Skincare</option>
              </select>
            </div>

            {/* Proveedor */}
            <div className="campo">
              <label>Proveedor</label>
              <select name="idProveedor" value={producto.idProveedor} onChange={manejarCambio}>
                <option value="">Seleccionar...</option>
                <option value="1">Proveedor A</option>
                <option value="2">Proveedor B</option>
              </select>
            </div>

            {/* Precio de venta */}
            <div className="campo">
              <label>Precio Venta (COP) *</label>
              <input
                type="number"
                name="precioVenta"
                value={producto.precioVenta}
                onChange={manejarCambio}
                placeholder="0"
                min="0"
              />
            </div>

            {/* Stock actual */}
            <div className="campo">
              <label>Stock Actual *</label>
              <input
                type="number"
                name="stockActual"
                value={producto.stockActual}
                onChange={manejarCambio}
                placeholder="0"
                min="0"
              />
            </div>

            {/* Stock minimo */}
            <div className="campo">
              <label>Stock Mínimo</label>
              <input
                type="number"
                name="stockMinimo"
                value={producto.stockMinimo}
                onChange={manejarCambio}
                placeholder="0"
                min="0"
              />
            </div>

            {/* Estado */}
            <div className="campo">
              <label>Estado</label>
              <select name="estado" value={producto.estado} onChange={manejarCambio}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          {/* Botones de accion */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="submit" className="btn-primario">
              {modoEdicion ? 'Actualizar Producto' : 'Guardar Producto'}
            </button>
            <button
              type="button"
              className="btn-secundario"
              onClick={() => navigate('/productos')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormProducto;
