package com.example.akademise;

import java.util.ArrayList;
import java.util.List;
public class AddTag
{
    private List<String> tags;

    private int projectId;

    public AddTag(List<String> tags, int projectId){
        this.tags = tags;
        this.projectId = projectId;
    }
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
