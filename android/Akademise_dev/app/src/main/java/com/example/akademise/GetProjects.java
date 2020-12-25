package com.example.akademise;

import java.util.List;

public class GetProjects {
    private int id;

    private int userId;

    private String title;

    private String summary;

    private String description;

    private int privacy;

    private int status;

    private String requirements;

    private String createdAt;

    private String updatedAt;

    private User user;

    private List<ProjectCollaborators> project_collaborators;

    private List<Tag> project_tags;

    private List<ProjectFiles> project_files;

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
    public void setPrivacy(int privacy){
        this.privacy = privacy;
    }
    public int getPrivacy(){
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
}
