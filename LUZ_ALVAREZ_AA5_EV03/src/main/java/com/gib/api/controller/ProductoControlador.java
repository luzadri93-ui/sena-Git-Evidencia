package com.gib.api.controller;

import com.gib.api.model.Producto;
import com.gib.api.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Controlador REST para la Gestion de Productos del sistema GIB.
 *
 * Implementa Historia de Usuario #1: Gestion de inventario
 * Casos de uso: CU-001 Registrar producto, CU-002 Modificar/eliminar
 * RF: Agregar, actualizar, eliminar y consultar productos
 *
 * ENDPOINTS:
 * GET    /api/productos           - Listar todos los productos
 * GET    /api/productos/{id}      - Obtener producto por ID
 * GET    /api/productos/buscar    - Buscar por nombre
 * GET    /api/productos/categoria - Filtrar por categoria
 * POST   /api/productos           - Registrar nuevo producto
 * PUT    /api/productos/{id}      - Actualizar producto
 * DELETE /api/productos/{id}      - Eliminar producto
 *
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 */
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080", "http://localhost:8081"})
public class ProductoControlador {

    @Autowired
    private ProductoRepository productoRepository;

    // ================================================================
    // GET /api/productos - Listar todos los productos (RF: Consultar)
    // ================================================================

    /**
     * Lista todos los productos del inventario.
     * RF: Consultar inventario - muestra productos con cantidad y precio
     *
     * @return lista de todos los productos
     */
    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        List<Producto> productos = productoRepository.findAll();
        return ResponseEntity.ok(productos);
    }

    // ================================================================
    // GET /api/productos/{id} - Obtener producto por ID
    // ================================================================

    /**
     * Obtiene un producto especifico por su ID.
     *
     * @param id identificador del producto
     * @return producto encontrado o error 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProducto(@PathVariable Long id) {
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            return ResponseEntity.ok(producto.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
               .body(respuesta(false, "Producto con ID " + id + " no encontrado"));
    }

    // ================================================================
    // GET /api/productos/buscar?nombre=xxx - Buscar por nombre
    // ================================================================

    /**
     * Busca productos por nombre (busqueda parcial).
     *
     * @param nombre texto a buscar en el nombre del producto
     * @return lista de productos que coinciden
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<Producto>> buscarPorNombre(@RequestParam String nombre) {
        List<Producto> productos = productoRepository
            .findByNombreProductoContainingIgnoreCase(nombre);
        return ResponseEntity.ok(productos);
    }

    // ================================================================
    // GET /api/productos/alertas - Productos con stock bajo (CU-005)
    // ================================================================

    /**
     * Lista productos con stock por debajo del minimo.
     * CU-005: Ver alertas de stock bajo - Se generan automaticamente
     *
     * @return lista de productos con stock bajo
     */
    @GetMapping("/alertas")
    public ResponseEntity<?> alertasStockBajo() {
        List<Producto> alertas = productoRepository.findProductosConStockBajo();
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("exito", true);
        respuesta.put("totalAlertas", alertas.size());
        respuesta.put("productos", alertas);
        respuesta.put("mensaje", alertas.isEmpty()
            ? "No hay productos con stock bajo" 
            : alertas.size() + " productos requieren reabastecimiento");
        return ResponseEntity.ok(respuesta);
    }

    // ================================================================
    // POST /api/productos - Registrar nuevo producto (CU-001)
    // ================================================================

    /**
     * Registra un nuevo producto en el inventario.
     * CU-001: Registrar producto
     * Criterio de aceptacion HU#1: no permite duplicados por codigo
     *
     * @param producto datos del nuevo producto
     * @return producto creado o error si ya existe
     */
    @PostMapping
    public ResponseEntity<?> registrarProducto(@RequestBody Producto producto) {
        // Validar campos obligatorios
        if (producto.getNombreProducto() == null || producto.getNombreProducto().isBlank()) {
            return ResponseEntity.badRequest()
                   .body(respuesta(false, "El nombre del producto es obligatorio"));
        }
        if (producto.getCodigoProducto() == null || producto.getCodigoProducto().isBlank()) {
            return ResponseEntity.badRequest()
                   .body(respuesta(false, "El codigo del producto es obligatorio"));
        }

        // Validar que no exista duplicado (criterio de aceptacion HU#1)
        if (productoRepository.existsByCodigoProducto(producto.getCodigoProducto())) {
            return ResponseEntity.badRequest()
                   .body(respuesta(false, "Ya existe un producto con el codigo: " 
                                   + producto.getCodigoProducto()));
        }

        // Guardar el producto
        Producto guardado = productoRepository.save(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    // ================================================================
    // PUT /api/productos/{id} - Actualizar producto (CU-002)
    // ================================================================

    /**
     * Actualiza la informacion de un producto existente.
     * CU-002: Modificar producto
     *
     * @param id      identificador del producto a actualizar
     * @param producto nuevos datos del producto
     * @return producto actualizado o error 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(@PathVariable Long id,
                                                 @RequestBody Producto producto) {
        Optional<Producto> existente = productoRepository.findById(id);
        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                   .body(respuesta(false, "Producto con ID " + id + " no encontrado"));
        }

        // Actualizar los campos del producto
        Producto p = existente.get();
        if (producto.getNombreProducto() != null) p.setNombreProducto(producto.getNombreProducto());
        if (producto.getDescripcion()    != null) p.setDescripcion(producto.getDescripcion());
        if (producto.getCategoria()      != null) p.setCategoria(producto.getCategoria());
        if (producto.getProveedor()      != null) p.setProveedor(producto.getProveedor());
        if (producto.getPrecioVenta()    != null) p.setPrecioVenta(producto.getPrecioVenta());
        if (producto.getStockActual()    != null) p.setStockActual(producto.getStockActual());
        if (producto.getStockMinimo()    != null) p.setStockMinimo(producto.getStockMinimo());
        if (producto.getFechaVencimiento() != null) p.setFechaVencimiento(producto.getFechaVencimiento());
        if (producto.getEstado()         != null) p.setEstado(producto.getEstado());

        Producto actualizado = productoRepository.save(p);
        return ResponseEntity.ok(actualizado);
    }

    // ================================================================
    // DELETE /api/productos/{id} - Eliminar producto (CU-002)
    // ================================================================

    /**
     * Elimina un producto del inventario.
     * CU-002: Eliminar producto
     * RF: Muestra confirmacion antes de eliminar
     *
     * @param id identificador del producto a eliminar
     * @return mensaje de confirmacion o error 404
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                   .body(respuesta(false, "Producto con ID " + id + " no encontrado"));
        }

        String nombre = producto.get().getNombreProducto();
        productoRepository.deleteById(id);
        return ResponseEntity.ok(respuesta(true,
            "Producto '" + nombre + "' eliminado correctamente del inventario"));
    }

    /** Metodo auxiliar para crear respuestas simples */
    private Map<String, Object> respuesta(boolean exito, String mensaje) {
        Map<String, Object> r = new HashMap<>();
        r.put("exito", exito);
        r.put("mensaje", mensaje);
        return r;
    }
}
