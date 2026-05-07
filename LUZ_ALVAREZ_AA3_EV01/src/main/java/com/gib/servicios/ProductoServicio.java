package com.gib.servicios;

import com.gib.modelos.Producto;
import com.gib.repositorios.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Servicio que contiene la logica de negocio para la gestion de productos.
 * Actua como intermediario entre el controlador y el repositorio.
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
@Service
public class ProductoServicio {

    // Inyeccion de dependencia del repositorio
    @Autowired
    private ProductoRepositorio productoRepositorio;

    /**
     * Obtiene la lista de todos los productos del inventario.
     * @return lista completa de productos
     */
    public List<Producto> listarTodos() {
        return productoRepositorio.findAll();
    }

    /**
     * Busca un producto por su ID.
     * @param idProducto ID del producto a buscar
     * @return Optional con el producto si existe
     */
    public Optional<Producto> buscarPorId(int idProducto) {
        return productoRepositorio.findById(idProducto);
    }

    /**
     * Guarda un nuevo producto o actualiza uno existente.
     * @param producto objeto Producto a guardar
     * @return producto guardado con su ID asignado
     */
    public Producto guardar(Producto producto) {
        return productoRepositorio.save(producto);
    }

    /**
     * Elimina un producto por su ID.
     * @param idProducto ID del producto a eliminar
     */
    public void eliminar(int idProducto) {
        productoRepositorio.deleteById(idProducto);
    }

    /**
     * Obtiene productos con stock bajo (menor al minimo).
     * @return lista de productos con stock critico
     */
    public List<Producto> obtenerStockBajo() {
        return productoRepositorio.findByStockActualLessThan(10);
    }
}
