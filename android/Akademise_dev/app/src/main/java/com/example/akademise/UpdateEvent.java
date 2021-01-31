package com.example.akademise;

import java.io.Serializable;
import java.util.List;
/*
Used when creating a request that updates a specific event.
 */
public class UpdateEvent implements Serializable {
    public Update update;

    public UpdateEvent(Update update) {
        this.update = update;
    }
}

class Update{
    public String type;
    public String title;
    public String body;
    public String date;
    public String location;
    public String other;
    public String link;
    public List<String> event_tags;
    public int isPublic;

    public Update(String type, String title, String body, String date, String location, String other, String link, List<String> event_tags, int isPublic) {
        this.type = type;
        this.title = title;
        this.body = body;
        this.date = date;
        this.location = location;
        this.other = other;
        this.link = link;
        this.event_tags = event_tags;
        this.isPublic = isPublic;
    }
}