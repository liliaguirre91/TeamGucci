package com.gucci.luminaries.model;

import lombok.Data;

import javax.persistence.*;


import org.springframework.lang.Nullable;

@Data
@Entity
@Table( name = "orders" )
public class orders {

    @Id
    @GeneratedValue( strategy = GenerationType.TABLE )
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
    @Nullable
    @Column( name = "user_id" )
    //@ManyToOne( targetEntity = users.class )
    //@PrimaryKeyJoinColumn( name = "user_id", referencedColumnName = "user_id" )
    //@JoinColumn( name = "user_id", referencedColumnName="user_id", nullable=true )
    private Long user_id;
    @Column( name = "product_id" )
    //@ManyToOne( targetEntity = products.class, fetch = FetchType.LAZY )
    //@PrimaryKeyJoinColumn( name = "product_id", referencedColumnName = "product_id" )
    //@JoinColumn( name = "product_id", referencedColumnName="product_id",nullable=false)
    private Long product_id;

    //default constructor
    public orders() {
        /*address = "idk";
        product_id = (long) 1;
        payment_type = "PayPal";
        delivered = true;
        camp = 19;*/
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
    
    //setter for product
    public void setProductId( long p ) {
        product_id = p;
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
    
    //getter for payment
    public String getPayment( ) {
        return payment_type;
    }//end getter

    //getter for address
    public String getAddress( ) {
        return address;
    }//end getter

    //getter for product
    public long getProductId(  ) {
        return product_id;
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

    //To String for Orders
    public String toString( ){
        return "Order number is " + order_id + " address is " + address;
    }
}//end class