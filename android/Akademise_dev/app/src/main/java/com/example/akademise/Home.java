package com.example.akademise;

import java.io.Serializable;
import java.util.List;

public class Home implements Serializable {
    private List<GetProjects> byFollowings;

    private List<GetProjects> byUserTags;

    public Home(List<GetProjects> byFollowings, List<GetProjects> byUserTags) {
        this.byFollowings = byFollowings;
        this.byUserTags = byUserTags;
    }

    public List<GetProjects> getByFollowings() {
        return byFollowings;
    }

    public List<GetProjects> getByUserTags() {
        return byUserTags;
    }

    public void setByFollowings(List<GetProjects> byFollowings) {
        this.byFollowings = byFollowings;
    }

    public void setByUserTags(List<GetProjects> byUserTags) {
        this.byUserTags = byUserTags;
    }
}
