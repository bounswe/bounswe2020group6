package com.example.akademise;

import java.io.Serializable;

//class that hold file name of the project files
public class ProjectFiles implements Serializable {
    private String file_name;

    //getter and setter
    public void setFile_name(String file_name){
        this.file_name = file_name;
    }
    public String getFile_name(){
        return this.file_name;
    }

}
