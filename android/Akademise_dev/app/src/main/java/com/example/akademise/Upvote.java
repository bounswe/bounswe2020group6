package com.example.akademise;

import java.io.Serializable;

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
