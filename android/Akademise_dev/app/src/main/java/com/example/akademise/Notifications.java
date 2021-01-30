package com.example.akademise;

public class Notifications {
    /*
    This class is to get notifications in an expected format from backend
     */

        private int id;

        private int projectId;

        private int type;

        private int accepterId;

        private int participantId;

        private int receiverId;

        private String body;

        private String createdAt;

        private String updatedAt;

        private User accepter;

        private User participant;

        private GetProjects project;

    public int getId() {
        return id;
    }

    public int getProjectId() {
        return projectId;
    }

    public int getType() {
        return type;
    }

    public int getAccepterId() {
        return accepterId;
    }

    public int getParticipantId() {
        return participantId;
    }

    public int getReceiverId() {
        return receiverId;
    }

    public String getBody() {
        return body;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public User getAccepter() {
        return accepter;
    }

    public User getParticipant() {
        return participant;
    }

    public GetProjects getProject() {
        return project;
    }
}
