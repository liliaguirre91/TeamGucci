package com.gucci.luminaries.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
 
import javax.validation.Valid;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import com.gucci.luminaries.model.*;
import com.gucci.luminaries.repository.*;
 
//Rest controller sets the controller up as
//a rest controller with the restful api
@RestController
//Request mapping specifies the url where this contoller 
//starts at
@RequestMapping( "/api" )
public class OrderController {
 
    @Autowired
    OrderRepository orderRepository;
 
    //Select all method 
    //While running go to localhost:port_number/api/orders
    //This will return all orders in the table
    //Get mapping specifies the url for the request
    //and sets it up as a get signal
    @GetMapping( "/orders" )
    public List<orders> getAllOrders() {
        //System log to show startup
        System.out.println( "Get all Orders..." );
 
        List<orders> list = new ArrayList<>();
        //Run select all method from order repository
        //that queries the database and returns all entries
        Iterable<orders> o = orderRepository.selectAll();
        //add each order to a list to return
        o.forEach( list::add );
        //Return the list to the api to print 
        //it to the screen
        return list;
    }//end getAllOrders
    
    //Create order function is used to create a new order
    //Send a post request to /api/orders/create
    //with a json body that has the entry information
    //for all fields in the order table
    @PostMapping( "/orders/create" )
    public ResponseEntity<Long> createOrder( @Valid @RequestBody orders order ) {
        //Print to the console for logging
        System.out.println( "Create Order: " + order.getAddress() + "..." );
        try{ 
            //Add the order to the table
            orderRepository.save( order );
            //return the generated order ID 
            return new ResponseEntity<>( order.getOrderId(), HttpStatus.OK ); 
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }
    }//end createOrders

    //orderQuerry is function for orderSearch Page
    //returns info about an order
    @GetMapping( "/orders/search/{id}" )
    public ResponseEntity<String> orderQuery( @PathVariable( "id" ) Long id ){
    
        //get order information
        Optional<orders> orderData = orderRepository.findById( id );
        //If the order exists return its information
        if ( orderData.isPresent() ) {
            orders o = orderData.get();
            String s = "" + o.getDelivered();
            return new ResponseEntity<>( s, HttpStatus.OK );
        }//end if
        //if its not there return an indication of this
        else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end else
    }//end orderQuerry
 
    //getOrder returns a orders information based on their id
    //The url look like localhost:port_number/api/orders/{the order id}
    @GetMapping( "/orders/{id}" )
    public ResponseEntity<orders> getOrder( @PathVariable( "id" ) Long id ) {
        //Print to system out to log the start of this method
        System.out.println( "Get Order by id..." );
 
        //Run findById method from order repository
        //this method runs a query that searches the database for the given id
        Optional<orders> orderData = orderRepository.findById( id );
        if ( orderData.isPresent() ) {
            return new ResponseEntity<>( orderData.get(), HttpStatus.OK );
        }//end if
        else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end else
    }//end getOrders
 
    //Put mapping updates an order entry in the orders table
    //To create go to /api/orders/{order number}
    //
    // CURRENTLY TESTING AS OF YET DOESN'T WORK YET
    //
    //fill in the put request similar to the post request
    @PutMapping( "/orders/{id}" )
    public ResponseEntity<orders> updateOrder( @PathVariable( "id" ) Long id, @RequestBody orders order ) {
        System.out.println( "Update Order with ID = " + id + "..." );
 
        Optional<orders> orderData = orderRepository.findById( id );
        if ( orderData.isPresent() ) {
            orders o = new orders( );
            o.setAddress( order.getAddress() );
            o.setPayment( order.getPayment() );
            o.setCamp( order.getCamp() );
            o.setDelivered( order.getDelivered() );
            o.setUserId( order.getUserId() );
            o.setPhone( order.getPhone() );

        
            orders update = orderRepository.save( o );
            return new ResponseEntity<>( update, HttpStatus.OK );
        }//end if
        else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end else
    }//end updateOrder
 
    //Delete Order is used to delete an order from the table
    //Send delete request to /api/orders/{the order number}
    @DeleteMapping( "/orders/{id}" )
    public ResponseEntity<String> deleteOrder( @PathVariable( "id" ) Long id ) {
        //Print to console for logging purposes
        System.out.println( "Delete Order with ID = " + id + "..." );
 
        //try to delete the order
        try {
            orderRepository.deleteById( id );
        }//end try
        //Catch a failure to delete and indict that it happened
        catch ( Exception e ) {
            return new ResponseEntity<>( "Fail to delete!", HttpStatus.EXPECTATION_FAILED );
        }//end catch
        //Print that the order was deleted
        return new ResponseEntity<>( "Order has been deleted!", HttpStatus.OK );
    }//end delete order
}//end orderController