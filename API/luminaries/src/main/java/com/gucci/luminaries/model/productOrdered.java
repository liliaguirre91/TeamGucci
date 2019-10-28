package com.gucci.luminaries.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table
@IdClass( prOrKey.class )
public class productOrdered {

    @Id
    @Column( name = "order_id" )
    private Long order_id;
    @Id
    @Column( name = "product_id")
    private Long product_id;
    @Column( name = "quantity")
    private int quantity;

    //default constructor
    public productOrdered( ){
    }

    //Getters for the attributes
    public long getOrderId( ){
        return order_id;
    }//end getter for order id

    public long getProductId( ){
        return product_id;
    }//end getter for product id

    public int getQuantity( ){
        return quantity;
    }//end getter for quantity

    //Setters for the attributes
    public void setOrderId( long o ){
        order_id = o;
    }//end setter for order id

    public void setProductId( long p ){
        product_id = p;
    }//end setter for product id

    public void setQuantity( int q ){
        quantity = q;
    }//end setter for quantity

}//end productOrdered class