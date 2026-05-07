/**
 * App.jsx - Componente raiz del sistema GIB
 * Gestiona el enrutamiento principal de la aplicacion
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ListaProductos from './pages/ListaProductos';
import FormProducto from './components/FormProducto';
import './App.css';

/**
 * Componente principal de la aplicacion GIB
 * Configura las rutas y la navegacion entre vistas
 */
function App() {
  return (
    <Router>
      <div className="app">
        {/* Barra de navegacion principal */}
        <Navbar />

        {/* Contenido principal con rutas */}
        <main className="contenido-principal">
          <Routes>
            {/* Ruta raiz redirige al login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Ruta de autenticacion */}
            <Route path="/login" element={<Login />} />

            {/* Ruta del panel principal */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Ruta del inventario de productos */}
            <Route path="/productos" element={<ListaProductos />} />

            {/* Ruta para agregar nuevo producto */}
            <Route path="/productos/nuevo" element={<FormProducto />} />

            {/* Ruta para editar producto existente */}
            <Route path="/productos/editar/:id" element={<FormProducto />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
