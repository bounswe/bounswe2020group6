package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;


public class PersonalInfo {
    private List<String> researchAreas;
    private Affiliation affiliation;

    public PersonalInfo(List<String> researchAreas, Affiliation affiliation) {
        this.researchAreas = researchAreas;
        this.affiliation = affiliation;
    }

    public List<String> getResearchAreas() {
        return researchAreas;
    }

    public Affiliation getAffiliation() {
        return affiliation;
    }
}

