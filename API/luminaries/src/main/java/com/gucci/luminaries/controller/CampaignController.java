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
public class CampaignController {
    
    @Autowired
    CampaignRepository campaignRepository;
    
    //Select all method 
    //While running go to localhost:port_number/api/campaigns
    //This will return all campaigns in the table
    //Get mapping specifies the url for the request
    //and sets it up as a get signal
    @GetMapping( "/campaigns" )
    public List<campaigns> getAllCampaigns() {
        //System log to show startup
        System.out.println( "Get all Campaigns..." );
    
        List<campaigns> list = new ArrayList<>();
        //Run select all method from campaign repository
        //that queries the database and returns all entries
        Iterable<campaigns> o = campaignRepository.selectAll();
    
        //add each campaign to a list to return
        o.forEach( list::add );
        //Return the list to the api to print 
        //it to the screen
        return list;
    }//end getAllCampaigns
    
    //Create campaign function is used to create a new campaign
    //Send a post request to /api/campaigns/create
    //with a json body that has the entry information
    //for all fields in the campaign table
    @PostMapping( "/campaigns/create" )
    public long createCampaign( @Valid @RequestBody campaigns campaign ) {
         //Print to the console for logging
        System.out.println( "Create Campaign: " + campaign.getYearRan() + "..." );
        //Add the campiagn to the table and return the key to show
        //it worked
        campaignRepository.save( campaign );
        return campaign.getYearRan();
    }//end create campaign
    
    //getCampaign returns a campaign information based on their id
    //The url look like localhost:port_number/api/campaigns/{the year ran}
    @GetMapping( "/campaigns/{id}" )
    public ResponseEntity<campaigns> getCampaign( @PathVariable( "id" ) long id ) {
        //Print to system out to log the start of this method
        System.out.println( "Get Campaign by id..." );
    
        //Run findById method from campaign repository
        //this method runs a query that searches the database for the given id
        Optional<campaigns> campaignData = campaignRepository.findById(id);
        if ( campaignData.isPresent() ) {
            return new ResponseEntity<>( campaignData.get(), HttpStatus.OK );
        }//end if
        else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND );
        }//end else
    }//end getCampaign
    
    //Delete Campaign deletes the campaign indicated
    //It is given the year ran and returns that it was deleted
    //or it wasn't
    @DeleteMapping( "/campaigns/{id}" )
    public ResponseEntity<String> deleteCampaign( @PathVariable( "id" ) long id ) {
        //Print to the console to log
        System.out.println( "Delete Campaign with ID = " + id + "..." );
    
        //try to delete the campiagn
        //if it returns print out it failed or if it 
        //succeeds indicate as such
        try {
            campaignRepository.deleteById( id );
        }//end try
        catch ( Exception e ) {
            return new ResponseEntity<>( "Fail to delete!", HttpStatus.EXPECTATION_FAILED );
        }//end catch
    
        return new ResponseEntity<>( "Campaign has been deleted!", HttpStatus.OK );
    }//end Delete Campaign
}//end Campaign Controller