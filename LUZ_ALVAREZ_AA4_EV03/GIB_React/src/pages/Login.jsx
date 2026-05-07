/**
 * Login.jsx - Pagina de autenticacion del sistema GIB
 * Permite al usuario ingresar sus credenciales para acceder al sistema
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de login con validacion de credenciales
 * Redirige al dashboard si las credenciales son correctas
 */
function Login() {
  // Estado para los campos del formulario
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // Hook de navegacion para redirigir al dashboard
  const navigate = useNavigate();

  /**
   * Maneja el envio del formulario de login
   * Valida las credenciales y redirige si son correctas
   * @param {Event} e - Evento de submit del formulario
   */
  const manejarLogin = (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    // Validacion de campos vacios
    if (!usuario.trim() || !clave.trim()) {
      setError('Por favor ingresa usuario y contraseña.');
      setCargando(false);
      return;
    }

    // Credenciales del sistema (en produccion se validan con la API)
    if (usuario === 'adriana' && clave === '1234') {
      // Guardar sesion en localStorage
      localStorage.setItem('usuario', usuario);
      localStorage.setItem('autenticado', 'true');
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos. Intenta de nuevo.');
    }

    setCargando(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #880E4F, #E91E8C)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        width: '380px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ color: '#E91E8C', fontSize: '2.5rem', fontWeight: '900' }}>GIB</h1>
          <p style={{ color: '#777', fontSize: '13px' }}>Gestión de Inventarios de Belleza</p>
          <p style={{ color: '#999', fontSize: '12px' }}>Cosméticos Kitty</p>
        </div>

        <h2 style={{ color: '#333', marginBottom: '6px' }}>Bienvenida</h2>
        <p style={{ color: '#999', fontSize: '13px', marginBottom: '24px' }}>
          Inicia sesión para acceder al sistema
        </p>

        {/* Mensaje de error */}
        {error && (
          <div style={{
            background: '#FEE2E2', color: '#991B1B',
            padding: '10px', borderRadius: '8px',
            marginBottom: '16px', fontSize: '13px'
          }}>
            {error}
          </div>
        )}

        {/* Formulario de login */}
        <form onSubmit={manejarLogin}>
          <div className="campo" style={{ marginBottom: '18px' }}>
            <label>Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="campo" style={{ marginBottom: '18px' }}>
            <label>Contraseña</label>
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button
            type="submit"
            className="btn-primario"
            style={{ width: '100%', padding: '13px' }}
            disabled={cargando}
          >
            {cargando ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
