package com.gucci.luminaries.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.lang.annotation.*;

@Target({ElementType.PARAMETER, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@AuthenticationPrincipal

/*  Interface CurrentUser
    -Creates a CurrentUser object that can be 
    -passed through the API and used in the 
    -user interface to get the currently logged in user.
*/
public @interface CurrentUser {

} 