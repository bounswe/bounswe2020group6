package com.example.akademise;

public class Affiliation {
  /* "title": "student",
     "university": "boun",
     "department": "cmpe"

   */
    private String title;
    private String university;
    private String department;

    public Affiliation(String title, String university, String department) {
        this.title = title;
        this.university = university;
        this.department = department;
    }

    public String getTitle() {
        return title;
    }

    public String getUniversity() {
        return university;
    }

    public String getDepartment() {
        return department;
    }
}
