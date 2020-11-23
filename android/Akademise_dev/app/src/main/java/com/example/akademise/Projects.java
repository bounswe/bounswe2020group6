package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Projects {
    @SerializedName("projects")
    private List<Project> projects;

    public Projects(List<Project> projects){
        this.projects=projects;
    }
    public List<Project> getProjects(){
        return projects;
    }
}
