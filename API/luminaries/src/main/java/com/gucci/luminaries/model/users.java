package com.gucci.luminaries.model;

import lombok.Data;

//import java.util.Collection;
import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table
public class users {

    @Id
    @GeneratedValue( strategy = GenerationType.TABLE )
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
    @Column( name = "address" )
    private String address;
    /*@Column( name = "campaigns" )
    private Long campaigns;*/
    /*@OneToMany( mappedBy="user_id" )
    private Collection<orders> order;*/

    //constructor email
    public users( String e ){
        email = e;
    }//end constructor

    //default constructor
    public users( ){
        /*email = "1";
        name = "a";
        levels = 2;
        comments = "";
        //campaigns = (long) 19;*/
    }//end constructor

    //Constructor for name, email, and level
    public users(@Valid String n, String e, int i) {
        users u = new users( );
        u.setName( n );
        u.setEmail( e );
        u.setLevels( i );
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

    //Getter for Address
    public String getAddress( ){
        return address;
    }//end getter

    //Setter for Address
    public void setAddress( String a ){
        address = a;
    }//end setter
    
    //getter for campaigns
	/*public long getCampaigns() {
		return campaigns;
    }//end getter*/

    //setter for comments
	public void setComments( String c ) {
        comments = c;
    }//end setter

    //setter for campaigns
	/*public void setCampaigns( long c) {
        campaigns = c;
    }//end setter*/

    //setter for levels
    public void setLevels( int l ){
        levels = l;
    }//end setter

    //getter for levels
    public int getLevels( ) {
        return levels;
    }//end getter

    //To String for user
    public String toString( ){
        return "email is " + email + " name is " + name;
    }//end toString
}