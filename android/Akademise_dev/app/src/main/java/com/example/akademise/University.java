package com.example.akademise;

public class University {
    /*
    University variable.
    This class is to send data in expected format.
     */

    private String university;

    public University(String university) {
        this.university = university;
    }

    public void setUniversity(String university){
        this.university = university;
    }
    public String getUniversity(){
        return this.university;
    }
}
