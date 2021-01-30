package com.example.akademise;

import java.io.Serializable;

public class Id implements Serializable {
    /*
    It is expected to get a json by the backend like below.
    {
        id=1
    }
     */

    private int id;

    public Id(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
