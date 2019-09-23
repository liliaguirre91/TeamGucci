package com.gucci.lumiaries.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
 
import javax.validation.Valid;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import com.gucci.lumiaries.model.*;
import com.gucci.lumiaries.repository.*;
 
@CrossOrigin( origins = "http://localhost:5432" )
@RestController
@RequestMapping( "/api" )
public class OrderController {
 
  @Autowired
  OrderRepository orderRepository;
 
  @GetMapping( "/orders" )
  public List<orders> getAllOrders() {
    System.out.println( "Get all Orders..." );
 
    List<orders> list = new ArrayList<>();
    Iterable<orders> o = orderRepository.findAll();
 
    o.forEach( list::add );
    return list;
  }
 
  @PostMapping( "/orders/create" )
  public orders createOrder( @Valid @RequestBody orders order ) {
    System.out.println( "Create Order: " + order.getAddress() + "..." );
 
    return orderRepository.save( order );
  }
 
  @GetMapping( "/orders/{id}" )
  public ResponseEntity<orders> getOrder( @PathVariable( "id" ) Long id ) {
    System.out.println( "Get Order by id..." );
 
    Optional<orders> orderData = orderRepository.findById( id.toString() );
    if ( orderData.isPresent() ) {
      return new ResponseEntity<>( orderData.get(), HttpStatus.OK );
    } else {
      return new ResponseEntity<>( HttpStatus.NOT_FOUND );
    }
  }
 
  @PutMapping( "/orders/{id}" )
  public ResponseEntity<orders> updateOrder( @PathVariable( "id" ) Long id, @RequestBody orders order ) {
    System.out.println( "Update Order with ID = " + id + "..." );
 
    Optional<orders> orderData = orderRepository.findById( id.toString() );
    if ( orderData.isPresent() ) {
      orders o = orderData.get();
      o.setAddress( order.getAddress() );
      o.setPayment( order.getPayment() );
      o.setProduct( order.getProduct() );
      o.setCamp( order.getCamp() );
 
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
      orderRepository.deleteById( id.toString( ) );
    } catch ( Exception e ) {
      return new ResponseEntity<>( "Fail to delete!", HttpStatus.EXPECTATION_FAILED );
    }
 
    return new ResponseEntity<>( "Book has been deleted!", HttpStatus.OK );
  }
}