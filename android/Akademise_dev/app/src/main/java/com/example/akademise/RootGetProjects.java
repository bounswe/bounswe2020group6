package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

public class RootGetProjects implements Serializable {
    @SerializedName("projects")
    private List<GetProjects> projects;

    public RootGetProjects(List<GetProjects> projects){
        this.projects=projects;
    }
    public List<GetProjects> getProjects(){
        return projects;
    }
}
