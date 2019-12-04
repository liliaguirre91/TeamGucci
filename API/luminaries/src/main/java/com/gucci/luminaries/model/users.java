package com.gucci.luminaries.model;

import lombok.Data;

import java.sql.Timestamp;

//import java.util.Collection;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table
public class users {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "user_id" )
    private Long user_id;
    @NotNull
    @Column( name = "email" )
    private String email;
    @NotNull
    @Column( name = "name" )
    private String name;
    @Column( name = "role" )
    private String Role;
    @Column( name = "comments" )
    private String comments;
    @Column( name = "createdAt" )
    private Timestamp createdAt;

    //Added for authentication
    @Column ( name = "password" )
    private String password;

    //constructor email
    public users( String e ){
        email = e;
    }//end constructor

    //default constructor
    public users( ){
    }//end constructor 

    //Constructor using name, username, email, and password
    //Used during authentication when a new user signs up
    public users(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public users(Long i, String username, String n) {
        user_id = i;
        email = username;
        name = n;
	}

	//Getter for user id
    public long getUserId( ){
        return user_id;
    }//end getter

	//Getter for email
    public String getEmail( ){
        return email;
    }//end getter

    //getter for name
	public String getName() {
		return name;
	}//end getter
    
    //setter for email
	public void setEmail( String e ) {
        email =e;
    }//end setter
    
    //setter for name
	public void setName( String n ) {
        name = n;
    }//end setter

    //setter for createdAt
    public void setCreatedAt( Timestamp c ){
        createdAt = c;
    }//end setter

    //getter for CreatedAt
    public Timestamp getCreatedAt( ){
        return createdAt;
    }//end getter
    
    ///getter for comments
	public String getComments() {
		return comments;
    }//end getter

    //setter for comments
	public void setComments( String c ) {
        comments = c;
    }//end setter

    //setter for Role
    public void setRole( String r ){
        Role = r;
    }//end setter

    //getter for Role
    public String getRole( ) {
        return Role;
    }//end getter

    //added for security by Lucas 

    //getter for password
    public String getPassword() {
        return password;
    }

    //setter for password
    public void setPassword(String p) {
        password = p;
    }
}