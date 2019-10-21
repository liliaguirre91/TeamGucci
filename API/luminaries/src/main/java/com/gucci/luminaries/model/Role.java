package com.gucci.luminaries.model;

import org.hibernate.annotations.NaturalId;
import javax.persistence.*;

//Model for Role table
@Entity
@Table(name = "Role")
public class Role {

    //Creates id column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name = "id")
    private Long id;

    //Creates name column. Uses custom enumerated type RoleName specified in RoleName.java
    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private RoleName name;

    public Role() {

    }

    public Role(RoleName name) {
        this.name = name;
    }

    //getter for id
    public Long getId() {
        return id;
    }

    //setter for id
    public void setId(Long id) {
        this.id = id;
    }

    //getter for name
    public RoleName getName() {
        return name;
    }

    //setter for name
    public void setName(RoleName name) {
        this.name = name;
    }
}