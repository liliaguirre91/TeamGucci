package com.gucci.luminaries.payload;

import javax.validation.constraints.NotBlank;

/*  Class LoginRequest
    -Used during authentication when logging in. 
    -Creates a LoginRequest object that gets passed to AuthController
    -Holds information for the user's Email and password
*/
public class LoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
} 