package com.gib.api.controller;

import com.gib.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/**
 * Controlador REST para Reportes y Analisis - Historia de Usuario #5
 * CU-004: Generar reportes de ventas - Actor: Administrador
 *
 * ENDPOINTS:
 * GET /api/reportes/resumen     - Resumen general del sistema
 * GET /api/reportes/stock-bajo  - Productos con stock bajo (CU-005)
 * GET /api/reportes/pedidos     - Resumen de pedidos por estado
 * GET /api/reportes/inventario  - Estado completo del inventario
 *
 * @author Luz Adriana Alvarez Garcia - Ficha 3070319
 */
@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080", "http://localhost:8081"})
public class ReporteControlador {

    @Autowired private ProductoRepository  productoRepository;
    @Autowired private ClienteRepository   clienteRepository;
    @Autowired private ProveedorRepository proveedorRepository;
    @Autowired private PedidoRepository    pedidoRepository;

    /**
     * GET /api/reportes/resumen
     * Resumen general del sistema GIB - Dashboard KPIs
     * CU-004: Generar reportes para evaluar rendimiento del negocio
     */
    @GetMapping("/resumen")
    public ResponseEntity<Map<String, Object>> resumenGeneral() {
        Map<String, Object> resumen = new HashMap<>();
        resumen.put("totalProductos",      productoRepository.count());
        resumen.put("totalClientes",       clienteRepository.count());
        resumen.put("totalProveedores",    proveedorRepository.count());
        resumen.put("totalPedidos",        pedidoRepository.count());
        resumen.put("pedidosPendientes",   pedidoRepository.findByEstado("pendiente").size());
        resumen.put("pedidosCompletados",  pedidoRepository.findByEstado("completado").size());
        resumen.put("stockBajoAlertas",    productoRepository.findProductosConStockBajo().size());
        resumen.put("mensaje", "Reporte generado exitosamente - Sistema GIB Cosmeticos Kitty");
        return ResponseEntity.ok(resumen);
    }

    /**
     * GET /api/reportes/stock-bajo
     * Reporte de productos con stock bajo
     * CU-005: Ver alertas de stock bajo - Se generan automaticamente
     */
    @GetMapping("/stock-bajo")
    public ResponseEntity<Map<String, Object>> reporteStockBajo() {
        var productos = productoRepository.findProductosConStockBajo();
        Map<String, Object> reporte = new HashMap<>();
        reporte.put("titulo",       "Reporte de Stock Bajo - Sistema GIB");
        reporte.put("totalAlertas", productos.size());
        reporte.put("productos",    productos);
        reporte.put("mensaje", productos.isEmpty()
            ? "No hay productos con stock bajo"
            : productos.size() + " productos requieren reabastecimiento urgente");
        return ResponseEntity.ok(reporte);
    }

    /**
     * GET /api/reportes/pedidos
     * Reporte de pedidos por estado
     * HU#5: Analisis del inventario y pedidos
     */
    @GetMapping("/pedidos")
    public ResponseEntity<Map<String, Object>> reportePedidos() {
        Map<String, Object> reporte = new HashMap<>();
        reporte.put("titulo",            "Reporte de Pedidos - Sistema GIB");
        reporte.put("totalPedidos",      pedidoRepository.count());
        reporte.put("pendientes",        pedidoRepository.findByEstado("pendiente"));
        reporte.put("completados",       pedidoRepository.findByEstado("completado"));
        reporte.put("cancelados",        pedidoRepository.findByEstado("cancelado"));
        reporte.put("totalPendientes",   pedidoRepository.findByEstado("pendiente").size());
        reporte.put("totalCompletados",  pedidoRepository.findByEstado("completado").size());
        reporte.put("totalCancelados",   pedidoRepository.findByEstado("cancelado").size());
        return ResponseEntity.ok(reporte);
    }

    /**
     * GET /api/reportes/inventario
     * Estado completo del inventario
     * RF: Generar reporte de inventario con cantidades y valores
     */
    @GetMapping("/inventario")
    public ResponseEntity<Map<String, Object>> reporteInventario() {
        var productos = productoRepository.findAll();
        Map<String, Object> reporte = new HashMap<>();
        reporte.put("titulo",        "Reporte de Inventario - Sistema GIB");
        reporte.put("totalProductos", productos.size());
        reporte.put("productos",      productos);
        reporte.put("stockBajo",      productoRepository.findProductosConStockBajo().size());
        reporte.put("activos",        productoRepository.findByEstado("activo").size());
        return ResponseEntity.ok(reporte);
    }
}
