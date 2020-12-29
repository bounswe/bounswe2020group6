package com.example.akademise;

import java.io.Serializable;
import java.util.List;

public class Profile implements Serializable {
    private int id;

    private String name;

    private String surname;

    private String email;

    private String profile_picture_url;

    private String scholar_profile_url;

    private String university;

    private String projects;

    private boolean isValidated;

    private String department;

    private String title;

    private String bio;

    private String citations;

    private String iIndex;

    private String hIndex;

    private String last5Year_citations;

    private String last5Year_iIndex;

    private String last5Year_hIndex;

    private List<UserInterest> user_interests;

    private int upCounts;

    private boolean isUpped;

    private int followerCount;

    private int followingCount;

    private boolean canFollow;


    public Profile(String bio) {
        this.bio = bio;
    }

    public void setId(int id){
        this.id = id;
    }
    public int getId(){
        return this.id;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return this.name;
    }
    public void setSurname(String surname){
        this.surname = surname;
    }
    public String getSurname(){
        return this.surname;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getEmail(){
        return this.email;
    }
    public void setProfile_picture_url(String profile_picture_url){
        this.profile_picture_url = profile_picture_url;
    }
    public String getProfile_picture_url(){
        return this.profile_picture_url;
    }
    public void setScholar_profile_url(String scholar_profile_url){
        this.scholar_profile_url = scholar_profile_url;
    }
    public String getScholar_profile_url(){
        return this.scholar_profile_url;
    }
    public void setUniversity(String university){
        this.university = university;
    }
    public String getUniversity(){
        return this.university;
    }
    public void setIsValidated(boolean isValidated){
        this.isValidated = isValidated;
    }
    public boolean getIsValidated(){
        return this.isValidated;
    }
    public void setDepartment(String department){
        this.department = department;
    }
    public String getDepartment(){
        return this.department;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public String getTitle(){
        return this.title;
    }
    public void setBio(String bio){
        this.bio = bio;
    }
    public String getBio(){
        return this.bio;
    }
    public void setCitations(String citations){
        this.citations = citations;
    }
    public String getCitations(){
        return this.citations;
    }
    public void setIIndex(String iIndex){
        this.iIndex = iIndex;
    }
    public String getIIndex(){
        return this.iIndex;
    }
    public void setHIndex(String hIndex){
        this.hIndex = hIndex;
    }
    public String getHIndex(){
        return this.hIndex;
    }
    public void setLast5Year_citations(String last5Year_citations){
        this.last5Year_citations = last5Year_citations;
    }
    public String getLast5Year_citations(){
        return this.last5Year_citations;
    }
    public void setLast5Year_iIndex(String last5Year_iIndex){
        this.last5Year_iIndex = last5Year_iIndex;
    }
    public String getLast5Year_iIndex(){
        return this.last5Year_iIndex;
    }
    public void setLast5Year_hIndex(String last5Year_hIndex){
        this.last5Year_hIndex = last5Year_hIndex;
    }
    public String getLast5Year_hIndex(){
        return this.last5Year_hIndex;
    }
    public void setUser_interests(List<UserInterest> user_interests){
        this.user_interests = user_interests;
    }
    public List<UserInterest> getUser_interests(){
        return this.user_interests;
    }
    public void setUpCounts(int upCounts){
        this.upCounts = upCounts;
    }
    public int getUpCounts(){
        return this.upCounts;
    }
    public void setIsUpped(boolean isUpped){
        this.isUpped = isUpped;
    }
    public boolean getIsUpped(){
        return this.isUpped;
    }
    public void setFollowerCount(int followerCount){
        this.followerCount = followerCount;
    }
    public int getFollowerCount(){
        return this.followerCount;
    }
    public void setFollowingCount(int followingCount){
        this.followingCount = followingCount;
    }
    public int getFollowingCount(){
        return this.followingCount;
    }
    public void setCanFollow(boolean canFollow){
        this.canFollow = canFollow;
    }
    public boolean getCanFollow(){
        return this.canFollow;
    }

    public String getProjects() {
        return projects;
    }
}
