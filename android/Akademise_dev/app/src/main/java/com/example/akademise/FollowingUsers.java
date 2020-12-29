package com.example.akademise;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class FollowingUsers implements Serializable {
    public ArrayList<Data> data;
}

class Data{
    public Following following;
}

class Following{
    public int id;
    public String name;
    public String surname;
    public String profile_picture_url;
}
