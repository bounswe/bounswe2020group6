package com.example.akademise;

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
