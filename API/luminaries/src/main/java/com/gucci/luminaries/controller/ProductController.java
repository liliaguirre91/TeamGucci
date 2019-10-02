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
public class ProductController {
 
  @Autowired
  ProductRepository productRepository;
 
  //Select all method 
  //While running go to localhost:port_number/api/products
  //This will return all products in the table
  //Get mapping specifies the url for the request
  //and sets it up as a get signal
  @GetMapping( "/products" )
  public List<products> getAllProducts() {
    //System log to show startup
    System.out.println( "Get all Products..." );
 
    List<products> list = new ArrayList<>();
    //Run select all method from product repository
    //that queries the database and returns all entries
    Iterable<products> o = productRepository.selectAll();
 
    //add each product to a list to return
    o.forEach( list::add );
    //Return the list to the api to print 
    //it to the screen
    return list;
  }
 
  @PostMapping( "/products/create" )
  public products createProduct( @Valid @RequestBody products product ) {
    System.out.println( "Create Product: " + product.getProduct() + "..." );
 
    return productRepository.save( product );
  }
 
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
    } else {
      return new ResponseEntity<>( HttpStatus.NOT_FOUND );
    }
  }
 
  @PutMapping( "/products/{id}" )
  public ResponseEntity<products> updateProduct( @PathVariable( "id" ) long id, @RequestBody products product ) {
    System.out.println( "Update Product with ID = " + id + "..." );
 
    Optional<products> productData = productRepository.findById( id );
    if ( productData.isPresent() ) {
      products o = productData.get();
      o.setProduct( product.getProduct() );
      o.setPrice( product.getPrice() );
      o.setYearRan( product.getYearRan() );
 
      products update = productRepository.save( o );
      return new ResponseEntity<>( update, HttpStatus.OK );
    } else {
      return new ResponseEntity<>( HttpStatus.NOT_FOUND );
    }
  }
 
  @DeleteMapping( "/products/{id}" )
  public ResponseEntity<String> deleteProduct( @PathVariable( "id" ) long id ) {
    System.out.println( "Delete Product with ID = " + id + "..." );
 
    try {
      productRepository.deleteById( id );
    } catch ( Exception e ) {
      return new ResponseEntity<>( "Fail to delete!", HttpStatus.EXPECTATION_FAILED );
    }
 
    return new ResponseEntity<>( "Product has been deleted!", HttpStatus.OK );
  }
}