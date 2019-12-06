package com.gucci.luminaries.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.text.SimpleDateFormat;

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

    @Autowired
    ProductOrderedRepository productOrderedRepository;

    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
 
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
        Timestamp d = new Timestamp(System.currentTimeMillis());
        sdf.format( d );
        order.setCreatedAt( d );
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
 
    //orderCount is used to count the number of orders in a given campaign
    //it is given the id of the chosen campaign and it returns a number
    //which is the total number of orders made in that campaign
    @GetMapping( "/orders/count/{camp}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public int orderCount( @PathVariable( "camp" ) Long camp ){
    
        //get order information
        int c = orderRepository.countOrders( camp );
        //If the order exists return its information
        return c;
    }//end orderCount

    @GetMapping( "/orders/find/{address}/{camp}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<?> orderFind( @PathVariable( "address" ) String address, @PathVariable( "camp" ) int camp ){
    
        Iterable<orders> orderData = orderRepository.findByAddress( address, camp );
        if ( orderData != null ) {
            return new ResponseEntity<>( orderData, HttpStatus.OK );
        }//end if
        else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end else
    }//end orderCount

    //countProducts is expecting an integer camp and a product id it then returns the number of
    //products of that id that have been delivered in the specified campaign the user running it 
    //has to be some type of admin
    @GetMapping( "/orders/products/{camp}/{product}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<Long> countProducts( @PathVariable( "camp" ) int camp, 
        @PathVariable( "product" ) long product ){
        //initalize the total to 0 and make a list to be iterated through
        long total = 0;
        List<orders> list = new ArrayList<>();
        //try to get a list of all orders made in the given campaign that have been delivered 
        //then for each one count how many of the given product were in that order and add that
        //number to the total if any part fails through a 404 error
        try{
            Iterable<orders> o = orderRepository.getCamp( camp );
            o.forEach( list::add );
            for( int i = 0; i < list.size(); i++ ){
                orders temp = list.get( i );
                Optional<Long> temp2 = productOrderedRepository.getQuantity( temp.getOrderId(), product );
                if( temp2.isPresent() ){
                    total = total + temp2.get( );
                }//end if
            }//end for
            return new ResponseEntity<>( total, HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catch
    }//end countProducts

    //getAmountPaid id used to get the total amount of money that has been paid
    //it takes the campaign id for the campaign that the revenue is asked for
    //it returns a number which is the amount of money earned
    @GetMapping( "/orders/total/{camp}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<Long> getAmountPaid( @PathVariable( "camp" ) int camp ){
        //try to run the getSum function from the order repository and return its results
        //otherwise return a 404
        try{
            return new ResponseEntity<>( orderRepository.getSum( camp ), HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catrch
    }//end getAmountPaid

    //getAmountOwed is used to get the totalCost of all orders in a given campaign
    //it returns a number which is how much the total cost of all products ordered
    //in the given campaign is
    @GetMapping( "/orders/totalCost/{camp}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<Long> getAmountOwed( @PathVariable( "camp" ) int camp ){
        //try to run the getTotalCost function from the order repository and return its
        //result if you can't return a 404 error
        try{
            return new ResponseEntity<>( orderRepository.getTotalCost( camp ), HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catrch
    }//end getAmountPaid

    //getCamp is used to get all of the orders in a given campaign
    //ir returns a list of all the orders that were asked for
    @GetMapping( "orders/campaign/{camp}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<List<orders>> getCamp( @PathVariable( "camp" ) int camp ){
        //initalize the list to be returned
        List<orders> list = new ArrayList<>();
        //try to run the getCampaign function from the order repository
        //for every order in the returned value add it to the list to be returned
        //and return it if there is an error return a 404 error code
        try{
            Iterable<orders> o = orderRepository.getCampaign( camp );
            o.forEach( list::add );
            return new ResponseEntity<>( list, HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catch
    }//end getCamp

    //getToBeDelivered is used to get the list of orders that need to be delivered
    //it is given a campaign to check and it returns a list of orders
    @GetMapping( "orders/deliver/{camp}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<List<orders>> getToBeDelivered( @PathVariable( "camp" ) int camp ){
        //initalize the list to be returned
        List<orders> list = new ArrayList<>();
        //try to run the getToBeDelivered function from the order repository
        //for every order in the returned value add it to the list to be returned
        //and return it if there is an error return a 404 error code        
        try{
            Iterable<orders> o = orderRepository.getToBeDelivered( camp );
            o.forEach( list::add );
            return new ResponseEntity<>( list, HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catch
    }//end getToBeDelivered

    //getDelivered is used to get all the orders that have been delivered
    //it is expecting an id of the campaign it is suppossed to check
    @GetMapping( "orders/delivered/{camp}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<List<orders>> getDelivered( @PathVariable( "camp" ) int camp ){
        //initalize the list to be returned
        List<orders> list = new ArrayList<>();
        //try to run the getDelivered function from the order repository
        //for every order in the returned value add it to the list to be returned
        //and return it if there is an error return a 404 error code 
        try{
            Iterable<orders> o = orderRepository.getDelivered( camp );
            o.forEach( list::add );
            return new ResponseEntity<>( list, HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catch
    }//end getDelivered

    //getPrevious is used to get all of the previous orders of a user
    //it is expecting a userId and it returns a list of all the orders that user
    //has made
    @GetMapping( "orders/previous/{userId}" )
    @PreAuthorize( "isAuthenticated()" )
    public ResponseEntity<List<orders>> getPrevious( @PathVariable( "userId" ) long userId ){
        //initalize the list to be returned
        List<orders> list = new ArrayList<>();
        //try to run the getPrevious function from the order repository
        //for every order in the returned value add it to the list to be returned
        //and return it if there is an error return a 404 error code 
        try{
            Iterable<orders> o = orderRepository.getPrevious( userId );
            o.forEach( list::add );
            return new ResponseEntity<>( list, HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catch
    }//end getPrevious

    @GetMapping( "orders/notPaid" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<List<orders>> getNotPaid( ){
        List<orders> list = new ArrayList<>();
        try{
            Iterable<orders> o = orderRepository.getNotPaid( );
            o.forEach( list::add );
            return new ResponseEntity<>( list, HttpStatus.OK );
        }//end try
        catch( Exception e ){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end catch
    }
 
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
            o.setName( order.getName() );
            o.setPaid( order.getPaid() );

        
            orders update = orderRepository.save( o );
            return new ResponseEntity<>( update, HttpStatus.OK );
        }//end if
        else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end else
    }//end updateOrder

    //setDelivered is used to set the delivery status of an order
    //it is expecting an order id and the status that needs to be set to that order
    //and returns all of the orders information after the update
    @PutMapping( "/orders/delivered/{id}/{bool}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<orders> setDelivered( @PathVariable( "id" ) long id, @PathVariable( "bool" ) boolean bool ){
        //try to find the specifed order
        Optional<orders> orderData = orderRepository.findById( id );
        //if the order exists get its current information and change the delivery status
        //once the status is changed save the order back to the respository
        //then return the orders new information if the order doesn't exist return a 404 error
        if( orderData.isPresent() ){
            orders o = orderData.get();
            o.setDelivered( bool );
            return new ResponseEntity<>( orderRepository.save( o ), HttpStatus.OK );
        }//end if 
        else{
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end else
    }//end setDelivered

    //setPaid is used to change the amount paid of a given order
    //it is expecting the order id and how much to add to the paid field
    //it returns the order with its new information
    @PutMapping( "/orders/paid/{id}/{amount}" )
    @PreAuthorize( "hasAnyAuthority('Role_ADMIN','Role_ROOT')" )
    public ResponseEntity<orders> setPaid( @PathVariable( "id" ) long id, @PathVariable( "amount" ) int paid ){
        //find the specified order
        Optional<orders> orderData = orderRepository.findById( id );
        //if the order exists add the amount given to the paid field of the order and return the order
        //otherwise return error code 404
        if( orderData.isPresent() ){
            orders o = orderData.get();
            o.setPaid( o.getPaid( ) + paid );
            return new ResponseEntity<>( orderRepository.save( o ), HttpStatus.OK );
        }//end if 
        else{
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end else
    }//end setDelivered

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