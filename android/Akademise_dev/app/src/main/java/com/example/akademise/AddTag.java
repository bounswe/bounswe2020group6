package com.example.akademise;

import java.util.ArrayList;
import java.util.List;

//the object for adding new tags for a project
public class AddTag
{
    //tags that will be added
    private List<String> tags;
    //project's id which will tags will be added
    private int projectId;
    //constructor of the add tag object
    public AddTag(List<String> tags, int projectId){
        this.tags = tags;
        this.projectId = projectId;
    }
    //getters and setters
    public void setTags(List<String> tags){
        this.tags = tags;
    }
    public List<String> getTags(){
        return this.tags;
    }
    public void setProjectId(int projectId){
        this.projectId = projectId;
    }
    public int getProjectId(){
        return this.projectId;
    }
}
