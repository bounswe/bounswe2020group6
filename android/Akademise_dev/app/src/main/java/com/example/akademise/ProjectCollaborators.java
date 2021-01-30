package com.example.akademise;

import java.io.Serializable;

//to represent collaborators
// class representation makes it easier to send a request with api
public class ProjectCollaborators implements Serializable {
    private int user_id;

    private User user;

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getUser_id() {
        return this.user_id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return this.user;
    }

    //user id and the related user object
    public ProjectCollaborators(int user_id, User user) {
        this.user_id = user_id;
        this.user = user;
    }
}
