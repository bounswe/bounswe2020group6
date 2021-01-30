package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

//class to represent colllaborated users
public class Collab implements Serializable {
    //id of the collabrative project
    private String projectId;
    //id of the collaborator
    private String userId;


    public Collab(String pId, String userId) {
        this.projectId = pId;
        this.userId = userId;
    }

    public String getProjectId() {
        return projectId;
    }

    public String getUserId() {
        return userId;
    }
}

