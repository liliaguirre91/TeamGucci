package com.gucci.luminaries.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)

/*  Class ResourceNotFoundException
    -Specifies a specific ResourceNotFoundException that can be 
    -returned by the API.
    -Maps to a NOT_FOUND Http response
*/
public class ResourceNotFoundException extends RuntimeException {
    
    //Prevents a warning
    private static final long serialVersionUID = 1L;
    
    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public ResourceNotFoundException( String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getFieldName() {
        return fieldName;
    }

    public Object getFieldValue() {
        return fieldValue;
    }
} 