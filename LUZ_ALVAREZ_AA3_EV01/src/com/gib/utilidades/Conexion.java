package com.gib.utilidades;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Clase utilitaria para gestionar la conexion a la base de datos MySQL.
 *
 * @author Luz Adriana Alvarez Garcia
 * @version 1.0
 */
public class Conexion {

    private static final String URL     = "jdbc:mysql://localhost:3306/stock_master_db";
    private static final String USUARIO = "root";
    private static final String CLAVE   = "root";
    private static final String DRIVER  = "com.mysql.cj.jdbc.Driver";

    private static Connection conexion = null;

    private Conexion() {}

    public static Connection obtenerConexion() throws SQLException {
        try {
            if (conexion == null || conexion.isClosed()) {
                Class.forName(DRIVER);
                conexion = DriverManager.getConnection(URL, USUARIO, CLAVE);
            }
        } catch (ClassNotFoundException e) {
            throw new SQLException("Driver no encontrado", e);
        }
        return conexion;
    }

    public static void cerrarConexion() {
        try {
            if (conexion != null && !conexion.isClosed()) {
                conexion.close();
            }
        } catch (SQLException e) {
            System.out.println("Error al cerrar conexion: " + e.getMessage());
        }
    }
}
