package com.example.akademise;

import java.io.Serializable;
//represent user interests
public class UserInterest implements Serializable {
    private String interest;

    public UserInterest(String interest) {
        this.interest = interest;
    }

    public void setInterest(String interest){
        this.interest = interest;
    }
    public String getInterest(){
        return this.interest;
    }
}
