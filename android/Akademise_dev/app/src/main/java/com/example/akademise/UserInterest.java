package com.example.akademise;

import java.io.Serializable;

public class UserInterest implements Serializable {
    private String interest;

    public void setInterest(String interest){
        this.interest = interest;
    }
    public String getInterest(){
        return this.interest;
    }
}
