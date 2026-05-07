/**
 * Navbar.jsx - Barra de navegacion principal del sistema GIB
 * Muestra el menu de navegacion con enlaces a las secciones principales
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente de navegacion principal
 * Muestra el logo de GIB y los enlaces a las secciones del sistema
 */
function Navbar() {
  // Obtiene la ruta actual para resaltar el enlace activo
  const location = useLocation();

  // No mostrar navbar en la pantalla de login
  if (location.pathname === '/login') return null;

  return (
    <nav style={{
      background: '#1A1D2E',
      padding: '16px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Logo del sistema */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: '#E91E8C', fontSize: '24px', fontWeight: '900' }}>GIB</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
          Cosméticos Kitty
        </span>
      </div>

      {/* Enlaces de navegacion */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { ruta: '/dashboard', etiqueta: 'Dashboard' },
          { ruta: '/productos', etiqueta: 'Inventario' },
        ].map(({ ruta, etiqueta }) => (
          <Link
            key={ruta}
            to={ruta}
            style={{
              color: location.pathname === ruta ? '#E91E8C' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              background: location.pathname === ruta ? 'rgba(233,30,140,0.1)' : 'transparent',
              fontWeight: location.pathname === ruta ? 'bold' : 'normal'
            }}
          >
            {etiqueta}
          </Link>
        ))}

        {/* Boton cerrar sesion */}
        <Link
          to="/login"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            background: '#E91E8C'
          }}
        >
          Salir
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
