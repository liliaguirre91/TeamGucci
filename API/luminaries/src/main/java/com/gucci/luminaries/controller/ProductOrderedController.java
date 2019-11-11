package com.gucci.luminaries.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.gucci.luminaries.model.productOrdered;
import com.gucci.luminaries.repository.ProductOrderedRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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