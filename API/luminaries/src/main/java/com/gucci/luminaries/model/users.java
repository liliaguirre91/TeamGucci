package com.gucci.luminaries.model;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

//import java.util.Collection;
import javax.persistence.*;
import javax.validation.Valid;
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
    @Column( name = "levels" )
    private int levels;
    @Column( name = "comments" )
    private String comments;
    @Column( name = "password" )
    private String password;
    /*@OneToMany( mappedBy="user_id" )
    private Collection<orders> order;*/

    //Added for authentication
    @Column( name = "username" )
    private String username;
    @Column ( name = "password" )
    private String password;

    //fetch roles from role table
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    private Set<Role> roles = new HashSet<>();

    //constructor email
    public users( String e ){
        email = e;
    }//end constructor

    //default constructor
    public users( ){
    }//end constructor

    //Constructor for name, email, and level
    public users(@Valid String n, String e, int i) {
        users u = new users( );
        u.setName( n );
        u.setEmail( e );
        u.setLevels( i );
    }
    //Constructor using name, username, email, and password
    //Used during authentication when a new user signs up
    public users(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
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
    
    ///getter for comments
	public String getComments() {
		return comments;
    }//end getter

    //setter for comments
	public void setComments( String c ) {
        comments = c;
    }//end setter

    //setter for levels
    public void setLevels( int l ){
        levels = l;
    }//end setter

    //getter for levels
    public int getLevels( ) {
        return levels;
    }//end getter

<<<<<<< Updated upstream
    //getter for password
    public String getPassword( ){
        return password;
    }//end getter

    //setter for password
    public void setPassword( String p ){
        password = p;
    }
=======
    //added for security by Lucas 
    //getter for username
    public String getUsername() {
        return username;
    }

    //setter for username
    public void setUsername(String u) {
        username = u;
    }

    //getter for password
    public String getPassword() {
        return password;
    }

    //setter for password
    public void setPassword(String p) {
        password = p;
    }
    
    //getter for Role
    public Set<Role> getRoles() {
        return roles;
    }

    //setter for Role
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
>>>>>>> Stashed changes

    //To String for user
    public String toString( ){
        return "email is " + email + " name is " + name;
    }//end toString
}