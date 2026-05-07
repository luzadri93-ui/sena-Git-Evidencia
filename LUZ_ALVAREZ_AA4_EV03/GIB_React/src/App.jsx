/**
 * Componente raiz de la aplicacion GIB
 * Gestiona la navegacion entre modulos del sistema:
 * - Login / Autenticacion
 * - Dashboard principal
 * - Gestion de Inventario (Historia de Usuario #1)
 * - Gestion de Pedidos (Historia de Usuario #2)
 * - Gestion de Clientes (Historia de Usuario #3)
 * - Gestion de Proveedores (Historia de Usuario #4)
 * - Reportes y Analisis (Historia de Usuario #5)
 * 
 * Basado en: Diagrama de clases UML, Casos de uso y Especificacion de requerimientos
 * Proyecto: Cosmeticos Kitty - Ficha 3070319
 */
import React, { useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Inventario from './components/Inventario';
import Pedidos from './components/Pedidos';
import Clientes from './components/Clientes';
import Proveedores from './components/Proveedores';
import Reportes from './components/Reportes';
import './App.css';

/**
 * Componente App - Componente raiz que maneja el estado de autenticacion
 * y la navegacion entre modulos del sistema GIB
 */
function App() {
  // Estado de autenticacion del usuario (CU-Login / Control de acceso)
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  
  // Modulo activo en la navegacion
  const [moduloActivo, setModuloActivo] = useState('dashboard');

  /**
   * Maneja el inicio de sesion del usuario
   * @param {Object} usuario - Datos del usuario autenticado (nombre, rol)
   */
  const handleLogin = (usuario) => {
    setUsuarioAutenticado(usuario);
    setModuloActivo('dashboard');
  };

  /**
   * Maneja el cierre de sesion del usuario
   * Limpia el estado y regresa al login
   */
  const handleLogout = () => {
    setUsuarioAutenticado(null);
    setModuloActivo('dashboard');
  };

  /**
   * Renderiza el modulo activo segun la navegacion
   * Basado en los modulos del diagrama de paquetes UML
   */
  const renderizarModulo = () => {
    switch (moduloActivo) {
      case 'dashboard':
        return <Dashboard usuario={usuarioAutenticado} />;
      case 'inventario':
        return <Inventario usuario={usuarioAutenticado} />;
      case 'pedidos':
        return <Pedidos usuario={usuarioAutenticado} />;
      case 'clientes':
        return <Clientes usuario={usuarioAutenticado} />;
      case 'proveedores':
        return <Proveedores usuario={usuarioAutenticado} />;
      case 'reportes':
        return <Reportes usuario={usuarioAutenticado} />;
      default:
        return <Dashboard usuario={usuarioAutenticado} />;
    }
  };

  // Si no hay usuario autenticado, mostrar pantalla de Login
  if (!usuarioAutenticado) {
    return <Login onLogin={handleLogin} />;
  }

  // Si hay usuario autenticado, mostrar el sistema completo
  return (
    <div className="app-container">
      {/* Barra de navegacion lateral */}
      <Navbar
        usuario={usuarioAutenticado}
        moduloActivo={moduloActivo}
        onNavegar={setModuloActivo}
        onLogout={handleLogout}
      />
      {/* Contenido principal del modulo activo */}
      <main className="contenido-principal">
        {renderizarModulo()}
      </main>
    </div>
  );
}

export default App;
