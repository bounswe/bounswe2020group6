package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Map;

public class Request implements Serializable {
    //serialized the field names to match them with the api function's field names
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
//getter methods
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

// object to represent a request , field names are self- explanatory
    public Request(Integer id,Integer requesterId, Integer requestedId, Integer projectId, Map<String, String> requesterUser, Project project) {
        this.requesterId = requesterId;
        this.requestedId = requestedId;
        this.projectId = projectId;
        this.requesterUser = requesterUser;
        this.project = project;
        this.requestId = id;
    }
}



