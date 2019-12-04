package com.gucci.luminaries.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.gucci.luminaries.model.productOrdered;
import com.gucci.luminaries.repository.ProductOrderedRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
//Rest controller sets the controller up as
//a rest controller with the restful api
@RestController
//Request mapping specifies the url where this contoller 
//starts at
@RequestMapping( "/api" )
public class ProductOrderedController {
 
    @Autowired
    ProductOrderedRepository productOrderedRepository;
 
    //Select all method 
    //While running go to localhost:port_number/api/productOrdered
    //This will return all productOrdered in the table
    //Get mapping specifies the url for the request
    //and sets it up as a get signal
    @GetMapping( "/productOrdered" )
    public List<productOrdered> getAllProductOrdereds() {
        //System log to show startup
        System.out.println( "Get all ProductOrdered entries..." );
 
        List<productOrdered> list = new ArrayList<>();
        //Run select all method from productordered repository
        //that queries the database and returns all entries
        Iterable<productOrdered> o = productOrderedRepository.selectAll();
        //add each productordered to a list to return
        o.forEach( list::add );
        //Return the list to the api to print 
        //it to the screen
        return list;
    }//end getAllProductOrdereds

    //getProductOrdered is used to get all of the products that were ordered in a specific order
    //it is expecting an id for the order to get information about it returns the list of product ordered
    //entries 
    @GetMapping( "/productOrdered/{id}" )
    public ResponseEntity<List<productOrdered>> getProductOrdered( @PathVariable( "id" ) long id ){
        //initalize the list to be returned
        List<productOrdered> list = new ArrayList<>();
        //try to get all the product ordered entries for the given order and add them to the list
        //and return it if there was an error return a 404 error 
        try{
            Iterable<productOrdered> p = productOrderedRepository.getOrder( id );
            p.forEach( list::add );
            return new ResponseEntity<>( list, HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catch
    }//enc getProductOrdered

    //getQuantity is used to get how many of a specific product were ordered
    //it is expecting a product id and it returns a number that is the total number
    //of that product ordered
    @GetMapping( "/productOrdered/sum/{id}" )
    public ResponseEntity<Long> getQuantity( @PathVariable( "id" ) long id ){
        //try to run the product ordered repository function getSumQuantity
        //return the number that is returned from that function if there is 
        //any error return a 404 error
        try{
            long count = productOrderedRepository.getSumQuantity( id );
            return new ResponseEntity<>( count, HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catch
    }//enc getQuantity
    
    //Create productordered function is used to create a new productOrdered
    //Send a post request to /api/productOrdereds/create
    //with a json body that has the entry information
    //for all fields in the productordered table
    @PostMapping( "/productOrdered/create" )
    public long createProductOrdered( @Valid @RequestBody productOrdered productOrdered ) {
        //Print to the console for logging
        System.out.println( "Create ProductOrdered: " + productOrdered.getOrderId() + "..." );
 
        //Add the productordered to the table
        productOrderedRepository.save( productOrdered );
        //return the generated productordered ID 
        return productOrdered.getOrderId();
    }//end createProductOrdered
}//end productorderedController