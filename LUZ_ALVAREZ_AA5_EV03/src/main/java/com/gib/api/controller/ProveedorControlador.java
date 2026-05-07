package com.gib.api.controller;

import com.gib.api.model.Proveedor;
import com.gib.api.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/**
 * Controlador REST para Gestion de Proveedores - Historia de Usuario #4
 *
 * ENDPOINTS:
 * GET  /api/proveedores      - Listar proveedores
 * GET  /api/proveedores/{id} - Obtener proveedor
 * POST /api/proveedores      - Registrar proveedor
 * PUT  /api/proveedores/{id} - Actualizar proveedor
 *
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080", "http://localhost:8081"})
public class ProveedorControlador {

    @Autowired
    private ProveedorRepository proveedorRepository;

    @GetMapping
    public ResponseEntity<List<Proveedor>> listar() {
        return ResponseEntity.ok(proveedorRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Long id) {
        Optional<Proveedor> p = proveedorRepository.findById(id);
        if (p.isPresent()) return ResponseEntity.ok(p.get());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
               .body(Map.of("exito", false, "mensaje", "Proveedor no encontrado"));
    }

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody Proveedor proveedor) {
        if (proveedor.getNombreProveedor() == null || proveedor.getNombreProveedor().isBlank())
            return ResponseEntity.badRequest()
                   .body(Map.of("exito", false, "mensaje", "El nombre del proveedor es obligatorio"));
        if (proveedor.getNit() != null && proveedorRepository.existsByNit(proveedor.getNit()))
            return ResponseEntity.badRequest()
                   .body(Map.of("exito", false, "mensaje", "Ya existe un proveedor con ese NIT"));
        return ResponseEntity.status(HttpStatus.CREATED).body(proveedorRepository.save(proveedor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Proveedor proveedor) {
        Optional<Proveedor> existente = proveedorRepository.findById(id);
        if (existente.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                   .body(Map.of("exito", false, "mensaje", "Proveedor no encontrado"));
        Proveedor p = existente.get();
        if (proveedor.getNombreProveedor() != null) p.setNombreProveedor(proveedor.getNombreProveedor());
        if (proveedor.getContacto()        != null) p.setContacto(proveedor.getContacto());
        if (proveedor.getTelefono()        != null) p.setTelefono(proveedor.getTelefono());
        if (proveedor.getEmail()           != null) p.setEmail(proveedor.getEmail());
        if (proveedor.getDireccion()       != null) p.setDireccion(proveedor.getDireccion());
        if (proveedor.getEstado()          != null) p.setEstado(proveedor.getEstado());
        return ResponseEntity.ok(proveedorRepository.save(p));
    }
}
