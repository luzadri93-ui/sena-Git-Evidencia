package com.gib.api.controller;

import com.gib.api.model.Cliente;
import com.gib.api.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/**
 * Controlador REST para Gestion de Clientes - Historia de Usuario #3
 *
 * ENDPOINTS:
 * GET    /api/clientes      - Listar todos los clientes
 * GET    /api/clientes/{id} - Obtener cliente por ID
 * POST   /api/clientes      - Registrar nuevo cliente
 * PUT    /api/clientes/{id} - Actualizar cliente
 * DELETE /api/clientes/{id} - Eliminar cliente
 *
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080", "http://localhost:8081"})
public class ClienteControlador {

    @Autowired
    private ClienteRepository clienteRepository;

    /** GET /api/clientes - Listar todos los clientes */
    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes() {
        return ResponseEntity.ok(clienteRepository.findAll());
    }

    /** GET /api/clientes/{id} - Obtener cliente por ID */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCliente(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        if (cliente.isPresent()) return ResponseEntity.ok(cliente.get());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
               .body(Map.of("exito", false, "mensaje", "Cliente no encontrado"));
    }

    /** GET /api/clientes/buscar?nombre=xxx - Buscar cliente por nombre */
    @GetMapping("/buscar")
    public ResponseEntity<List<Cliente>> buscarCliente(@RequestParam String nombre) {
        return ResponseEntity.ok(
            clienteRepository.findByNombreClienteContainingIgnoreCase(nombre));
    }

    /**
     * POST /api/clientes - Registrar nuevo cliente
     * Criterio HU#3: validar no duplicados por cedula
     */
    @PostMapping
    public ResponseEntity<?> registrarCliente(@RequestBody Cliente cliente) {
        if (cliente.getNombreCliente() == null || cliente.getNombreCliente().isBlank())
            return ResponseEntity.badRequest()
                   .body(Map.of("exito", false, "mensaje", "El nombre es obligatorio"));
        if (cliente.getNumeroDocumento() == null || cliente.getNumeroDocumento().isBlank())
            return ResponseEntity.badRequest()
                   .body(Map.of("exito", false, "mensaje", "El numero de documento es obligatorio"));
        if (clienteRepository.existsByNumeroDocumento(cliente.getNumeroDocumento()))
            return ResponseEntity.badRequest()
                   .body(Map.of("exito", false, "mensaje",
                       "Ya existe un cliente con documento: " + cliente.getNumeroDocumento()));
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteRepository.save(cliente));
    }

    /** PUT /api/clientes/{id} - Actualizar cliente */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        Optional<Cliente> existente = clienteRepository.findById(id);
        if (existente.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                   .body(Map.of("exito", false, "mensaje", "Cliente no encontrado"));
        Cliente c = existente.get();
        if (cliente.getNombreCliente()  != null) c.setNombreCliente(cliente.getNombreCliente());
        if (cliente.getTelefono()       != null) c.setTelefono(cliente.getTelefono());
        if (cliente.getEmail()          != null) c.setEmail(cliente.getEmail());
        if (cliente.getDireccion()      != null) c.setDireccion(cliente.getDireccion());
        if (cliente.getEstado()         != null) c.setEstado(cliente.getEstado());
        return ResponseEntity.ok(clienteRepository.save(c));
    }

    /** DELETE /api/clientes/{id} - Eliminar cliente */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCliente(@PathVariable Long id) {
        if (!clienteRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                   .body(Map.of("exito", false, "mensaje", "Cliente no encontrado"));
        clienteRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("exito", true, "mensaje", "Cliente eliminado correctamente"));
    }
}
