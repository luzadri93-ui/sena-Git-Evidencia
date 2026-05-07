package com.gib.api.repository;

import com.gib.api.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositorio de Proveedores - Historia de Usuario #4
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    boolean existsByNit(String nit);
    List<Proveedor> findByEstado(String estado);
    List<Proveedor> findByNombreProveedorContainingIgnoreCase(String nombre);
}
