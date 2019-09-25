package com.gucci.lumiaries.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.Collection;

import javax.persistence.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "users")
public class users {

    @Id
    @GeneratedValue( strategy = GenerationType.TABLE )
    @Column( name = "user_id" )
    private int user_id;
    @Column( name = "email" )
    private String email;
    @Column( name = "name" )
    private String name;
    @Column( name = "levels" )
    private int levels;
    @Column( name = "comments" )
    private String comments;
    @Column( name = "campaigns" )
    private int campaigns;
    @OneToMany( mappedBy="user_id" )
    private Collection<orders> order;

    //constructor email
    public users( String e ){
        email = e;
    }//end constructor

    //default constructor
    public users( ){
        email = "1";
        name = "a";
        levels = 2;
        comments = "";
        campaigns = 19;
    }//end constructor

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
    
    //getter for campaigns
	public int getCampaigns() {
		return campaigns;
    }//emd getter

    //setter for comments
	public void setComments( String c ) {
        comments = c;
    }//end setter

    //setter for campaigns
	public void setCampaigns( int c) {
        campaigns = c;
    }//end setter

    //setter for levels
    public void setLevels( int l ){
        levels = l;
    }//end setter

    //getter for levels
    public int getLevels( ) {
        return levels;
    }//end getter
}