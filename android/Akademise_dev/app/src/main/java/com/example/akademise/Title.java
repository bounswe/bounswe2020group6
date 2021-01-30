package com.example.akademise;

public class Title {
    /*
   Title variable. (Title of a user like student)
   This class is to send data in expected format.
    */
    private String title;

    public Title(String title) {
        this.title = title;
    }

    public void setTitle(String title){
        this.title = title;
    }
    public String getTitle(){
        return this.title;
    }
}
