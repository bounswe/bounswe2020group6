package com.example.akademise;

import java.io.Serializable;

public class Biography implements Serializable {
    /*
   Biography variable.
   This class is to send and get data in expected format.
    */
    private String bio;

    public Biography(String bio) {
        this.bio = bio;
    }
}
