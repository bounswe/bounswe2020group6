package com.example.akademise;

public class User {
    private String email;

    private String password;

    private String name;

    private String surname;

    private String accessToken;

    private String message;

    private Integer id;

    //SIGNUP
    public User(String email, String password, String name, String surname) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getAccessToken() { return accessToken; }

    public Integer getUserId() {
        return id;
    }
}
