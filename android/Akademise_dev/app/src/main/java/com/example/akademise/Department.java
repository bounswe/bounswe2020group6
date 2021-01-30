package com.example.akademise;

public class Department {
     /*
    Department variable.
    This class is to send data in expected format.
     */

    private String department;

    public Department(String department) {
        this.department = department;
    }

    public void setDepartment(String department){
        this.department = department;
    }
    public String getDepartment(){
        return this.department;
    }
}
