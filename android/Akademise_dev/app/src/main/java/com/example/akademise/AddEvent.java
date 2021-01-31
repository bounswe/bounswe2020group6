package com.example.akademise;

import java.io.Serializable;
import java.util.List;

/*
This class is used to create requests when adding an event to the system.
 */

public class AddEvent implements Serializable {
    public int userId;
    public String type;
    public int isPublic;
    public String title;
    public String body;
    public String link;
    public String location;
    public String date;
    public String other;
    public List<String> tags;

    public AddEvent(int userId, String type, int isPublic, String title, String body, String link, String location, String date, String other, List<String> tags) {
        this.userId = userId;
        this.type = type;
        this.isPublic = isPublic;
        this.title = title;
        this.body = body;
        this.link = link;
        this.location = location;
        this.date = date;
        this.other = other;
        this.tags = tags;
    }
    public AddEvent(int userId){
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public String getType() {
        return type;
    }

    public int getIsPublic() {
        return isPublic;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public String getLink() {
        return link;
    }

    public String getLocation() {
        return location;
    }

    public String getDate() {
        return date;
    }

    public String getOther() {
        return other;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setIsPublic(int isPublic) {
        this.isPublic = isPublic;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setOther(String other) {
        this.other = other;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
