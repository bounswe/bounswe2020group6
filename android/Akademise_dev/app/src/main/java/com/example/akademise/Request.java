package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Map;

public class Request implements Serializable {
    @SerializedName("requesterId")
    private Integer requesterId;

    public Integer getRequestId() {
        return requestId;
    }

    @SerializedName("id")
    private Integer requestId;

    @SerializedName("requestedId")
    private Integer requestedId;

    @SerializedName("projectId")
    private Integer projectId;

    private Integer requestType;

    public Integer getRequestType() {
        return requestType;
    }

    @SerializedName("user")
    private Map<String, String> requesterUser;

    @SerializedName("project")
    private Project project;

    public Integer getRequesterId() {
        return requesterId;
    }

    public Integer getRequestedId() {
        return requestedId;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public Map<String, String> getRequesterUser() {
        return requesterUser;
    }

    public Project getProject() {
        return project;
    }


    public Request(Integer id,Integer requesterId, Integer requestedId, Integer projectId, Map<String, String> requesterUser, Project project) {
        this.requesterId = requesterId;
        this.requestedId = requestedId;
        this.projectId = projectId;
        this.requesterUser = requesterUser;
        this.project = project;
        this.requestId = id;
    }
}



