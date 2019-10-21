package com.gucci.luminaries.controller;

import java.net.URI;
import java.util.Collections;

import javax.validation.Valid;

import com.gucci.luminaries.exception.AppException;
import com.gucci.luminaries.model.Role;
import com.gucci.luminaries.model.RoleName;
import com.gucci.luminaries.model.users;
import com.gucci.luminaries.payload.ApiResponse;
import com.gucci.luminaries.payload.JwtAuthenticationResponse;
import com.gucci.luminaries.payload.LoginRequest;
import com.gucci.luminaries.payload.SignUpRequest;
import com.gucci.luminaries.repository.RoleRepository;
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
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
            
        System.out.println("Username is " + signUpRequest.getUsername());
        System.out.println("Name is " + signUpRequest.getName());
        System.out.println("email is " + signUpRequest.getEmail());
        System.out.println("password is " + signUpRequest.getPassword());


        //TODO: Fix Roles. This returns a null pointer which causes a null pointer exception

       /* if(UserRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(UserRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }*/

        // Creating user's account
        users user = new users(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        //TODO: Fix role setting. Doesn't work right now
         
        /*Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole)); */

        users result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
} 