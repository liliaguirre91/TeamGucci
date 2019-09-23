package com.gucci.lumiaries;

import com.gucci.lumiaries.repository.UserRepository;
import com.gucci.lumiaries.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final UserRepository repository;

    public Initializer( UserRepository repository ) {
        this.repository = repository;
    }

    @Override
    public void run( String... strings ) {
        Stream.of( "abc@dba.com", "cba@abc.com", "bac@cab.com",
                "bca@acb.com" ).forEach( email ->
                repository.save( new users( email ) )
        );
        repository.findAll().forEach(System.out::println);
    }
}