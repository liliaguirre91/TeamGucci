package com.gucci.lumiaries.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "orders")
public class orders {

    @Id
    @GeneratedValue( strategy = GenerationType.TABLE )
    @Column( name = "order-number" )
    private int order_id;
    @Column( name = "address" )
    private String address;
    @Column( name = "product" )
    private String product;
    @Column( name = "payment_type" )
    private String payment_type;
    @Column( name ="delivered" )
    private boolean delivered;
    @Column( name = "camp" )
    private int camp;
    @Column( name = "user_id" )
    private int user_id;
    //Constuctor address payment
	public orders(String a, String pa) {
        orders o = new orders( );
        o.setAddress( a );
        o.setPayment( pa );
        ;
	}
	//default constructor
    public orders() {
        new orders( );
    }
    //setter for payment
    public void setPayment( String pa ) {
        payment_type = pa;
    }//end setter
    
    //setter for address
    public void setAddress( String a ) {
        address = a;
    }//end setter
    
    //setter for product
    public void setProduct( String p ) {
        product = p;
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
    public void setUser( int u ){
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
    public String getProduct(  ) {
        return product;
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
    public int getUser(  ){
        return user_id;
    }//end getter
}//end class