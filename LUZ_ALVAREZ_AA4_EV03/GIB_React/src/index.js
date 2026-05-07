/**
 * Punto de entrada principal de la aplicacion GIB
 * Sistema de Gestion de Inventario de Belleza - Cosmeticos Kitty
 * 
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 * @version 1.0
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Renderiza el componente raiz en el elemento con id "root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
