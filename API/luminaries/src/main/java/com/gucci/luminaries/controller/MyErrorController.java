package com.gucci.luminaries.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
//MyErrorController is used to control the error page used
@RestController
public class MyErrorController implements ErrorController  {
 
    //if a request comes in to /error print out the message below
    @RequestMapping("/error")
    public String handleError() {
        return "There was an error ask SysAdmin for help or git gud";
    }
 
    //getErrorPath is used to override the traditional error message
    @Override
    public String getErrorPath() {
        return "/error";
    }
}