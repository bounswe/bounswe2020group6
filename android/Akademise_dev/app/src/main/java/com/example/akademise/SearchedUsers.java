package com.example.akademise;

import java.io.Serializable;
import java.util.List;

public class SearchedUsers implements Serializable {
    private List<UsersWholeInformation> users;

    public void setUsers(List<UsersWholeInformation> users){
        this.users = users;
    }
    public List<UsersWholeInformation> getUsers(){
        return this.users;
    }
}
