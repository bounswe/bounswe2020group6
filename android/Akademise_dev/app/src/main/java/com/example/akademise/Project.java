package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.sql.Date;

// Projects fields are prepared with respect to return of search

public class Project {
    @SerializedName("userId")
    private int userId;
    @SerializedName("id")
    private Integer id;
    @SerializedName("title")
    private String title;
    @SerializedName("abstract")
    private String abstract1;
    @SerializedName("content")
    private String content;
    @SerializedName("privacty")
    private Integer privacy;
    @SerializedName("status")
    private Integer status;
    @SerializedName("deadline")
    private String deadline;
    @SerializedName("requirements")
    private String requirements;
    @SerializedName("createdat")
    private String createdat;
    @SerializedName("updatedat")
    private String updatedat;



    public int getUserId() {
        return userId;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAbstract1() {
        return abstract1;
    }

    public String getContent() {
        return content;
    }

    public int getPrivacy() {
        return privacy;
    }
    public int getStatus() {
        return status;
    }

    public String getDeadline(){
        return deadline;
    }

    public String getRequirements() {
        return requirements;
    }

    public String getCreatedat() {
        return createdat;
    }

    public String getUpdatedat() {
        return updatedat;
    }

    public Project(int privacy, int status, String deadline, String requirements) {
        //TODO collaborators and tags are missing in the constructor
        //collaborators (array of ids)
        //tags (array of str)
        this.privacy = privacy;
        this.status = status;
        this.deadline = deadline;
        this.requirements = requirements;
    }
    public Project(int privacy, int status, String title, String abstract1, String content, String createdat, String updatedat, String deadline, String requirements) {

        this.privacy = privacy;
        this.status = status;
        this.deadline = deadline;
        this.requirements = requirements;
        this.title=title;
        this.abstract1=abstract1;
        this.content=content;
        this.createdat=createdat;
        this.updatedat=updatedat;
    }

}

