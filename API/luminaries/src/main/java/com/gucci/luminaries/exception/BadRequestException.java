package com.gucci.luminaries.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

/*  Class BadRequestException
    -Specifies a particular exception that can be thrown by 
    -the API called a BadRequestException
    -Maps to a BAD_REQUEST Http response
*/
public class BadRequestException extends RuntimeException {

    //Prevents a warning
    private static final long serialVersionUID = 1L;

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}