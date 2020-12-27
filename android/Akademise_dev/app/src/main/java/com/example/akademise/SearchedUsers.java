package com.example.akademise;

import java.io.Serializable;
import java.util.List;

public class SearchedUsers implements Serializable {
    private List<Profile> users;

    public void setUsers(List<Profile> users){
        this.users = users;
    }
    public List<Profile> getUsers(){
        return this.users;
    }
}
