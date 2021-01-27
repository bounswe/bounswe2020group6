package com.example.akademise;

public class UpdateProject
{
    public UpdateProject(String title, String summary, String requirements, boolean privacy, int status){
        this.title = title;
        this.summary = summary;
        this.requirements = requirements;
        this.privacy = privacy;
        this.status = status;
    }
    private String title;

    private String summary;

    private String description;

    private boolean privacy;

    private String requirements;

    private int status;

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
    public void setRequirements(String requirements){
        this.requirements = requirements;
    }
    public String getRequirements(){
        return this.requirements;
    }
    public void setStatus(int status){
        this.status = status;
    }
    public int getStatus(){
        return this.status;
    }
}
