package com.example.akademise;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
//wrapper class to make it easier to update the affiliation information
public class ProfileUpdate implements Serializable {
    public List<String> researchAreas;
    public Affiliation affiliation;

    public ProfileUpdate(ArrayList<String> user_interests, Affiliation affiliation) {
        this.researchAreas = user_interests;
        this.affiliation = affiliation;
    }

    public List<String> getResearchAreas() {
        return researchAreas;
    }

    public Affiliation getAffiliation() {
        return affiliation;
    }
}
