package com.gucci.luminaries.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.imageio.ImageIO;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gucci.luminaries.model.*;
import com.gucci.luminaries.repository.*;

//Rest controller sets the controller up as
//a rest controller with the restful api
@RestController
// Request mapping specifies the url where this contoller
// starts at
@RequestMapping("/api")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    // Select all method
    // While running go to localhost:port_number/api/products
    // This will return all products in the table
    // Get mapping specifies the url for the request
    // and sets it up as a get signal
    @GetMapping("/products")
    public List<products> getAllProducts() {
        // System log to show startup
        System.out.println("Get all Products...");

        List<products> list = new ArrayList<>();
        // Run select all method from product repository
        // that queries the database and returns all entries
        Iterable<products> p = productRepository.selectAll();

        // add each product to a list to return
        p.forEach(list::add);
        // Return the list to the api to print
        // it to the screen
        return list;
    }// end getAllProducts

    @GetMapping( "/products/camp/{year_ran}" )
    public ResponseEntity<List<products>> getCurrentProducts( @PathVariable int year_ran ) {
        List<products> list = new ArrayList<>();
        Iterable<products> p = productRepository.selectProductFor(year_ran);

        p.forEach( list::add );
        if( list.isEmpty() ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end if
        return new ResponseEntity<>( list, HttpStatus.OK );
    }//end getCurrentProducts

    // Create product function is used to create a new product
    // Send a post request to /api/products/create
    // with a json body that has the entry information
    // for all fields in the product table
    @PostMapping("/products/create")
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<Long> createProduct( @RequestBody products product ) {
        // Print to the console for logging
        try {
            System.out.println( "Create Product: " + product.getProduct() + "..." );
            //Add the product to the table and return the product id to show it worked
            productRepository.save( product );
            return new ResponseEntity<>( product.getProductId(), HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catch
    }//end createProduct

    // Create product function is used to create a new product
    // Send a post request to /api/products/create/postman
    // To be used with postman to enter picture
    // with a json body that has the entry information
    // for all fields in the product table
    @PostMapping( "/products/create/postman" )
    @PreAuthorize( "hasAnyAuthority('Role_ROOT')" )
    public long createProductPostman( @Valid @RequestParam(value = "product") String pname,
            @Valid @RequestParam(value = "price") int price, @Valid @RequestParam(value = "year_ran") int year_ran,
            @Valid @RequestParam(value = "image") MultipartFile image ) {
        // Print to the console for logging
        products product;
        try{
            InputStream im = image.getInputStream();
            BufferedImage i = ImageIO.read(im);
            product = new products( pname, price, year_ran, i );
        }//end try
        catch( IOException e ){
            System.out.println( "Error reading image" );
            return -1;
        }//end catch 
        System.out.println( product.getYearRan() );
        System.out.println( "Create Product: " + product.getProduct() + "..." );
        //Add the product to the table and return the product id to show it worked
        productRepository.save( product );
        return product.getProductId();
    }//end createProduct
    
    //getProduct returns a product information based on their id
    //The url look like localhost:port_number/api/products/{the product id}
    //The products id is just its name
    @GetMapping( "/products/{id}" )
    public ResponseEntity<products> getProduct( @PathVariable( "id" ) long id ) {
        //Print to system out to log the start of this method
        System.out.println( "Get Product by id..." );
    
        //Run findById method from product repository
        //this method runs a query that searches the database for the given id
        Optional<products> productData = productRepository.findById(id);
        if ( productData.isPresent() ) {
            return new ResponseEntity<>( productData.get(), HttpStatus.OK );
        }//end if 
        else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end else
    }//end getProduct

    @GetMapping( "products/price/{id}" )
    public ResponseEntity<Integer> getPrice( @PathVariable( "id" ) long id ){
        try{
            return new ResponseEntity<>( productRepository.getPrice( id ), HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catch
    }//end getPrice
    
    @PutMapping( "/products/{id}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<products> updateProduct( @PathVariable( "id" ) long id, @RequestBody products product ) {
        System.out.println( "Update Product with ID = " + id + "..." );
    
        Optional<products> productData = productRepository.findById( id );
        if ( productData.isPresent() ) {
            products o = productData.get();
            o.setProduct( product.getProduct() );
            o.setPrice( product.getPrice() );
            o.setDescription( product.getDescription() );
    
            products update = productRepository.save( o );
            return new ResponseEntity<>( update, HttpStatus.OK );
        }//end if 
        else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end else
    }//end update Product
    
    @DeleteMapping( "/products/{id}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<String> deleteProduct( @PathVariable( "id" ) long id ) {
        System.out.println( "Delete Product with ID = " + id + "..." );
    
        try {
        productRepository.deleteById( id );
        }//end try 
        catch ( Exception e ) {
            return new ResponseEntity<>( "Fail to delete!", HttpStatus.EXPECTATION_FAILED );
        }//end catch
    
        return new ResponseEntity<>( "Product has been deleted!", HttpStatus.OK );
    }//end deleteProduct
}//end ProductController
