package com.gucci.luminaries.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.gucci.luminaries.model.*;
import com.gucci.luminaries.repository.*;
import com.gucci.luminaries.security.CurrentUser;
import com.gucci.luminaries.security.UserPrincipal;
 
//Rest controller sets the controller up as
//a rest controller with the restful api
@RestController
//Request mapping specifies the url where this contoller 
//starts at
@RequestMapping( "/api" )
public class UserController {
 
	@Autowired
	UserRepository userRepository;
	
    @Autowired
    PasswordEncoder passwordEncoder;
	
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
	}//end getAllUsers
	
	//Works in PostMan send post code localhost:portnumber/api/users/create
	//Select body change to raw and set type to json
	//Enter user data inclosed in '{}' in format
	//"fieldname":"data",
	@PostMapping( "/users/create" )
	public ResponseEntity<String> createUser(@RequestBody users user ) {
		//Print to system out to log start of method
		System.out.println( "Create User: " + user.getName() + "..." );
        //Save the new user
        try{
			userRepository.save( user );
			return new ResponseEntity<>( user.getName(), HttpStatus.OK );
		}//end try
		catch( Exception e ){
			return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}//end catch
	}//end create user
	

	@GetMapping( "/users/check/{email}" )
	public boolean checkEmail( @PathVariable( "email" ) String email ){
		return userRepository.checkEmail( email ).isPresent();
	}

	@GetMapping("/user/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<users> getCurrentUser( @CurrentUser UserPrincipal currentUser ) {
		try{
        users u = new users(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
		return new ResponseEntity<>( u, HttpStatus.OK );
		}//end try
		catch( Exception e ){
		    return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}//end else
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
		}//end it
		else {
		    return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}//end else
	}//end getUser

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
		}//end try
		else {
		    return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}//end else
	}//end get on Name

	//getUserOnEmail is used to find a user based on what email is provided
	//This function is given an email and returns either the user with that email
	//or null if no user has that email
	@GetMapping( "/users/{email}" )
	public users getUserOnEmail( @PathVariable String email ){
		Optional<users> userData = userRepository.findByEmail( email );
		if( userData.isPresent() ){
			return userData.get( );
		}//end if
		else{
			return null;
		}//end else
	}//end getUserOnEmail

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
		} //end if
		else {
		    return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}//end else
	}// end getonName_Email
	
	//Works on PostMan send put code to localhost:portnumber/api/users/id
	//choose body, chose raw and change type to json
	//enter new data inclosed in '{}' in format
	//"column name":"new data"
	@PutMapping( "/users/{id}" )
	public ResponseEntity<users> updateUser( @PathVariable( "id" ) Long id, @RequestBody users user ) {
		//Print to system out to log the start of method
		System.out.println( "Update User with ID = " + id + "..." );
		//Try to find the user
		Optional<users> userData = userRepository.findById( id );
		//If the user exists change their informatin to the new information
		if ( userData.isPresent() ) {
            users u = userData.get();
            u.setEmail( user.getEmail() );
            u.setName( user.getName() );
            u.setComments( user.getComments() );
			u.setRole( user.getRole( ) );
			u.setPassword( passwordEncoder.encode( user.getPassword() ) );
            u.setRole( user.getRole() );
        
		    //save the new information
		    users update = userRepository.save( u );
		    return new ResponseEntity<>( update, HttpStatus.OK );
        }//end try
        else {
		    return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}//end else
	}//end updateUser
	
	//Works using PostMan send delete code to localhost:portnumber/api/users/{id}
	@DeleteMapping( "/users/{id}" )
	public ResponseEntity<String> deleteUser( @PathVariable( "id" ) Long id ) {
		//Prints to system out for log
		System.out.println( "Delete User with ID = " + id + "..." );
		//Trys to delete entry
		try {
		    userRepository.deleteById( id );
        }//end try
        catch ( Exception e ) {
		    return new ResponseEntity<>( "Fail to delete!", HttpStatus.EXPECTATION_FAILED );
		}//end catch
	
		return new ResponseEntity<>( "User has been deleted!", HttpStatus.OK );
	}//end DeleteUser
}//end userController