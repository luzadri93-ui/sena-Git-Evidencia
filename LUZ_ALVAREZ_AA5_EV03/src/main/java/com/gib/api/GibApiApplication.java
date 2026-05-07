package com.gib.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la API REST completa del sistema GIB.
 *
 * Esta API expone todos los servicios del sistema de gestion
 * de inventario de belleza para Cosmeticos Kitty.
 *
 * Modulos disponibles:
 * - /api/productos    : Gestion de productos (HU#1 - CU-001, CU-002)
 * - /api/inventario   : Control de stock y alertas (CU-005)
 * - /api/pedidos      : Gestion de pedidos (HU#2 - CU-003)
 * - /api/clientes     : Gestion de clientes (HU#3)
 * - /api/proveedores  : Gestion de proveedores (HU#4)
 * - /api/reportes     : Reportes y analisis (HU#5 - CU-004)
 *
 * Evidencia: GA7-220501096-AA5-EV03
 * Puerto: 8082
 *
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 * @version 1.0
 */
@SpringBootApplication
public class GibApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(GibApiApplication.class, args);
        System.out.println("==============================================");
        System.out.println("  API GIB - Sistema completo iniciado");
        System.out.println("  Puerto: 8082");
        System.out.println("  Endpoints disponibles:");
        System.out.println("  GET  /api/productos");
        System.out.println("  GET  /api/inventario");
        System.out.println("  GET  /api/pedidos");
        System.out.println("  GET  /api/clientes");
        System.out.println("  GET  /api/proveedores");
        System.out.println("  GET  /api/reportes");
        System.out.println("  Proyecto: Cosmeticos Kitty - Ficha 3070319");
        System.out.println("==============================================");
    }
}
