package com.gib.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Servlet que maneja la autenticacion de usuarios del sistema GIB.
 * Procesa el formulario de inicio de sesion usando metodo POST
 * y redirige al inventario si las credenciales son correctas.
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
public class LoginServlet extends HttpServlet {

    // Credenciales del sistema (en produccion deben estar en BD)
    private static final String USUARIO_VALIDO = "adriana";
    private static final String CLAVE_VALIDA   = "1234";

    /**
     * Metodo GET — muestra el formulario de login.
     * Tambien maneja el cierre de sesion.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String accion = request.getParameter("accion");

        // Cerrar sesion
        if ("logout".equals(accion)) {
            HttpSession sesion = request.getSession(false);
            if (sesion != null) {
                sesion.invalidate();
            }
        }

        // Redirigir al formulario de login
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    /**
     * Metodo POST — procesa las credenciales del formulario.
     * Si son correctas redirige al inventario, si no muestra error.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Obtener parametros del formulario
        String usuario = request.getParameter("usuario");
        String clave   = request.getParameter("clave");

        // Validar que los campos no esten vacios
        if (usuario == null || clave == null ||
            usuario.trim().isEmpty() || clave.trim().isEmpty()) {
            request.setAttribute("error", "Por favor ingresa usuario y contrasena.");
            request.getRequestDispatcher("/index.jsp").forward(request, response);
            return;
        }

        // Verificar credenciales
        if (USUARIO_VALIDO.equals(usuario.trim()) && CLAVE_VALIDA.equals(clave.trim())) {
            // Credenciales correctas — crear sesion
            HttpSession sesion = request.getSession();
            sesion.setAttribute("usuario", usuario);
            sesion.setAttribute("autenticado", true);

            // Redirigir al inventario
            response.sendRedirect(request.getContextPath() + "/productos?accion=listar");

        } else {
            // Credenciales incorrectas — mostrar error
            request.setAttribute("error", "Usuario o contrasena incorrectos. Intenta de nuevo.");
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        }
    }
}
