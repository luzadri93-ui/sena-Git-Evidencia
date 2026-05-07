package com.gib.api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad Pedido - Clase del diagrama UML del sistema GIB.
 *
 * Clase UML: Pedido (id, fecha, estado)
 * Historia de Usuario #2: Gestion de pedidos
 * CU-003: Crear pedido - Actor: Vendedor
 * Criterio: estado inicial "pendiente"
 *
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 */
@Entity
@Table(name = "pedidos_gib")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Long idPedido;

    /** Numero de pedido unico */
    @Column(name = "numero_pedido", nullable = false, unique = true, length = 20)
    private String numeroPedido;

    /** Nombre del cliente que realiza el pedido */
    @Column(name = "nombre_cliente", nullable = false, length = 150)
    private String nombreCliente;

    /** Nombre del vendedor que registra el pedido */
    @Column(name = "vendedor", nullable = false, length = 100)
    private String vendedor;

    /** Producto solicitado */
    @Column(name = "producto", nullable = false, length = 200)
    private String producto;

    /** Cantidad solicitada */
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad = 1;

    /** Total del pedido */
    @Column(name = "total", nullable = false, precision = 12, scale = 2)
    private BigDecimal total = BigDecimal.ZERO;

    /**
     * Estado del pedido.
     * Valores: pendiente, completado, cancelado
     * Segun HU#2: estado inicial siempre "pendiente"
     */
    @Column(name = "estado", nullable = false, length = 15)
    private String estado = "pendiente";

    /** Fecha y hora del pedido */
    @Column(name = "fecha_pedido", nullable = false)
    private LocalDateTime fechaPedido;

    /** Observaciones adicionales */
    @Column(name = "observaciones", length = 300)
    private String observaciones;

    public Pedido() {
        this.fechaPedido = LocalDateTime.now();
        this.estado = "pendiente";
    }

    // Getters y Setters
    public Long getIdPedido()                     { return idPedido; }
    public void setIdPedido(Long v)               { this.idPedido = v; }
    public String getNumeroPedido()               { return numeroPedido; }
    public void setNumeroPedido(String v)         { this.numeroPedido = v; }
    public String getNombreCliente()              { return nombreCliente; }
    public void setNombreCliente(String v)        { this.nombreCliente = v; }
    public String getVendedor()                   { return vendedor; }
    public void setVendedor(String v)             { this.vendedor = v; }
    public String getProducto()                   { return producto; }
    public void setProducto(String v)             { this.producto = v; }
    public Integer getCantidad()                  { return cantidad; }
    public void setCantidad(Integer v)            { this.cantidad = v; }
    public BigDecimal getTotal()                  { return total; }
    public void setTotal(BigDecimal v)            { this.total = v; }
    public String getEstado()                     { return estado; }
    public void setEstado(String v)               { this.estado = v; }
    public LocalDateTime getFechaPedido()         { return fechaPedido; }
    public void setFechaPedido(LocalDateTime v)   { this.fechaPedido = v; }
    public String getObservaciones()              { return observaciones; }
    public void setObservaciones(String v)        { this.observaciones = v; }
}
