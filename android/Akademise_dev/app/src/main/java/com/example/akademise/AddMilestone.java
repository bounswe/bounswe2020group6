package com.example.akademise;

import java.io.Serializable;

public class AddMilestone implements Serializable
{

    private int projectId;

    private String date;

    private String title;

    private String description;

    private String type;


    public AddMilestone(int project_id, String date, String title, String description){
        this.projectId = project_id;
        this.date = date;
        this.title = title;
        this.description = description;
    }
    public void setProject_id(int project_id){
        this.projectId = project_id;
    }
    public int getProject_id(){
        return this.projectId;
    }
    public void setDate(String date){
        this.date = date;
    }
    public String getDate(){
        return this.date;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public String getTitle(){
        return this.title;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public String getDescription(){
        return this.description;
    }
    public void setType(String type){
        this.type = type;
    }
    public String getType(){
        return this.type;
    }

}