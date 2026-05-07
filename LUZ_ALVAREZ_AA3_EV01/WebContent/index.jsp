<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GIB - Iniciar Sesion</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #880E4F, #E91E8C);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-box {
            background: white;
            padding: 40px;
            border-radius: 12px;
            width: 380px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        }
        .logo {
            text-align: center;
            margin-bottom: 24px;
        }
        .logo h1 { font-size: 2.5rem; color: #E91E8C; font-weight: 900; }
        .logo p { color: #777; font-size: 13px; }
        h2 { color: #333; margin-bottom: 6px; }
        .subtitulo { color: #999; font-size: 13px; margin-bottom: 24px; }
        .campo { margin-bottom: 18px; }
        .campo label {
            display: block;
            font-size: 12px;
            font-weight: bold;
            color: #666;
            text-transform: uppercase;
            margin-bottom: 6px;
        }
        .campo input {
            width: 100%;
            padding: 12px;
            border: 2px solid #eee;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
        }
        .campo input:focus { border-color: #E91E8C; }
        .btn-ingresar {
            width: 100%;
            padding: 13px;
            background: #E91E8C;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
        }
        .btn-ingresar:hover { background: #C2185B; }
        .error {
            background: #FEE2E2;
            color: #991B1B;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 13px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="login-box">
        <div class="logo">
            <h1>GIB</h1>
            <p>Gestion de Inventarios de Belleza</p>
            <p>Cosmeticos Kitty</p>
        </div>

        <h2>Bienvenida</h2>
        <p class="subtitulo">Inicia sesion para acceder al sistema</p>

        <!-- Mostrar error si existe -->
        <% if (request.getAttribute("error") != null) { %>
            <div class="error"><%= request.getAttribute("error") %></div>
        <% } %>

        <!-- Formulario de login - metodo POST -->
        <form action="login" method="post">
            <div class="campo">
                <label>Usuario</label>
                <input type="text" name="usuario" placeholder="Ingresa tu usuario" required>
            </div>
            <div class="campo">
                <label>Contrasena</label>
                <input type="password" name="clave" placeholder="Ingresa tu contrasena" required>
            </div>
            <button type="submit" class="btn-ingresar">Iniciar sesion</button>
        </form>
    </div>
</body>
</html>
