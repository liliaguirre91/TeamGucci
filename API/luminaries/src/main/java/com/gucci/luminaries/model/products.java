package com.gucci.luminaries.model;

//import java.util.Collection;
import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;

import lombok.Data;

@Data
@Entity
@Table
public class products {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "product_id" )
    private Long product_id;
    @Column( name = "product" )
    private String product;
    @Column( name = "price" )
    private int price;
    @Column( name = "year_ran" )
    private int year_ran;
    @Column( name = "image")
    private byte[] image;
    /*@OneToMany( mappedBy="product_id" )
    private Collection<orders> order;*/

    //default constructor
    public products(){
        /*product = "Luminary";
        price = 2;
        year_ran = 19;*/
    }//end constructor

    //Constructor
    public products( String pname, int p, int y, BufferedImage i ){
        try{
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write( i, "jpg", baos );
            baos.flush();
            image = baos.toByteArray();
            baos.close();
        }
        catch( IOException e ){
            System.out.println( "Error with Image" );
        }
        product = pname;
        price = p;
        year_ran = y;
    }//end constructor

    //Getter for product id
    public long getProductId( ){
        return product_id;
    }//end getter

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

    //Getter for image
    public byte[] getImage( ){
        return image;
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

    //Setter for Image
    public void setImage( byte[] i ){
        image = i;
    }//end setter

    public String toString( ){
        return "Product " + getProduct() + " costs " + getPrice() + " is ran in " + getYearRan();
    }//end toString
}
