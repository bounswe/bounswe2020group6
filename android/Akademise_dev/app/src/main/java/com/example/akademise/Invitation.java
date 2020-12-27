package com.example.akademise;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Invitation implements Serializable {
    private List<List<Integer>>invitations ;


    public Invitation(List<Integer> details) {
        List<List<Integer>> i = new ArrayList<>();
        i.add(details);
        this.invitations = i;
    }

    public List<Integer> getinvitation() {
        return invitations.get(0);
    }

}

