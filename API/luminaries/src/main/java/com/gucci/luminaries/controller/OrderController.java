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
  }
 
  @PostMapping( "/orders/create" )
  public orders createOrder( @Valid @RequestBody orders order ) {
    System.out.println( "Create Order: " + order.getAddress() + "..." );
 
    return orderRepository.save( order );
  }

  @GetMapping( "/orders/search/{id}" )
  public String orderQuery( @PathVariable( "id" ) Long id ){
    
    Optional<orders> orderData = orderRepository.findById( id );
    if ( orderData.isPresent() ) {
      orders o = orderData.get();
      String s = "" + o.getDelivered();
      return s;
    } else {
      return "No order with that number";
    }
  }
 
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
    } else {
      return new ResponseEntity<>( HttpStatus.NOT_FOUND );
    }
  }
 
  @PutMapping( "/orders/{id}" )
  public ResponseEntity<orders> updateOrder( @PathVariable( "id" ) Long id, @RequestBody orders order ) {
    System.out.println( "Update Order with ID = " + id + "..." );
 
    Optional<orders> orderData = orderRepository.findById( id );
    if ( orderData.isPresent() ) {
      orders o = orderData.get();
      o.setAddress( order.getAddress() );
      o.setPayment( order.getPayment() );
      o.setProductId( order.getProductId() );
      o.setCamp( order.getCamp() );
      o.setDelivered( order.getDelivered() );
      o.setUserId( o.getUserId() );
 
      orders update = orderRepository.save( o );
      return new ResponseEntity<>( update, HttpStatus.OK );
    } else {
      return new ResponseEntity<>( HttpStatus.NOT_FOUND );
    }
  }
 
  @DeleteMapping( "/orders/{id}" )
  public ResponseEntity<String> deleteOrder( @PathVariable( "id" ) Long id ) {
    System.out.println( "Delete Order with ID = " + id + "..." );
 
    try {
      orderRepository.deleteById( id );
    } catch ( Exception e ) {
      return new ResponseEntity<>( "Fail to delete!", HttpStatus.EXPECTATION_FAILED );
    }
 
    return new ResponseEntity<>( "Order has been deleted!", HttpStatus.OK );
  }
}