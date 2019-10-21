package com.gucci.luminaries.payload;

import javax.validation.constraints.NotBlank;

//Used during authentication when logging in. Creates a LoginRequest object
//that gets passed to AuthController
//Allows log in with either username or email
public class LoginRequest {
    @NotBlank
    private String usernameOrEmail;

    @NotBlank
    private String password;

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
} 