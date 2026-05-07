package com.gib.api.controller;

import com.gib.api.model.Pedido;
import com.gib.api.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Controlador REST para Gestion de Pedidos - Historia de Usuario #2
 * CU-003: Crear pedido - Actor: Vendedor
 *
 * ENDPOINTS:
 * GET  /api/pedidos             - Listar pedidos
 * GET  /api/pedidos/{id}        - Obtener pedido
 * GET  /api/pedidos/estado/{e}  - Filtrar por estado
 * POST /api/pedidos             - Crear nuevo pedido
 * PUT  /api/pedidos/{id}/estado - Cambiar estado del pedido
 *
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080", "http://localhost:8081"})
public class PedidoControlador {

    @Autowired
    private PedidoRepository pedidoRepository;

    /** GET /api/pedidos - Listar todos los pedidos */
    @GetMapping
    public ResponseEntity<List<Pedido>> listar() {
        return ResponseEntity.ok(pedidoRepository.findAll());
    }

    /** GET /api/pedidos/{id} - Obtener pedido por ID */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Long id) {
        Optional<Pedido> p = pedidoRepository.findById(id);
        if (p.isPresent()) return ResponseEntity.ok(p.get());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
               .body(Map.of("exito", false, "mensaje", "Pedido no encontrado"));
    }

    /** GET /api/pedidos/estado/{estado} - Filtrar por estado */
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Pedido>> porEstado(@PathVariable String estado) {
        return ResponseEntity.ok(pedidoRepository.findByEstado(estado));
    }

    /**
     * POST /api/pedidos - Crear nuevo pedido
     * HU#2: El estado inicial siempre es "pendiente"
     * HU#2: Validar que el cliente exista antes de registrar
     */
    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody Pedido pedido) {
        if (pedido.getNombreCliente() == null || pedido.getNombreCliente().isBlank())
            return ResponseEntity.badRequest()
                   .body(Map.of("exito", false, "mensaje", "El nombre del cliente es obligatorio"));
        if (pedido.getProducto() == null || pedido.getProducto().isBlank())
            return ResponseEntity.badRequest()
                   .body(Map.of("exito", false, "mensaje", "El producto es obligatorio"));

        // Estado inicial siempre "pendiente" (criterio de aceptacion HU#2)
        pedido.setEstado("pendiente");
        pedido.setFechaPedido(LocalDateTime.now());

        // Generar numero de pedido automaticamente
        String numeroPedido = "PED-" + System.currentTimeMillis();
        pedido.setNumeroPedido(numeroPedido);

        Pedido guardado = pedidoRepository.save(pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    /**
     * PUT /api/pedidos/{id}/estado - Cambiar estado del pedido
     * Estados validos: pendiente, completado, cancelado
     */
    @PutMapping("/{id}/estado")
    public ResponseEntity<?> cambiarEstado(@PathVariable Long id,
                                            @RequestBody Map<String, String> body) {
        Optional<Pedido> existente = pedidoRepository.findById(id);
        if (existente.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                   .body(Map.of("exito", false, "mensaje", "Pedido no encontrado"));

        String nuevoEstado = body.get("estado");
        if (nuevoEstado == null || nuevoEstado.isBlank())
            return ResponseEntity.badRequest()
                   .body(Map.of("exito", false, "mensaje", "El estado es requerido"));

        Pedido pedido = existente.get();
        pedido.setEstado(nuevoEstado);
        return ResponseEntity.ok(pedidoRepository.save(pedido));
    }
}
