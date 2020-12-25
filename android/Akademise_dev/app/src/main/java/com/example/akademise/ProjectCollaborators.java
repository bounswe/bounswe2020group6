package com.example.akademise;

public class ProjectCollaborators {
    private int user_id;

    private User user;

    public void setUser_id(int user_id){
        this.user_id = user_id;
    }
    public int getUser_id(){
        return this.user_id;
    }
    public void setUser(User user){
        this.user = user;
    }
    public User getUser(){
        return this.user;
    }

    public ProjectCollaborators(int user_id, User user) {
        this.user_id = user_id;
        this.user = user;
    }
}
