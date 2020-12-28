package com.example.akademise;

import java.io.Serializable;

public class Biography implements Serializable {
    private String bio;

    public Biography(String bio) {
        this.bio = bio;
    }
}
