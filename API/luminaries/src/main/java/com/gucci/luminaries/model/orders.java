package com.gucci.luminaries.model;

import lombok.Data;

import java.sql.Timestamp;

import javax.persistence.*;

@Data
@Entity
@Table( name = "orders" )
public class orders {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "order_number" )
    private Long order_id;
    @Column( name = "address" )
    private String address;
    @Column( name = "payment_type" )
    private String payment_type;
    @Column( name ="delivered" )
    private boolean delivered;
    @Column( name = "camp" )
    private int camp;
    @Column( name = "phone_number" )
    private String phone;
    @Column( name = "createdAt" )
    private Timestamp createdAt;
    @Column( name = "name" )
    private String name;
    @Column( name = "paid" )
    private Integer paid;
    @Column( name = "total_cost" )
    private Integer totalCost;
    @Column( name = "user_id" )
    private Long user_id;

    //default constructor
    public orders() {
    }//end constructor

    //Constuctor address payment
	public orders(String a, String pa) {
        orders o = new orders( );
        o.setAddress( a );
        o.setPayment( pa );
        ;
    }//end constructor
    
	//Constructor for address
    public orders(String a) {
        orders o = new orders( );
        o.setAddress( a );
    }//end constructor

    //Getter for order id
    public long getOrderId( ){
        return order_id;
    }//end getter

	//setter for payment
    public void setPayment( String pa ) {
        payment_type = pa;
    }//end setter
    
    //setter for address
    public void setAddress( String a ) {
        address = a;
    }//end setter
    
    //setter for campaign
    public void setCamp( int c ){
        camp = c;
    }//end setter
    
    //setter for delivered
    public void setDelivered( boolean d ){
        delivered = d;
    }//end setter
    
    //setter for user
    public void setUserId( long u ){
        user_id = u;
    }//end setter

    //setter for phone-number
    public void setPhone( String p ){
        phone = p;
    }//end setter

    //setter for createdAt
    public void setCreatedAt( Timestamp c ){
        createdAt = c;
    }//end setter

    //setter for name
    public void setName( String n ){
        name =n;
    }//end setter

    //setter for paid
    public void setPaid( Integer p ){
        paid = p;
    }//end setter

    //setter for totalCost
    public void setTotalCost( Integer t ){
        totalCost = t;
    }//setter for totalCost
    
    //getter for payment
    public String getPayment( ) {
        return payment_type;
    }//end getter

    //getter for address
    public String getAddress( ) {
        return address;
    }//end getter

    //getter for campaign
    public int getCamp( ){
        return camp;
    }//end getter

    //getter for delivered
    public boolean getDelivered(  ){
        return delivered;
    }//end getter

    //getter for user
    public long getUserId(  ){
        if( user_id == null )
            return -1;
        return user_id;
    }//end getter

    //getter for phone
    public String getPhone( ){
        return phone;
    }//end getter

    //getter for CreatedAt
    public Timestamp getCreatedAt( ){
        return createdAt;
    }//end getter

    //getter for name
    public String getName( ){
        return name;
    }//end setter

    //getter for paid
    public Integer getPaid( ){
        return paid;
    }//getter for paid
    
    //getter for totalCost
    public Integer getTotalCost( ){
        return totalCost;
    }//getter for totalCost
}//end class
