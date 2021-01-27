package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

// Projects fields are prepared for the fields of creating a project call
public class Project implements Serializable {
        //title of the project
        private String title;
        //summary of the project
        private String summary;
        //description of the project
        private String description;
        //privacy of the project
        private boolean privacy;
        //status of the project
        private int status;
        //requirements of the project
        private String requirements;
        //tags of the project
        private List<String> tags;

        //getters and setters
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
        public void setProject_tags(List<String> project_tags){
        this.tags = project_tags;
    }
        public List<String> getProject_tags(){
        return this.tags;
    }

    //constructor for project
    public Project(boolean privacy, int status, String title, String summary,
                   String description, String requirements, List<String> tags) {

        this.privacy = privacy;
        this.status = status;
        this.requirements = requirements;
        this.title = title;
        this.summary = summary;
        this.description = description;
        this.tags = tags;
    }

}

