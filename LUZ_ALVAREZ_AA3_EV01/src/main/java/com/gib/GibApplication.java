package com.gib;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal del sistema GIB con Spring Boot.
 * Punto de entrada de la aplicacion web.
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
@SpringBootApplication
public class GibApplication {

    /**
     * Metodo principal que inicia la aplicacion Spring Boot.
     * @param args argumentos de linea de comandos
     */
    public static void main(String[] args) {
        SpringApplication.run(GibApplication.class, args);
        System.out.println("===========================================");
        System.out.println("  GIB - Gestion de Inventarios de Belleza ");
        System.out.println("  Cosmeticos Kitty - Spring Boot           ");
        System.out.println("  http://localhost:8080                    ");
        System.out.println("===========================================");
    }
}
