package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

//class to represent received or sent invitations
public class Invitation implements Serializable {
    @SerializedName("requests")

    private List<List<Integer>>invitations ;


    public Invitation(List<Integer> details) {
        //list of invitations
        List<List<Integer>> i = new ArrayList<>();
        i.add(details);
        this.invitations = i;
    }

    public List<Integer> getinvitation() {
        return invitations.get(0);
    }

}

