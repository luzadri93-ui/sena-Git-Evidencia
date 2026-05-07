package com.gib.repositorios;

import com.gib.modelos.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositorio Spring Data JPA para la entidad Producto.
 * Proporciona operaciones CRUD automaticas sin necesidad de SQL manual.
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, Integer> {

    /**
     * Busca productos por su estado (activo/inactivo).
     * @param estado estado del producto a buscar
     * @return lista de productos con ese estado
     */
    List<Producto> findByEstado(String estado);

    /**
     * Busca productos cuyo stock actual sea menor al stock minimo.
     * Usado para generar alertas de stock bajo.
     * @return lista de productos con stock bajo
     */
    List<Producto> findByStockActualLessThan(int stockMinimo);
}
