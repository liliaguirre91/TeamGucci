package com.gucci.luminaries.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/*  Class AppException
    -Specifies a specific exception that can be returned
    -by the API called an AppException.
    -Maps to an INTERNAL_SERVER_ERROR Http Response.
*/
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class AppException extends RuntimeException {
    
    //Prevents a warning
    private static final long serialVersionUID = 1L;

    public AppException(String message) {
        super(message);
    }

    public AppException(String message, Throwable cause) {
        super(message, cause);
    }
} 