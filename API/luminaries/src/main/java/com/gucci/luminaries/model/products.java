package com.gucci.luminaries.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class products {

    @Id
    @Column( name = "product" )
    private String product;
    @Column( name = "price" )
    private int price;
    @Column( name = "year_ran" )
    private int year_ran;

    //default constructor
    public products( ){
        product = "Luminary";
        price = 2;
        year_ran = 19;
    }//end constructor

    //Getter for product
    public String getProduct( ){
        return product;
    }//end getter

    //Getter for price
    public int getPrice( ) {
        return price;
    }//end getter

    //Getter for year_ran
    public int getYearRan( ){
        return year_ran;
    }//end getter

    //Setter for product
    public void setProduct( String p ){
        product = p;
    }//end setter

    //Setter for price
    public void setPrice( int p ){
        price = p;
    }//end setter

    public void setYearRan( int y ){
        year_ran = y;
    }//end setter

    public String toString( ){
        return "Product " + getProduct() + " costs " + getPrice() + " is ran in " + getYearRan();
    }//end toString
}