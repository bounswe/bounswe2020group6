package com.example.akademise;

import java.io.Serializable;
import java.util.List;
import java.util.List;

/*
This class is used to create two different types of requests: getAllEvents and searchEvent (see Akademise.Api)
 */

public class Event{
    public List<EventResult> result;
}

class MyEvent{
    public EventResult result;
}
class EventResult{
    public int id;
    public int userId;
    public String type;
    public boolean isPublic;
    public String title;
    public String body;
    public String link;
    public String location;
    public String date;
    public String other;
    public String createdAt;
    public String updatedAt;
    public List<EventTag> event_tags;
    public EventUser user;
    public  List<EventFav> event_favs;
    public boolean isFavable;
}

class EventTag{
    public String tag;
}

class EventFav{
    public int userId;
    public int eventId;
    public String createdAt;
    public String updatedAt;
}

class EventUser{
    public int id;
    public String name;
    public String surname;
    public String university;
    public String department;
    public String profile_picture_url;
}

