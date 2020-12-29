package com.example.akademise;

import java.io.Serializable;

public class ProjectFiles implements Serializable {
    private String file_name;

    public void setFile_name(String file_name){
        this.file_name = file_name;
    }
    public String getFile_name(){
        return this.file_name;
    }

}
