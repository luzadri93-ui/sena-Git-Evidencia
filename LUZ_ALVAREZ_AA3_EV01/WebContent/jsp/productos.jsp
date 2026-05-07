<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="com.gib.modelos.Producto" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>GIB - Gestion de Inventario</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #F5F6FA; }
        .header {
            background: #1A1D2E;
            padding: 16px 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .header h1 { color: white; font-size: 18px; }
        .header .usuario { color: rgba(255,255,255,0.7); font-size: 13px; }
        .header a {
            background: #E91E8C;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 13px;
        }
        .contenido { padding: 28px; }
        .titulo-pagina { font-size: 22px; font-weight: bold; color: #1A1D2E; margin-bottom: 20px; }

        /* Mensajes */
        .mensaje-exito {
            background: #D1FAE5; color: #065F46;
            padding: 12px; border-radius: 8px; margin-bottom: 16px;
        }
        .mensaje-error {
            background: #FEE2E2; color: #991B1B;
            padding: 12px; border-radius: 8px; margin-bottom: 16px;
        }

        /* Formulario nuevo producto */
        .form-card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            border: 1px solid #E8E8F0;
        }
        .form-card h3 { color: #E91E8C; margin-bottom: 16px; font-size: 16px; }
        .form-fila { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        .campo label {
            display: block; font-size: 12px; font-weight: bold;
            color: #666; text-transform: uppercase; margin-bottom: 5px;
        }
        .campo input, .campo select {
            width: 100%; padding: 10px 12px;
            border: 2px solid #eee; border-radius: 8px;
            font-size: 14px; outline: none;
        }
        .campo input:focus, .campo select:focus { border-color: #E91E8C; }
        .btn-guardar {
            margin-top: 16px;
            background: #E91E8C; color: white;
            border: none; padding: 11px 24px;
            border-radius: 8px; font-size: 14px;
            font-weight: bold; cursor: pointer;
        }
        .btn-guardar:hover { background: #C2185B; }

        /* Tabla */
        .tabla-card {
            background: white; border-radius: 12px;
            border: 1px solid #E8E8F0; overflow: hidden;
        }
        table { width: 100%; border-collapse: collapse; }
        thead tr { background: #FFF0F9; }
        th {
            padding: 13px 16px; text-align: left;
            font-size: 12px; font-weight: bold;
            text-transform: uppercase; color: #C2185B;
        }
        tbody tr { border-top: 1px solid #F0F0F8; }
        tbody tr:hover { background: #F5F6FA; }
        td { padding: 12px 16px; font-size: 14px; color: #333; }
        .chip-ok { background: #D1FAE5; color: #065F46; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }
        .chip-bajo { background: #FEF3C7; color: #92400E; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }
        .chip-critico { background: #FEE2E2; color: #991B1B; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }
        .btn-eliminar {
            background: #FEE2E2; color: #991B1B;
            border: none; padding: 6px 12px;
            border-radius: 6px; cursor: pointer; font-size: 12px;
        }
        .btn-eliminar:hover { background: #EF4444; color: white; }
    </style>
</head>
<body>

    <!-- Encabezado -->
    <div class="header">
        <h1>GIB - Gestion de Inventarios de Belleza | Cosmeticos Kitty</h1>
        <div>
            <span class="usuario">Usuario: <%= session.getAttribute("usuario") %></span>
            &nbsp;&nbsp;
            <a href="login?accion=logout">Cerrar sesion</a>
        </div>
    </div>

    <div class="contenido">
        <div class="titulo-pagina">Inventario de Productos</div>

        <!-- Mensajes de operacion -->
        <% if (request.getAttribute("mensaje") != null) { %>
            <div class="mensaje-exito"><%= request.getAttribute("mensaje") %></div>
        <% } %>
        <% if (request.getAttribute("error") != null) { %>
            <div class="mensaje-error"><%= request.getAttribute("error") %></div>
        <% } %>

        <!-- Formulario para registrar producto - metodo POST -->
        <div class="form-card">
            <h3>Registrar Nuevo Producto</h3>
            <form action="productos" method="post">
                <input type="hidden" name="accion" value="insertar">
                <div class="form-fila">
                    <div class="campo">
                        <label>Nombre del Producto *</label>
                        <input type="text" name="nombre" placeholder="Nombre completo" required>
                    </div>
                    <div class="campo">
                        <label>Categoria *</label>
                        <select name="categoria" required>
                            <option value="">Seleccionar...</option>
                            <option value="1">Cuidado de Piel</option>
                            <option value="2">Cabello</option>
                            <option value="3">Maquillaje</option>
                            <option value="4">Skincare</option>
                        </select>
                    </div>
                    <div class="campo">
                        <label>Proveedor</label>
                        <select name="proveedor">
                            <option value="1">Belleza Total S.A.S</option>
                            <option value="2">Cosmeticos del Norte</option>
                        </select>
                    </div>
                </div>
                <div class="form-fila">
                    <div class="campo">
                        <label>Precio Venta ($) *</label>
                        <input type="number" name="precioVenta" placeholder="0" required>
                    </div>
                    <div class="campo">
                        <label>Stock Actual *</label>
                        <input type="number" name="stockActual" placeholder="0" required>
                    </div>
                    <div class="campo">
                        <label>Stock Minimo</label>
                        <input type="number" name="stockMinimo" placeholder="10" value="10">
                    </div>
                </div>
                <button type="submit" class="btn-guardar">Guardar Producto</button>
            </form>
        </div>

        <!-- Tabla de productos -->
        <div class="tabla-card">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Precio Venta</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    <%
                    // Obtener la lista de productos desde el request
                    List<Producto> listaProductos = (List<Producto>) request.getAttribute("listaProductos");
                    if (listaProductos != null && !listaProductos.isEmpty()) {
                        for (Producto p : listaProductos) {
                            // Determinar estado del stock
                            String estadoChip = "chip-ok";
                            String estadoTexto = "OK";
                            if (p.getStockActual() <= p.getStockMinimo() / 2) {
                                estadoChip = "chip-critico";
                                estadoTexto = "Critico";
                            } else if (p.getStockActual() < p.getStockMinimo()) {
                                estadoChip = "chip-bajo";
                                estadoTexto = "Bajo";
                            }
                    %>
                    <tr>
                        <td><%= p.getIdProducto() %></td>
                        <td><strong><%= p.getNombre() %></strong></td>
                        <td><%= p.getCategoria() %></td>
                        <td><strong>$<%= String.format("%,.0f", p.getPrecioVenta()) %></strong></td>
                        <td><%= p.getStockActual() %> uds.</td>
                        <td><span class="<%= estadoChip %>"><%= estadoTexto %></span></td>
                        <td>
                            <!-- Formulario de eliminacion - metodo POST -->
                            <form action="productos" method="post" style="display:inline;">
                                <input type="hidden" name="accion" value="eliminar">
                                <input type="hidden" name="idProducto" value="<%= p.getIdProducto() %>">
                                <button type="submit" class="btn-eliminar"
                                    onclick="return confirm('¿Eliminar este producto?')">
                                    Eliminar
                                </button>
                            </form>
                        </td>
                    </tr>
                    <%
                        }
                    } else {
                    %>
                    <tr>
                        <td colspan="7" style="text-align:center; padding:30px; color:#999;">
                            No hay productos registrados
                        </td>
                    </tr>
                    <% } %>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
