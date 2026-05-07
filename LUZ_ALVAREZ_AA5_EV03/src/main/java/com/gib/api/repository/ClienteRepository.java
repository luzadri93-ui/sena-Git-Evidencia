package com.gib.api.repository;

import com.gib.api.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio de Clientes - Historia de Usuario #3
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    /** Buscar por cedula - para validar duplicados (criterio HU#3) */
    Optional<Cliente> findByNumeroDocumento(String numeroDocumento);
    /** Verificar existencia de cedula */
    boolean existsByNumeroDocumento(String numeroDocumento);
    /** Buscar por nombre */
    List<Cliente> findByNombreClienteContainingIgnoreCase(String nombre);
    /** Buscar clientes activos */
    List<Cliente> findByEstado(String estado);
}
