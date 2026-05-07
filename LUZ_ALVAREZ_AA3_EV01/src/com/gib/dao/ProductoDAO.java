package com.gib.dao;

import com.gib.modelos.Producto;
import com.gib.utilidades.Conexion;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO de productos para la aplicacion web GIB.
 * Gestiona operaciones CRUD mediante JDBC.
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 */
public class ProductoDAO {

    private static final String SQL_INSERTAR =
        "INSERT INTO productos (nombre, id_categoria, id_proveedor, precio_venta, " +
        "stock_actual, stock_minimo, estado) VALUES (?, ?, ?, ?, ?, ?, ?)";

    private static final String SQL_CONSULTAR_TODOS =
        "SELECT p.id_producto, p.nombre, c.nombre_categoria, pr.nombre_empresa, " +
        "p.precio_venta, p.stock_actual, p.stock_minimo, p.estado " +
        "FROM productos p " +
        "JOIN categorias c ON p.id_categoria = c.id_categoria " +
        "JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor";

    private static final String SQL_ELIMINAR =
        "DELETE FROM productos WHERE id_producto = ?";

    public boolean insertarProducto(Producto producto) {
        boolean resultado = false;
        try {
            Connection conexion         = Conexion.obtenerConexion();
            PreparedStatement sentencia = conexion.prepareStatement(SQL_INSERTAR);
            sentencia.setString(1, producto.getNombre());
            sentencia.setInt(2, producto.getIdCategoria());
            sentencia.setInt(3, producto.getIdProveedor());
            sentencia.setDouble(4, producto.getPrecioVenta());
            sentencia.setInt(5, producto.getStockActual());
            sentencia.setInt(6, producto.getStockMinimo());
            sentencia.setString(7, producto.getEstado());
            resultado = sentencia.executeUpdate() > 0;
            sentencia.close();
        } catch (SQLException e) {
            System.out.println("Error al insertar: " + e.getMessage());
        }
        return resultado;
    }

    public List<Producto> consultarTodos() {
        List<Producto> lista = new ArrayList<>();
        try {
            Connection conexion         = Conexion.obtenerConexion();
            PreparedStatement sentencia = conexion.prepareStatement(SQL_CONSULTAR_TODOS);
            ResultSet resultado         = sentencia.executeQuery();
            while (resultado.next()) {
                Producto p = new Producto(
                    resultado.getInt("id_producto"),
                    resultado.getString("nombre"),
                    resultado.getString("nombre_categoria"),
                    resultado.getString("nombre_empresa"),
                    resultado.getDouble("precio_venta"),
                    resultado.getInt("stock_actual"),
                    resultado.getInt("stock_minimo"),
                    resultado.getString("estado")
                );
                lista.add(p);
            }
            resultado.close();
            sentencia.close();
        } catch (SQLException e) {
            System.out.println("Error al consultar: " + e.getMessage());
        }
        return lista;
    }

    public boolean eliminarProducto(int idProducto) {
        boolean resultado = false;
        try {
            Connection conexion         = Conexion.obtenerConexion();
            PreparedStatement sentencia = conexion.prepareStatement(SQL_ELIMINAR);
            sentencia.setInt(1, idProducto);
            resultado = sentencia.executeUpdate() > 0;
            sentencia.close();
        } catch (SQLException e) {
            System.out.println("Error al eliminar: " + e.getMessage());
        }
        return resultado;
    }
}
