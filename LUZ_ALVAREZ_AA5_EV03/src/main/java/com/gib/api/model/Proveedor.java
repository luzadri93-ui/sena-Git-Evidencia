package com.gib.api.model;

import jakarta.persistence.*;

/**
 * Entidad Proveedor - Clase del diagrama UML del sistema GIB.
 *
 * Clase UML: Proveedor (id, nombre, contacto)
 * Historia de Usuario #4: Gestion de proveedores
 *
 * @author Luz Adriana Alvarez Garcia
 * @ficha 3070319
 */
@Entity
@Table(name = "proveedores_gib")
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proveedor")
    private Long idProveedor;

    /** NIT de la empresa proveedora - UNIQUE */
    @Column(name = "nit", nullable = false, unique = true, length = 20)
    private String nit;

    /** Nombre de la empresa proveedora */
    @Column(name = "nombre_proveedor", nullable = false, length = 150)
    private String nombreProveedor;

    /** Persona de contacto en la empresa */
    @Column(name = "contacto", length = 100)
    private String contacto;

    /** Telefono de contacto */
    @Column(name = "telefono", length = 20)
    private String telefono;

    /** Correo electronico */
    @Column(name = "email", length = 100)
    private String email;

    /** Direccion de la empresa */
    @Column(name = "direccion", length = 200)
    private String direccion;

    /** Estado: activo o inactivo */
    @Column(name = "estado", nullable = false, length = 10)
    private String estado = "activo";

    public Proveedor() {}

    // Getters y Setters
    public Long getIdProveedor()                      { return idProveedor; }
    public void setIdProveedor(Long v)                { this.idProveedor = v; }
    public String getNit()                            { return nit; }
    public void setNit(String v)                      { this.nit = v; }
    public String getNombreProveedor()                { return nombreProveedor; }
    public void setNombreProveedor(String v)          { this.nombreProveedor = v; }
    public String getContacto()                       { return contacto; }
    public void setContacto(String v)                 { this.contacto = v; }
    public String getTelefono()                       { return telefono; }
    public void setTelefono(String v)                 { this.telefono = v; }
    public String getEmail()                          { return email; }
    public void setEmail(String v)                    { this.email = v; }
    public String getDireccion()                      { return direccion; }
    public void setDireccion(String v)                { this.direccion = v; }
    public String getEstado()                         { return estado; }
    public void setEstado(String v)                   { this.estado = v; }
}
