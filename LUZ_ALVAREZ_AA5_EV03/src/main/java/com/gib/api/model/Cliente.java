package com.gib.api.model;

import jakarta.persistence.*;

/**
 * Entidad Cliente - Clase del diagrama UML del sistema GIB.
 *
 * Clase UML: Cliente (cedula, telefono, direccion)
 * Historia de Usuario #3: Gestion de clientes
 * Criterio: no duplicados por cedula, validacion de email
 *
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 */
@Entity
@Table(name = "clientes_gib")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Long idCliente;

    /** Tipo de documento: CC, NIT, CE, PP */
    @Column(name = "tipo_documento", nullable = false, length = 10)
    private String tipoDocumento = "CC";

    /** Numero de documento unico - UNIQUE */
    @Column(name = "numero_documento", nullable = false, unique = true, length = 20)
    private String numeroDocumento;

    /** Nombre completo del cliente */
    @Column(name = "nombre_cliente", nullable = false, length = 150)
    private String nombreCliente;

    /** Telefono de contacto */
    @Column(name = "telefono", length = 20)
    private String telefono;

    /** Correo electronico - UNIQUE */
    @Column(name = "email", unique = true, length = 100)
    private String email;

    /** Direccion del cliente */
    @Column(name = "direccion", length = 200)
    private String direccion;

    /** Estado: activo o inactivo */
    @Column(name = "estado", nullable = false, length = 10)
    private String estado = "activo";

    public Cliente() {}

    // Getters y Setters
    public Long getIdCliente()                    { return idCliente; }
    public void setIdCliente(Long idCliente)      { this.idCliente = idCliente; }
    public String getTipoDocumento()              { return tipoDocumento; }
    public void setTipoDocumento(String v)        { this.tipoDocumento = v; }
    public String getNumeroDocumento()            { return numeroDocumento; }
    public void setNumeroDocumento(String v)      { this.numeroDocumento = v; }
    public String getNombreCliente()              { return nombreCliente; }
    public void setNombreCliente(String v)        { this.nombreCliente = v; }
    public String getTelefono()                   { return telefono; }
    public void setTelefono(String v)             { this.telefono = v; }
    public String getEmail()                      { return email; }
    public void setEmail(String v)                { this.email = v; }
    public String getDireccion()                  { return direccion; }
    public void setDireccion(String v)            { this.direccion = v; }
    public String getEstado()                     { return estado; }
    public void setEstado(String v)               { this.estado = v; }
}
