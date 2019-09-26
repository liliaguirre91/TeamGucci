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
 
@RestController
@CrossOrigin( origins = "http://localhost:5432" )
@RequestMapping( "/api" )
public class UserController {
 
  @Autowired
  UserRepository userRepository;
 
  @GetMapping( "/users" )
  public List<users> getAllUsers() {
    System.out.println( "Get all Users..." );
 
    List<users> list = new ArrayList<>();
    Iterable<users> u = userRepository.findAll();
 
    u.forEach( list::add );
    return list;
  }
 
  @PostMapping( "/users/create" )
  public users createUser( @Valid @RequestBody users user ) {
    System.out.println( "Create User: " + user.getName() + "..." );
 
    return userRepository.save( user );
  }
 
  @GetMapping( "/users/{id}" )
  public ResponseEntity<users> getUser( @PathVariable( "id" ) Long id ) {
    System.out.println( "Get User by id..." );
 
    Optional<users> userData = userRepository.findById( id.toString() );
    if ( userData.isPresent() ) {
      return new ResponseEntity<>( userData.get(), HttpStatus.OK );
    } else {
      return new ResponseEntity<>( HttpStatus.NOT_FOUND );
    }
  }
 
  @PutMapping( "/users/{id}" )
  public ResponseEntity<users> updateUser( @PathVariable( "id" ) Long id, @RequestBody users user ) {
    System.out.println( "Update User with ID = " + id + "..." );
 
    Optional<users> userData = userRepository.findById( id.toString() );
    if ( userData.isPresent() ) {
      users u = userData.get();
      u.setEmail( user.getEmail() );
      u.setName( user.getName() );
      u.setComments( user.getComments() );
      u.setCampaigns( user.getCampaigns() );
 
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
      userRepository.deleteById( id.toString( ) );
    } catch ( Exception e ) {
      return new ResponseEntity<>( "Fail to delete!", HttpStatus.EXPECTATION_FAILED );
    }
 
    return new ResponseEntity<>( "User has been deleted!", HttpStatus.OK );
  }
}