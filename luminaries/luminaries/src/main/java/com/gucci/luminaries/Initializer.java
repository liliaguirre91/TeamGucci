package com.gucci.luminaries;

//import com.gucci.luminaries.repository.OrderRepository;
import com.gucci.luminaries.repository.UserRepository;
import com.gucci.luminaries.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final UserRepository urepository;
    //private final OrderRepository orepository;

    public Initializer( UserRepository urepository/*, OrderRepository oRepository*/ ) {
        this.urepository = urepository;
        //this.orepository = oRepository;
    }

    @Override
    public void run( String... strings ) {
        /*Stream.of( "abc@dba.com", "cba@abc.com", "bac@cab.com",
                "bca@acb.com" ).forEach( email ->
                urepository.save( new users( email ) )
        );*/
        /*Stream.of( "123 ikd lane", "234 idk lane", 
                "345 idk lane" ).forEach( address ->
                orepository.save( new orders( address ) ) );*/

        urepository.findAll().forEach(System.out::println);
        //orepository.findAll().forEach(System.out::println);
    }
}