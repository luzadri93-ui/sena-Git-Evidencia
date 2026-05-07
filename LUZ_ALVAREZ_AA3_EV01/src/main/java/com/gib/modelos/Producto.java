package com.gib.modelos;

import jakarta.persistence.*;

/**
 * Entidad JPA que representa un producto del inventario GIB.
 * Se mapea a la tabla "productos" de la base de datos stock_master_db.
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private int idProducto;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @Column(name = "id_categoria")
    private int idCategoria;

    @Column(name = "id_proveedor")
    private int idProveedor;

    @Column(name = "precio_venta")
    private Double precioVenta;

    @Column(name = "stock_actual")
    private Integer stockActual;

    @Column(name = "stock_minimo")
    private Integer stockMinimo;

    @Column(name = "estado", length = 10)
    private String estado;

    public Producto() {}

    public int     getIdProducto()  { return idProducto; }
    public void    setIdProducto(int idProducto) { this.idProducto = idProducto; }
    public String  getNombre()      { return nombre; }
    public void    setNombre(String nombre) { this.nombre = nombre; }
    public int     getIdCategoria() { return idCategoria; }
    public void    setIdCategoria(int idCategoria) { this.idCategoria = idCategoria; }
    public int     getIdProveedor() { return idProveedor; }
    public void    setIdProveedor(int idProveedor) { this.idProveedor = idProveedor; }
    public Double  getPrecioVenta() { return precioVenta; }
    public void    setPrecioVenta(Double precioVenta) { this.precioVenta = precioVenta; }
    public Integer getStockActual() { return stockActual; }
    public void    setStockActual(Integer stockActual) { this.stockActual = stockActual; }
    public Integer getStockMinimo() { return stockMinimo; }
    public void    setStockMinimo(Integer stockMinimo) { this.stockMinimo = stockMinimo; }
    public String  getEstado()      { return estado; }
    public void    setEstado(String estado) { this.estado = estado; }
}