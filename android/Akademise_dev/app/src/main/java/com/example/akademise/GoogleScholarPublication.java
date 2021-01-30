package com.example.akademise;

import java.io.Serializable;

public class GoogleScholarPublication implements Serializable {
    /*  this class is to get the google scholar publications information from the backend.
       We show title and venue on the Google Scholar page. (Google Scholar Fragment)
    */
    public class Publications
    {
        private String title;

        private String authors;

        private String venue;

        private int citations;

        private int year;

        public void setTitle(String title){
            this.title = title;
        }
        public String getTitle(){
            return this.title;
        }
        public void setAuthors(String authors){
            this.authors = authors;
        }
        public String getAuthors(){
            return this.authors;
        }
        public void setVenue(String venue){
            this.venue = venue;
        }
        public String getVenue(){
            return this.venue;
        }
        public void setCitations(int citations){
            this.citations = citations;
        }
        public int getCitations(){
            return this.citations;
        }
        public void setYear(int year){
            this.year = year;
        }
        public int getYear(){
            return this.year;
        }
    }
}
