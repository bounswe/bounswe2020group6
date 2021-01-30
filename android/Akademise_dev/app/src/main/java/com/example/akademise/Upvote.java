package com.example.akademise;

import java.io.Serializable;
//represent the userid of the upvote
public class Upvote implements Serializable {
    int userId;

    public Upvote(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
