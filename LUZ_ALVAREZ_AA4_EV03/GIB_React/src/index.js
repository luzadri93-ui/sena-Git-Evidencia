/**
 * index.js - Punto de entrada principal del sistema GIB
 * Renderiza el componente raiz App en el DOM
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Renderiza la aplicacion en el elemento con id "root" del HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
