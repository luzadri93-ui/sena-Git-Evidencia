package com.gib.modelos;

/**
 * Clase modelo que representa un producto del inventario GIB.
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 * @ficha 3070319
 */
public class Producto {

    private int    idProducto;
    private String nombre;
    private int    idCategoria;
    private String categoria;
    private int    idProveedor;
    private String proveedor;
    private double precioVenta;
    private int    stockActual;
    private int    stockMinimo;
    private String estado;

    public Producto() {}

    public Producto(int idProducto, String nombre, String categoria,
                    String proveedor, double precioVenta,
                    int stockActual, int stockMinimo, String estado) {
        this.idProducto  = idProducto;
        this.nombre      = nombre;
        this.categoria   = categoria;
        this.proveedor   = proveedor;
        this.precioVenta = precioVenta;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.estado      = estado;
    }

    public int    getIdProducto()  { return idProducto; }
    public void   setIdProducto(int idProducto) { this.idProducto = idProducto; }
    public String getNombre()      { return nombre; }
    public void   setNombre(String nombre) { this.nombre = nombre; }
    public int    getIdCategoria() { return idCategoria; }
    public void   setIdCategoria(int idCategoria) { this.idCategoria = idCategoria; }
    public String getCategoria()   { return categoria; }
    public void   setCategoria(String categoria) { this.categoria = categoria; }
    public int    getIdProveedor() { return idProveedor; }
    public void   setIdProveedor(int idProveedor) { this.idProveedor = idProveedor; }
    public String getProveedor()   { return proveedor; }
    public void   setProveedor(String proveedor) { this.proveedor = proveedor; }
    public double getPrecioVenta() { return precioVenta; }
    public void   setPrecioVenta(double precioVenta) { this.precioVenta = precioVenta; }
    public int    getStockActual() { return stockActual; }
    public void   setStockActual(int stockActual) { this.stockActual = stockActual; }
    public int    getStockMinimo() { return stockMinimo; }
    public void   setStockMinimo(int stockMinimo) { this.stockMinimo = stockMinimo; }
    public String getEstado()      { return estado; }
    public void   setEstado(String estado) { this.estado = estado; }

    @Override
    public String toString() {
        return "Producto{id=" + idProducto + ", nombre='" + nombre + "', precio=$" + precioVenta + "}";
    }
}
