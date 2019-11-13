package com.gucci.luminaries.controller;

import java.net.URI;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import javax.validation.Valid;

import com.gucci.luminaries.model.users;
import com.gucci.luminaries.payload.JwtAuthenticationResponse;
import com.gucci.luminaries.payload.LoginRequest;
import com.gucci.luminaries.payload.SignUpRequest;
import com.gucci.luminaries.repository.UserRepository;
import com.gucci.luminaries.security.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


//Controller for authentication. Specifies mapping to
// /api/auth/signin for signing an existing user in
// and /api/auth/signup for signing up a new user
// Both use POST method
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
            
        //System.out.println("Username is " + signUpRequest.getUsername());
        //System.out.println("Name is " + signUpRequest.getName());
        //System.out.println("email is " + signUpRequest.getEmail());
        //System.out.println("password is " + signUpRequest.getPassword());

        // Creating user's account
        users user = new users(signUpRequest.getName(),
                signUpRequest.getEmail(), signUpRequest.getPassword());
        Timestamp d = new Timestamp(System.currentTimeMillis());
        sdf.format( d );
        user.setCreatedAt( d );

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRole( "Role_USER" ); 

        users result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{email}")
                .buildAndExpand(result.getEmail()).toUri();

        return ResponseEntity.created(location).body( "User registered successfully" );
    }
} 