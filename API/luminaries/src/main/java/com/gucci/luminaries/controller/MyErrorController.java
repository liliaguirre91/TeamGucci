package com.gucci.luminaries.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
@RestController
public class MyErrorController implements ErrorController  {
 
    @RequestMapping("/error")
    public String handleError() {
        return "Who knows why this page shows up?";
    }
 
    @Override
    public String getErrorPath() {
        return "/error";
    }
}