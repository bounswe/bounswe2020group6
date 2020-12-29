package com.example.akademise;

import java.io.Serializable;

public class Url implements Serializable {
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
