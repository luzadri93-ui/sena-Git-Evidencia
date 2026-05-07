package com.gib.controladores;
 
import com.gib.modelos.Producto;
import com.gib.servicios.ProductoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
 
/**
 * Controlador Spring MVC para la gestion de productos del sistema GIB.
 * Maneja las peticiones HTTP y coordina con el servicio y las vistas Thymeleaf.
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
@Controller
@RequestMapping("/productos")
public class ProductoControlador {
 
    // Inyeccion del servicio de productos
    @Autowired
    private ProductoServicio productoServicio;
 
    /**
     * GET /productos - Lista todos los productos del inventario.
     * @param modelo modelo para pasar datos a la vista
     * @return nombre de la plantilla Thymeleaf
     */
    @GetMapping
    public String listarProductos(Model modelo) {
        modelo.addAttribute("productos", productoServicio.listarTodos());
        modelo.addAttribute("nuevoProducto", new Producto());
        return "productos";
    }
 
    /**
     * POST /productos/guardar - Guarda un nuevo producto o actualiza uno existente.
     * @param producto datos del producto del formulario
     * @return redireccion a la lista de productos
     */
    @PostMapping("/guardar")
    public String guardarProducto(@ModelAttribute Producto producto) {
        if (producto.getEstado() == null || producto.getEstado().isEmpty()) {
            producto.setEstado("activo");
        }
        if (producto.getIdCategoria() == 0) producto.setIdCategoria(1);
        if (producto.getIdProveedor() == 0) producto.setIdProveedor(1);
 
        productoServicio.guardar(producto);
        return "redirect:/productos";
    }
 
    /**
     * GET /productos/editar/{id} - Carga los datos de un producto para editar.
     * @param id ID del producto a editar
     * @param modelo modelo para pasar datos a la vista
     * @return nombre de la plantilla Thymeleaf
     */
   @GetMapping("/editar/{id}")
public String editarProducto(@PathVariable("id") int id, Model modelo) {
    // Buscar producto por ID, si no existe crear uno vacio
    Producto producto = productoServicio.buscarPorId(id)
        .orElse(new Producto());
    modelo.addAttribute("nuevoProducto", producto);
    modelo.addAttribute("productos", productoServicio.listarTodos());
    return "productos";
}
    /**
     * GET /productos/eliminar/{id} - Elimina un producto por ID.
     * @param idProducto ID del producto a eliminar
     * @return redireccion a la lista de productos
     */
    @GetMapping("/eliminar/{id}")
    public String eliminarProducto(@PathVariable("id") int idProducto) {
        productoServicio.eliminar(idProducto);
        return "redirect:/productos";
    }
}