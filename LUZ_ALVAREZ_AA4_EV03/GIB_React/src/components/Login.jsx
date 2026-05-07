/**
 * Componente Login - Autenticacion de usuarios del sistema GIB
 * 
 * Basado en:
 * - Caso de uso: Control de acceso (CU-Login)
 * - Clase UML: Autenticacion (usuario: String, rol: String)
 * - RF: Gestion de seguridad y acceso - login y contrasena
 * - Roles del sistema: Administrador, Empleado de ventas, Empleado de almacen
 * 
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 */
import React, { useState } from 'react';
import './Login.css';

/**
 * Componente Login
 * Maneja la autenticacion de usuarios con validacion de credenciales
 * @param {Function} onLogin - Callback que recibe el usuario autenticado
 */
function Login({ onLogin }) {
  // Estado del formulario de login
  const [credenciales, setCredenciales] = useState({
    usuario: '',
    contrasena: ''
  });

  // Estado para mostrar errores de autenticacion
  const [error, setError] = useState('');
  
  // Estado de carga durante la autenticacion
  const [cargando, setCargando] = useState(false);

  /**
   * Usuarios de prueba del sistema GIB
   * En produccion esto se conecta a la API REST de autenticacion
   * Roles definidos en la especificacion de requerimientos:
   * - Administrador: acceso total al sistema
   * - Vendedor: gestion de pedidos y clientes
   * - Almacen: gestion de inventario
   */
  const usuariosSistema = [
    { usuario: 'admin', contrasena: 'Admin123*', nombre: 'Luz Adriana Alvarez', rol: 'Administrador' },
    { usuario: 'vendedor', contrasena: 'Vend123*', nombre: 'Maria Gonzalez', rol: 'Vendedor' },
    { usuario: 'almacen', contrasena: 'Alm123*', nombre: 'Carlos Perez', rol: 'Almacen' }
  ];

  /**
   * Actualiza el estado del formulario cuando el usuario escribe
   * @param {Event} e - Evento de cambio del input
   */
  const handleCambio = (e) => {
    const { name, value } = e.target;
    setCredenciales(prev => ({ ...prev, [name]: value }));
    // Limpia el error cuando el usuario empieza a escribir
    if (error) setError('');
  };

  /**
   * Maneja el envio del formulario de login
   * Valida credenciales y autentica al usuario
   * @param {Event} e - Evento de envio del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    // Validacion de campos vacios (RNF - Usabilidad)
    if (!credenciales.usuario.trim() || !credenciales.contrasena.trim()) {
      setError('Por favor complete todos los campos');
      setCargando(false);
      return;
    }

    // Simulacion de llamada a API (en produccion: fetch a AA5-EV01 API)
    setTimeout(() => {
      const usuarioEncontrado = usuariosSistema.find(
        u => u.usuario === credenciales.usuario && u.contrasena === credenciales.contrasena
      );

      if (usuarioEncontrado) {
        // Autenticacion exitosa - llama al callback del padre
        onLogin({
          nombre: usuarioEncontrado.nombre,
          rol: usuarioEncontrado.rol,
          usuario: usuarioEncontrado.usuario
        });
      } else {
        // Error de autenticacion
        setError('Usuario o contrasena incorrectos. Verifique sus credenciales.');
      }
      setCargando(false);
    }, 800);
  };

  return (
    <div className="login-contenedor">
      {/* Panel decorativo izquierdo */}
      <div className="login-panel-izquierdo">
        <div className="login-decoracion">
          <div className="login-logo-grande">💄</div>
          <h1 className="login-marca">Cosméticos Kitty</h1>
          <p className="login-eslogan">
            Sistema de Gestión de Inventario de Belleza
          </p>
          <div className="login-caracteristicas">
            <div className="login-caracteristica">✨ Control de inventario en tiempo real</div>
            <div className="login-caracteristica">📦 Gestión de pedidos y proveedores</div>
            <div className="login-caracteristica">📊 Reportes y análisis de ventas</div>
            <div className="login-caracteristica">🔐 Acceso seguro por roles</div>
          </div>
        </div>
      </div>

      {/* Panel del formulario de login */}
      <div className="login-panel-derecho">
        <div className="login-formulario-contenedor">
          {/* Logo y titulo */}
          <div className="login-encabezado">
            <div className="login-icono">🏪</div>
            <h2 className="login-titulo">Iniciar Sesión</h2>
            <p className="login-subtitulo">Sistema GIB - Ficha 3070319</p>
          </div>

          {/* Formulario de autenticacion */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Mensaje de error */}
            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            {/* Campo usuario */}
            <div className="login-campo">
              <label htmlFor="usuario">👤 Usuario</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={credenciales.usuario}
                onChange={handleCambio}
                placeholder="Ingrese su usuario"
                autoComplete="username"
              />
            </div>

            {/* Campo contrasena */}
            <div className="login-campo">
              <label htmlFor="contrasena">🔒 Contraseña</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={credenciales.contrasena}
                onChange={handleCambio}
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
              />
            </div>

            {/* Boton de inicio de sesion */}
            <button
              type="submit"
              className="login-boton"
              disabled={cargando}
            >
              {cargando ? '⏳ Verificando...' : '🚀 Iniciar Sesión'}
            </button>
          </form>

          {/* Informacion de usuarios de prueba */}
          <div className="login-ayuda">
            <p className="login-ayuda-titulo">Usuarios de prueba:</p>
            <div className="login-usuario-prueba">
              <span className="badge-rol admin">Admin</span>
              <span>admin / Admin123*</span>
            </div>
            <div className="login-usuario-prueba">
              <span className="badge-rol vendedor">Vendedor</span>
              <span>vendedor / Vend123*</span>
            </div>
            <div className="login-usuario-prueba">
              <span className="badge-rol almacen">Almacén</span>
              <span>almacen / Alm123*</span>
            </div>
          </div>

          <p className="login-pie">
            SENA - Análisis y Desarrollo de Software · 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
