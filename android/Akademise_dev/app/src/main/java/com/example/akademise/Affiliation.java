package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.HashMap;


public class Affiliation {
    @SerializedName("userId")
    private int userId;
    @SerializedName("id")
    private Integer id;
    @SerializedName("researchAreas")
    private ArrayList<String> researchAreas;
    @SerializedName("affiliation")
    private HashMap<String,String > affiliation;

    public int getUserId() {
        return userId;
    }

    public int getId() {
        return id;
    }

    public  ArrayList<String>  getResearchAreas() {
        return researchAreas;
    }

    public HashMap<String,String>  getAffiliation() {
        return affiliation;
    }

    public Affiliation(ArrayList<String> researchAreas, HashMap<String,String > affiliation) {

        this.researchAreas = researchAreas;
        this.affiliation = affiliation;
    }
}

