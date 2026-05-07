/**
 * Componente Navbar - Barra de navegacion lateral del sistema GIB
 * 
 * Basado en:
 * - Diagrama de paquetes UML: GestionUsuarios, GestionInventario, 
 *   GestionPedidos, GestionClientes, GestionProveedores, Reportes
 * - RF: Control de acceso - permisos por rol
 * - Roles: Administrador (acceso total), Vendedor, Almacen
 * 
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 */
import React from 'react';
import './Navbar.css';

/**
 * Definicion de items de navegacion por modulo
 * Cada modulo corresponde a un paquete del diagrama UML
 */
const ITEMS_NAVEGACION = [
  {
    id: 'dashboard',
    icono: '🏠',
    etiqueta: 'Dashboard',
    roles: ['Administrador', 'Vendedor', 'Almacen'] // Todos los roles
  },
  {
    id: 'inventario',
    icono: '📦',
    etiqueta: 'Inventario',
    roles: ['Administrador', 'Almacen'] // CU-001, CU-002, CU-005
  },
  {
    id: 'pedidos',
    icono: '🛒',
    etiqueta: 'Pedidos',
    roles: ['Administrador', 'Vendedor'] // CU-003 - Historia #2
  },
  {
    id: 'clientes',
    icono: '👥',
    etiqueta: 'Clientes',
    roles: ['Administrador', 'Vendedor'] // Historia de usuario #3
  },
  {
    id: 'proveedores',
    icono: '🚚',
    etiqueta: 'Proveedores',
    roles: ['Administrador'] // Historia de usuario #4
  },
  {
    id: 'reportes',
    icono: '📊',
    etiqueta: 'Reportes',
    roles: ['Administrador'] // CU-004, Historia de usuario #5
  }
];

/**
 * Componente Navbar
 * Barra de navegacion lateral con control de acceso por rol
 * 
 * @param {Object} usuario - Usuario autenticado con nombre y rol
 * @param {string} moduloActivo - ID del modulo activo
 * @param {Function} onNavegar - Callback para cambiar de modulo
 * @param {Function} onLogout - Callback para cerrar sesion
 */
function Navbar({ usuario, moduloActivo, onNavegar, onLogout }) {
  /**
   * Filtra los items de navegacion segun el rol del usuario
   * Implementa el control de acceso por roles definido en la especificacion
   */
  const itemsPermitidos = ITEMS_NAVEGACION.filter(
    item => item.roles.includes(usuario?.rol)
  );

  return (
    <nav className="navbar">
      {/* Encabezado del sistema */}
      <div className="navbar-encabezado">
        <div className="navbar-logo">💄</div>
        <div className="navbar-marca">
          <span className="navbar-nombre-sistema">GIB</span>
          <span className="navbar-empresa">Cosméticos Kitty</span>
        </div>
      </div>

      {/* Informacion del usuario autenticado */}
      <div className="navbar-usuario">
        <div className="navbar-avatar">
          {usuario?.nombre?.charAt(0) || 'U'}
        </div>
        <div className="navbar-usuario-info">
          <span className="navbar-usuario-nombre">{usuario?.nombre}</span>
          <span className={`navbar-usuario-rol rol-${usuario?.rol?.toLowerCase()}`}>
            {usuario?.rol}
          </span>
        </div>
      </div>

      {/* Separador */}
      <div className="navbar-separador" />

      {/* Items de navegacion */}
      <ul className="navbar-menu">
        {itemsPermitidos.map((item) => (
          <li key={item.id}>
            <button
              className={`navbar-item ${moduloActivo === item.id ? 'navbar-item-activo' : ''}`}
              onClick={() => onNavegar(item.id)}
              title={item.etiqueta}
            >
              <span className="navbar-item-icono">{item.icono}</span>
              <span className="navbar-item-etiqueta">{item.etiqueta}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Boton de cerrar sesion */}
      <div className="navbar-pie">
        <div className="navbar-separador" />
        <button className="navbar-logout" onClick={onLogout}>
          <span>🚪</span>
          <span>Cerrar Sesión</span>
        </button>
        <p className="navbar-version">GIB v1.0 · Ficha 3070319</p>
      </div>
    </nav>
  );
}

export default Navbar;
