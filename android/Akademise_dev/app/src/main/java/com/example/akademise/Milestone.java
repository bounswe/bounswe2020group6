package com.example.akademise;

import java.io.Serializable;

//fiels of the milestone when we make a get call
public class Milestone implements Serializable
{
//id of the milestone
private int id;
//project id of the milestone
private int project_id;
//deadline of the milestone
private String date;
//title of the milestone
private String title;
//description of the milestone
private String description;
//type of the milestone(mostly null)
private String type;
//when the milestone is created
private String createdAt;
//when it is updated
private String updatedAt;

//getters and setters
public void setId(int id){
        this.id = id;
        }
public int getId(){
        return this.id;
        }
public void setProject_id(int project_id){
        this.project_id = project_id;
        }
public int getProject_id(){
        return this.project_id;
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
        }