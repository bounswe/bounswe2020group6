package com.example.akademise;

import java.util.List;

public class GoogleScholar {
    /*  this class is to get the google scholar information from the backend.
        We show total_citations and publications on the Google Scholar page. (Google Scholar Fragment)
     */
    private String message;

    private int total_citations;

    private List<GoogleScholarPublication> publications;

    private int last_5_years_total;

    public void setMessage(String message){
        this.message = message;
    }
    public String getMessage(){
        return this.message;
    }
    public void setTotal_citations(int total_citations){
        this.total_citations = total_citations;
    }
    public int getTotal_citations(){
        return this.total_citations;
    }
    public void setPublications(List<GoogleScholarPublication> publications){
        this.publications = publications;
    }
    public List<GoogleScholarPublication> getPublications(){
        return this.publications;
    }
    public void setLast_5_years_total(int last_5_years_total){
        this.last_5_years_total = last_5_years_total;
    }
    public int getLast_5_years_total(){
        return this.last_5_years_total;
    }
}
