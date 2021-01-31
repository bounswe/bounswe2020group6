package com.example.akademise;

import java.io.Serializable;
/*
Used as a body when creating a searchEvent request.
 */

public class EventFilters implements Serializable {
    public Filters filters;

    public EventFilters(Filters filters) {
        this.filters = filters;
    }

    public Filters getFilters() {
        return filters;
    }
}

class Filters{
    public int userId;

    public Filters(int userId){
        this.userId = userId;
    }
}
