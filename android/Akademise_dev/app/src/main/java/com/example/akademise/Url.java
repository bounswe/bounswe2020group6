package com.example.akademise;

import java.io.Serializable;

public class Url implements Serializable {
    //this class is to send google scholar url in an expected format to the backend.
    private String url;

    public void setUrl(String url){
        this.url = url;
    }
    public String getUrl(){
        return this.url;
    }

    public Url(String url) {
        this.url = url;
    }
}
