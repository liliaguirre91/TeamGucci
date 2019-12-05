package com.gucci.luminaries.payload;

/* Class JwtAuthenticationResponse
    -Custom Authentication response. Used during authentication 
    -to return a correct sign in response.
    -Displays the accessToken string and specifies the token type 
    -as "Bearer".
*/
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
} 