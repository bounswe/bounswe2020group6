package com.example.akademise;

import java.io.Serializable;

public class Tag implements Serializable {

    private String tag;

    public Tag(String tag) {
        this.tag = tag;
    }

    public void setTag(String tag){
        this.tag = tag;
    }
    public String getTag(){
        return this.tag;
    }
}
