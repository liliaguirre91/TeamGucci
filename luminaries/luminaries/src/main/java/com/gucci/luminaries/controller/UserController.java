package com.gucci.luminaries.controller;

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
 
import com.gucci.luminaries.model.*;
import com.gucci.luminaries.repository.*;
 
//Rest controller sets the controller up as
//a rest controller with the restful api
@RestController
//Cross origin specifies where to look for the database
@CrossOrigin( origins = "http://localhost:5432" )
//Request mapping specifies the url where this contoller 
//starts at
@RequestMapping( "/api" )
public class UserController {
 
  @Autowired
  UserRepository userRepository;
 
  //Select all method 
  //While running go to localhost:port_number/api/users
  //This will return all users in the table
  //Get mapping specifies the url for the request
  //and sets it up as a get signal
  @GetMapping( "/users" )
  public List<users> getAllUsers() {
    //System log to show startup
    System.out.println( "Get all Users..." );
 
    List<users> list = new ArrayList<>();
    //Run select all method from user repository
    //that queries the database and returns all entries
    Iterable<users> u = userRepository.selectAll();
 
    //add each user to a list to return
    u.forEach( list::add );
    //Return the list to the api to print 
    //it to the screen
    return list;
  }
 
  @PostMapping( "/users/create" )
  public users createUser( @Valid @RequestBody users user ) {
    System.out.println( "Create User: " + user.getName() + "..." );
 
    return userRepository.save( user );
  }
  @PostMapping( "/users/createDefault" )
  public users createDefault( @Valid @RequestBody String name ) {
    System.out.println( "Create User: " + name + "..." );
    users u = new users( name, "idk@idk.com", 0);
    return u;
  }
 
  //getUser returns a users information based on their id
  //The url look like localhost:port_number/api/users/{the user id}
  @GetMapping( "/users/{id}" )
  public ResponseEntity<users> getUser( @PathVariable( "id" ) Long id ) {
    //Print to system out to log the start of this method
    System.out.println( "Get User by id..." );
 
    //Run findById method from user repository
    //this method runs a query that searches the database for the given id
    Optional<users> userData = userRepository.findById( id );
    if ( userData.isPresent() ) {
      return new ResponseEntity<>( userData.get(), HttpStatus.OK );
    } 
    else {
      return new ResponseEntity<>( HttpStatus.NOT_FOUND );
    }
  }

  //getUser returns a users information based on their name
  //The url look like localhost:port_number/api/users/search/{the user name}
  @GetMapping( "/users/search/{name}")
  public ResponseEntity<users> getOnName( @PathVariable String name ){
    //Print to system out to log the start of this method
    System.out.println( "Get User by name..." );
    
    //Run the selectName method from the user repository 
    //This method querries the database for the given name 
    Optional<users> userData = userRepository.selectName( name );
    if ( userData.isPresent() ) {
      return new ResponseEntity<>( userData.get(), HttpStatus.OK );
    } 
    else {
      return new ResponseEntity<>( HttpStatus.NOT_FOUND );
    }
  }

  //getUser returns a users information based on their name and email
  //The url look like localhost:port_number/api/users/search/{name}/{email}
  @GetMapping( "/users/search/{name}/{email}")
  public ResponseEntity<users> getOnName_Email( @PathVariable String name, @PathVariable String email ){
    //Print to system out to log the start of the method
    System.out.println( "Get User by name..." );
    
    //Run the selectUser method from the user repository 
    //This method querries the database for the given name and email
    Optional<users> userData = userRepository.selectUser( name, email );
    if ( userData.isPresent() ) {
      return new ResponseEntity<>( userData.get(), HttpStatus.OK );
    } 
    else {
      return new ResponseEntity<>( HttpStatus.NOT_FOUND );
    }
  }
 
  @PutMapping( "/users/{id}" )
  public ResponseEntity<users> updateUser( @PathVariable( "id" ) Long id, @RequestBody users user ) {
    System.out.println( "Update User with ID = " + id + "..." );
    Optional<users> userData = userRepository.findById( id );
    if ( userData.isPresent() ) {
      users u = userData.get();
      u.setEmail( user.getEmail() );
      u.setName( user.getName() );
      u.setComments( user.getComments() );
      //u.setCampaigns( user.getCampaigns() );
 
      users update = userRepository.save( u );
      return new ResponseEntity<>( update, HttpStatus.OK );
    } else {
      return new ResponseEntity<>( HttpStatus.NOT_FOUND );
    }
  }
 
  @DeleteMapping( "/users/{id}" )
  public ResponseEntity<String> deleteUser( @PathVariable( "id" ) Long id ) {
    System.out.println( "Delete User with ID = " + id + "..." );
    try {
      userRepository.deleteById( id );
    } catch ( Exception e ) {
      return new ResponseEntity<>( "Fail to delete!", HttpStatus.EXPECTATION_FAILED );
    }
 
    return new ResponseEntity<>( "User has been deleted!", HttpStatus.OK );
  }
}