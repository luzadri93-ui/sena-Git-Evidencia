package com.gib.api.repository;

import com.gib.api.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositorio de Pedidos - CU-003 Historia de Usuario #2
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    /** Buscar pedidos por estado (pendiente, completado, cancelado) */
    List<Pedido> findByEstado(String estado);
    /** Buscar pedidos de un cliente */
    List<Pedido> findByNombreClienteContainingIgnoreCase(String nombreCliente);
    /** Verificar numero de pedido unico */
    boolean existsByNumeroPedido(String numeroPedido);
}
