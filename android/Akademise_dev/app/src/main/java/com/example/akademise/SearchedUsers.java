package com.example.akademise;

import java.util.List;

public class SearchedUsers {
    private List<UsersWholeInformation> users;

    public void setUsers(List<UsersWholeInformation> users){
        this.users = users;
    }
    public List<UsersWholeInformation> getUsers(){
        return this.users;
    }
}
