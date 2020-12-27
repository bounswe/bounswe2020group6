package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Collab implements Serializable {
    private String projectId;


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

