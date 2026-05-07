package com.gib.servlets;

import com.gib.dao.ProductoDAO;
import com.gib.modelos.Producto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * Servlet que gestiona las operaciones CRUD de productos del sistema GIB.
 * Maneja peticiones GET para consultar y POST para insertar y eliminar.
 *
 * Acciones disponibles:
 * - GET  accion=listar   → muestra lista de productos
 * - POST accion=insertar → registra nuevo producto
 * - POST accion=eliminar → elimina producto por ID
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
public class ProductoServlet extends HttpServlet {

    // Instancia del DAO para acceso a datos
    private ProductoDAO productoDAO;

    /**
     * Inicializa el servlet creando la instancia del DAO.
     */
    @Override
    public void init() throws ServletException {
        productoDAO = new ProductoDAO();
    }

    /**
     * Metodo GET — consulta y lista todos los productos.
     * Verifica que el usuario este autenticado antes de mostrar datos.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Verificar autenticacion
        if (!estaAutenticado(request)) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        // Obtener lista de productos y enviar a la vista JSP
        List<Producto> listaProductos = productoDAO.consultarTodos();
        request.setAttribute("listaProductos", listaProductos);
        request.getRequestDispatcher("/jsp/productos.jsp").forward(request, response);
    }

    /**
     * Metodo POST — procesa acciones de insercion y eliminacion.
     * Lee el parametro "accion" para determinar que operacion ejecutar.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Verificar autenticacion
        if (!estaAutenticado(request)) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        // Obtener la accion solicitada
        String accion = request.getParameter("accion");

        if ("insertar".equals(accion)) {
            insertarProducto(request, response);
        } else if ("eliminar".equals(accion)) {
            eliminarProducto(request, response);
        } else {
            // Accion desconocida — redirigir a la lista
            response.sendRedirect(request.getContextPath() + "/productos?accion=listar");
        }
    }

    /**
     * Inserta un nuevo producto con los datos del formulario.
     *
     * @param request  peticion HTTP con los parametros del formulario
     * @param response respuesta HTTP para redirigir
     */
    private void insertarProducto(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {
            // Obtener parametros del formulario
            String nombreProducto  = request.getParameter("nombre");
            int    idCategoria     = Integer.parseInt(request.getParameter("categoria"));
            int    idProveedor     = Integer.parseInt(request.getParameter("proveedor"));
            double precioVenta     = Double.parseDouble(request.getParameter("precioVenta"));
            int    stockActual     = Integer.parseInt(request.getParameter("stockActual"));
            int    stockMinimo     = Integer.parseInt(request.getParameter("stockMinimo"));

            // Crear objeto Producto con los datos del formulario
            Producto nuevoProducto = new Producto();
            nuevoProducto.setNombre(nombreProducto);
            nuevoProducto.setIdCategoria(idCategoria);
            nuevoProducto.setIdProveedor(idProveedor);
            nuevoProducto.setPrecioVenta(precioVenta);
            nuevoProducto.setStockActual(stockActual);
            nuevoProducto.setStockMinimo(stockMinimo);
            nuevoProducto.setEstado("activo");

            // Ejecutar la insercion
            boolean resultado = productoDAO.insertarProducto(nuevoProducto);

            if (resultado) {
                request.setAttribute("mensaje", "Producto registrado correctamente.");
            } else {
                request.setAttribute("error", "Error al registrar el producto.");
            }

        } catch (NumberFormatException e) {
            request.setAttribute("error", "Error en los datos ingresados. Verifica los campos numericos.");
        }

        // Recargar la lista y volver a la vista
        List<Producto> listaProductos = productoDAO.consultarTodos();
        request.setAttribute("listaProductos", listaProductos);
        request.getRequestDispatcher("/jsp/productos.jsp").forward(request, response);
    }

    /**
     * Elimina un producto por su ID.
     *
     * @param request  peticion HTTP con el ID del producto
     * @param response respuesta HTTP para redirigir
     */
    private void eliminarProducto(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {
            int idProducto = Integer.parseInt(request.getParameter("idProducto"));
            boolean resultado = productoDAO.eliminarProducto(idProducto);

            if (resultado) {
                request.setAttribute("mensaje", "Producto eliminado correctamente.");
            } else {
                request.setAttribute("error", "No se encontro el producto a eliminar.");
            }

        } catch (NumberFormatException e) {
            request.setAttribute("error", "ID de producto invalido.");
        }

        // Recargar la lista y volver a la vista
        List<Producto> listaProductos = productoDAO.consultarTodos();
        request.setAttribute("listaProductos", listaProductos);
        request.getRequestDispatcher("/jsp/productos.jsp").forward(request, response);
    }

    /**
     * Verifica si el usuario tiene sesion activa.
     *
     * @param request peticion HTTP con la sesion
     * @return true si esta autenticado, false si no
     */
    private boolean estaAutenticado(HttpServletRequest request) {
        HttpSession sesion = request.getSession(false);
        return sesion != null && Boolean.TRUE.equals(sesion.getAttribute("autenticado"));
    }
}
