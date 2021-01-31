package com.example.akademise;
/*
Used when creating a validation request.
 */
public class Validation {
    private String code;

    private String token;

    public Validation(String code) {
        this.code = code;
    }

    public String getAccessToken() {
        return token;
    }
}
