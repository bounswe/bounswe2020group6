package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

//class for holding all fields of the project
public class GetProjects implements Serializable {
    //id of the project
    private int id;
    //owners id of the project
    private int userId;
    //title of the project
    private String title;
    //summary of the project
    private String summary;
    //description of the projet
    private String description;
    //privacy of the project
    private boolean privacy;
    //status of the project
    private int status;
    //requirements of the project
    private String requirements;
    //when it is created
    private String createdAt;
    //when it is updated
    private String updatedAt;
    //project owner's data
    private User user;
    //list of project collaborators
    private List<ProjectCollaborators> project_collaborators;
    //tags of the project
    private List<Tag> project_tags;
    //files of the project
    private List<ProjectFiles> project_files;
    //milestones of the project
    private List<Milestone> project_milestones;

    //getters and setters
    public void setId(int id){
        this.id = id;
    }
    public int getId(){
        return this.id;
    }
    public void setUserId(int userId){
        this.userId = userId;
    }
    public int getUserId(){
        return this.userId;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public String getTitle(){
        return this.title;
    }
    public void setSummary(String summary){
        this.summary = summary;
    }
    public String getSummary(){
        return this.summary;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public String getDescription(){
        return this.description;
    }
    public void setPrivacy(boolean privacy){
        this.privacy = privacy;
    }
    public boolean getPrivacy(){
        return this.privacy;
    }
    public void setStatus(int status){
        this.status = status;
    }
    public int getStatus(){
        return this.status;
    }
    public void setRequirements(String requirements){
        this.requirements = requirements;
    }
    public String getRequirements(){
        return this.requirements;
    }
    public void setCreatedAt(String createdAt){
        this.createdAt = createdAt;
    }
    public String getCreatedAt(){
        return this.createdAt;
    }
    public void setUpdatedAt(String updatedAt){
        this.updatedAt = updatedAt;
    }
    public String getUpdatedAt(){
        return this.updatedAt;
    }
    public void setUser(User user){
        this.user = user;
    }
    public User getUser(){
        return this.user;
    }
    public void setProject_collaborators(List<ProjectCollaborators> project_collaborators){
        this.project_collaborators = project_collaborators;
    }
    public List<ProjectCollaborators> getProject_collaborators(){
        return this.project_collaborators;
    }
    public void setProject_tags(List<Tag> project_tags){
        this.project_tags = project_tags;
    }
    public List<Tag> getProject_tags(){
        return this.project_tags;
    }
    public void setProject_files(List<ProjectFiles> project_files){
        this.project_files = project_files;
    }
    public List<ProjectFiles> getProject_files(){
        return this.project_files;
    }
    public void setProject_milestones(List<Milestone> project_milestones){
        this.project_milestones = project_milestones;
    }
    public List<Milestone> getProject_milestones(){
        return this.project_milestones;
    }
}
