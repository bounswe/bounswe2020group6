package com.example.akademise;

import java.io.Serializable;
import java.util.List;

public class SearchedUsers implements Serializable {
    private List<Profile> nameMatchedResults;

    public void setUsers(List<Profile> users){
        this.nameMatchedResults = users;
    }
    public List<Profile> getUsers(){
        return this.nameMatchedResults;
    }

    public SearchedUsers(List<Profile> users) {
        this.nameMatchedResults = users;
    }
}
