package com.example.akademise;

import java.io.Serializable;
import java.util.List;

public class Home implements Serializable {
    private List<GetProjects> byFollowings;

    private List<GetProjects> byUserTags;

    private List<Profile> similarInterests;

    private List<Profile> sameUniversity;

    private List<Profile> sameDepartment;


    public Home(List<GetProjects> byFollowings, List<GetProjects> byUserTags, List<Profile> similarInterests, List<Profile> sameUniversity, List<Profile> sameDepartment) {
        this.byFollowings = byFollowings;
        this.byUserTags = byUserTags;
        this.similarInterests = similarInterests;
        this.sameUniversity = sameUniversity;
        this.sameDepartment = sameDepartment;
    }

    public List<Profile> getSimilarInterests() {
        return similarInterests;
    }

    public List<Profile> getSameUniversity() {
        return sameUniversity;
    }

    public List<Profile> getSameDepartment() {
        return sameDepartment;
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
