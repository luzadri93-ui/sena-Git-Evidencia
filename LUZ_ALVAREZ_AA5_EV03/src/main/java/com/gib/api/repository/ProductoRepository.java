package com.gib.api.repository;

import com.gib.api.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio de Productos - Acceso a datos de la tabla productos_gib.
 * Historia de Usuario #1 - Gestion de inventario
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    /** Buscar por codigo de producto (para validar duplicados - CU-001) */
    Optional<Producto> findByCodigoProducto(String codigoProducto);

    /** Verificar si existe codigo (para validar antes de registrar) */
    boolean existsByCodigoProducto(String codigoProducto);

    /** Buscar productos por categoria */
    List<Producto> findByCategoria(String categoria);

    /** Buscar productos activos */
    List<Producto> findByEstado(String estado);

    /**
     * Consultar productos con stock bajo (CU-005 - Ver alertas de stock bajo)
     * Retorna productos donde stockActual es menor que stockMinimo
     */
    @Query("SELECT p FROM Producto p WHERE p.stockActual < p.stockMinimo AND p.estado = 'activo'")
    List<Producto> findProductosConStockBajo();

    /** Buscar por nombre (contiene el texto buscado) */
    List<Producto> findByNombreProductoContainingIgnoreCase(String nombre);
}
