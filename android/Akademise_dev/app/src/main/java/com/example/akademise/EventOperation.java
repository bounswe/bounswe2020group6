package com.example.akademise;

import java.io.Serializable;
/*
Used when creating a request that deletes an event.
 */

public class EventOperation implements Serializable {
    public int id;

    public EventOperation(int id) {
        this.id = id;
    }
}
