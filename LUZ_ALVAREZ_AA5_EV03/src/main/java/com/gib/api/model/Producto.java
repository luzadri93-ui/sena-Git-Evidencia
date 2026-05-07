package com.gib.api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Entidad Producto - Clase del diagrama UML del sistema GIB.
 *
 * Atributos segun diagrama de clases:
 * Producto (id, nombre, precio, cantidad, fechaVencimiento)
 *
 * Historia de Usuario #1: Gestion de inventario
 * RF: Agregar, actualizar, eliminar y consultar productos
 *
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 */
@Entity
@Table(name = "productos_gib")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long idProducto;

    /** Codigo unico del producto - UNIQUE */
    @Column(name = "codigo_producto", nullable = false, unique = true, length = 50)
    private String codigoProducto;

    /** Nombre del producto - NOT NULL */
    @Column(name = "nombre_producto", nullable = false, length = 200)
    private String nombreProducto;

    /** Descripcion detallada del producto */
    @Column(name = "descripcion", length = 500)
    private String descripcion;

    /** Categoria del producto (Cabello, Maquillaje, Cuidado Piel, etc.) */
    @Column(name = "categoria", nullable = false, length = 100)
    private String categoria;

    /** Nombre del proveedor del producto */
    @Column(name = "proveedor", length = 150)
    private String proveedor;

    /** Precio de venta - CHECK precio >= 0 */
    @Column(name = "precio_venta", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioVenta;

    /** Stock actual disponible - CHECK stock >= 0 */
    @Column(name = "stock_actual", nullable = false)
    private Integer stockActual = 0;

    /** Stock minimo para generar alerta (CU-005) */
    @Column(name = "stock_minimo", nullable = false)
    private Integer stockMinimo = 10;

    /** Fecha de vencimiento del producto */
    @Column(name = "fecha_vencimiento")
    private LocalDate fechaVencimiento;

    /** Estado del producto: activo o inactivo - DEFAULT activo */
    @Column(name = "estado", nullable = false, length = 10)
    private String estado = "activo";

    // ===== CONSTRUCTORES =====

    public Producto() {}

    public Producto(String codigoProducto, String nombreProducto, String categoria,
                    String proveedor, BigDecimal precioVenta, Integer stockActual,
                    Integer stockMinimo, LocalDate fechaVencimiento) {
        this.codigoProducto  = codigoProducto;
        this.nombreProducto  = nombreProducto;
        this.categoria       = categoria;
        this.proveedor       = proveedor;
        this.precioVenta     = precioVenta;
        this.stockActual     = stockActual;
        this.stockMinimo     = stockMinimo;
        this.fechaVencimiento = fechaVencimiento;
        this.estado          = "activo";
    }

    // ===== GETTERS Y SETTERS =====

    public Long getIdProducto()                       { return idProducto; }
    public void setIdProducto(Long idProducto)        { this.idProducto = idProducto; }

    public String getCodigoProducto()                         { return codigoProducto; }
    public void setCodigoProducto(String codigoProducto)      { this.codigoProducto = codigoProducto; }

    public String getNombreProducto()                         { return nombreProducto; }
    public void setNombreProducto(String nombreProducto)      { this.nombreProducto = nombreProducto; }

    public String getDescripcion()                    { return descripcion; }
    public void setDescripcion(String descripcion)    { this.descripcion = descripcion; }

    public String getCategoria()                      { return categoria; }
    public void setCategoria(String categoria)        { this.categoria = categoria; }

    public String getProveedor()                      { return proveedor; }
    public void setProveedor(String proveedor)        { this.proveedor = proveedor; }

    public BigDecimal getPrecioVenta()                        { return precioVenta; }
    public void setPrecioVenta(BigDecimal precioVenta)        { this.precioVenta = precioVenta; }

    public Integer getStockActual()                   { return stockActual; }
    public void setStockActual(Integer stockActual)   { this.stockActual = stockActual; }

    public Integer getStockMinimo()                   { return stockMinimo; }
    public void setStockMinimo(Integer stockMinimo)   { this.stockMinimo = stockMinimo; }

    public LocalDate getFechaVencimiento()                        { return fechaVencimiento; }
    public void setFechaVencimiento(LocalDate fechaVencimiento)   { this.fechaVencimiento = fechaVencimiento; }

    public String getEstado()             { return estado; }
    public void setEstado(String estado)  { this.estado = estado; }
}
