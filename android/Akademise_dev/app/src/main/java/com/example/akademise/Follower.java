package com.example.akademise;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Follower implements Serializable {
    public ArrayList<Datum> data;
}

class Datum{
    public Followed followed;
}

class Followed{
    public int id;
    public String name;
    public String surname;
    public String profile_picture_url;
}
