package com.example.akademise;

import java.io.Serializable;
import java.util.List;

public class SearchedUsers implements Serializable {
    /*
    This class is to get searched users in an expected format from backend
     */
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
