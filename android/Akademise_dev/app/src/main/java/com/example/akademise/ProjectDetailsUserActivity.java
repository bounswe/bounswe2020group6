package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

//show details of a project from not owner perspective
public class ProjectDetailsUserActivity extends AppCompatActivity {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    GetProjects project;
    Profile profile;

    TextView title;
    TextView summary;
    TextView status;
    TextView requirements;
    RecyclerView recyclerViewTag;
    RecyclerView recyclerViewMilestone;
    Button files;
    Button req_button;

    TextView userNameSurname;
    TextView collaborators;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //initialize the view from the layout
        setContentView(R.layout.activity_project_details_u);
        files = findViewById(R.id.btnUserProjectFiles);
        title = findViewById(R.id.user_project_title);
        summary = findViewById(R.id.tvAbstractUserProject);
        status=findViewById(R.id.tvStatusUserProject);
        requirements=findViewById(R.id.tvRequirementsUserProject);
        userNameSurname=findViewById(R.id.tvUserNameSurname);
        userNameSurname.setClickable(true);
        collaborators=findViewById(R.id.tvUserCollaborators);
        req_button = findViewById(R.id.btnReqUserProject);
        recyclerViewTag = findViewById(R.id.rv_recyclerViewUserProjectTags);
        recyclerViewMilestone = findViewById(R.id.rv_recyclerViewUserProjectMilestone);
        summary.setMovementMethod(new ScrollingMovementMethod());
        requirements.setMovementMethod(new ScrollingMovementMethod());
        //button that redirects to project files
        files.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openShowProjectFilesActivity();
            }
        });
        //button for requesting collaboration or leaving the project
        req_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(req_button.getText().toString().equalsIgnoreCase("Request Collaboration")){
                    //request to collaborate
                    request();
                }
                else if(req_button.getText().toString().equalsIgnoreCase("Leave Project")){
                    //leaving the project
                    leaveProject();
                }
            }});

        //initialize the api
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        akademiseApi = retrofit.create(AkademiseApi.class);
        //load necessary data for the project
        loadData();
        getData();
        loadIDData();
        getWholeData(project.getId());
        //when user's name and surname is clicked user directed to the profile of the project's owner
        userNameSurname.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //call for getting profile information of the project owner
                Call<Profile> call = akademiseApi.getMyProfile(project.getUserId(), "Bearer " + myToken);
                call.enqueue(new Callback<Profile>() {
                    @Override
                    public void onResponse(Call<Profile> call, Response<Profile> response) {
                        if(!response.isSuccessful()){
                            Log.d("GetProfile", "onResponse: not successful" + response.message());
                            return;
                        }
                        profile = response.body();
                        //intent for profile activity with profile information in it
                        Intent intent = new Intent(ProjectDetailsUserActivity.this, ProfileActivity.class);
                        intent.putExtra("user", profile);
                        startActivity(intent);
                        Log.d("GetProfile", "onResponse: successful" + response.message());
                    }

                    @Override
                    public void onFailure(Call<Profile> call, Throwable t) {
                        Log.d("GetProfile", "onResponse: failed" + t.toString());
                    }
                });
            }
        });
    }
    //function to leave project to end collaboration
    private void leaveProject() {
        Call<Project> call = akademiseApi.leaveProject(project.getId(),myId,"Bearer " + myToken);
        call.enqueue(new Callback<Project>() {
            @Override
            public void onResponse(Call<Project> call, Response<Project> response) {
                if(!response.isSuccessful()){
                    Log.d("LeaveProject", "onResponse: not successful" + response.message());
                    return;
                }
                Log.d("GetProfile", "onResponse: successful" + response.message());
                Toast.makeText(getApplicationContext(), "Leaved project successfully.", Toast.LENGTH_LONG).show();
                //refresh page to see leaving project is done successfully
                finish();
                startActivity(getIntent());
            }

            @Override
            public void onFailure(Call<Project> call, Throwable t) {
                Log.d("LeaveProject", "onResponse: failed" + t.toString());

            }
        });
    }

    //get id of the user
    private void loadIDData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);
    }
    //direct to show project files activity
    private void openShowProjectFilesActivity() {
        Intent intent = new Intent(this, ShowProjectFilesActivity.class);
        intent.putExtra("project_id", project.getId());
        //get project files
        List<ProjectFiles> files = project.getProject_files();
        //convert project files' names string with separating '<,>' string to use at show project files activity
        String allfiles="";
        if(files!=null && files.size()!=0) {
            for (int i = 0; i < files.size() - 1; i++) {
                allfiles += files.get(i).getFile_name() + "<,>";
            }
            if (files.size() != 0) {
                allfiles += files.get(files.size() - 1).getFile_name();
            }
        }
        //put project files additionally
        intent.putExtra("project_files", allfiles);
        startActivity(intent);
    }
    //function for requesting to collaborate to project
    private void request() {
        //initialize request
        List<Integer> i = new ArrayList<Integer>() {{
            add(myId);
            add(project.getUserId());
            add(project.getId());
            add(1);
        }};
        Invitation invitation = new Invitation(i);
        //api call for collaboration request
        Call<Invitation>call = akademiseApi.addInvitation(invitation, "Bearer " + myToken);
        call.enqueue(new Callback<Invitation >() {
            @Override
            public void onResponse(Call<Invitation> call, Response<Invitation> response) {
                if (!response.isSuccessful()) {
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getApplicationContext(), "Couldnt send request. ", Toast.LENGTH_LONG).show();
                    return;
                }
                Invitation  invResponse = response.body();
                //toast to show request is successfull
                Toast.makeText(getApplicationContext(), "Successful. ", Toast.LENGTH_LONG).show();

            }

            @Override
            public void onFailure(Call<Invitation > call, Throwable t) {
                Toast.makeText(getApplicationContext(), "Be sure to be connected. ", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });

    }
    //get whole data of the project set fields of the layout
    private void getWholeData(int id){
        //api call for getting all fields of the project
        Call<List<GetProjects>> call= akademiseApi.getProjects(id, 1,"Bearer "+myToken);
        call.enqueue(new Callback<List<GetProjects>>() {
            @Override
            public void onResponse(Call<List<GetProjects>> call, Response<List<GetProjects>> response) {

                if(!response.isSuccessful()){
                    Log.d("Project", "onResponse: not successful");
                    return;
                }

                List<GetProjects> projects = response.body();
                GetProjects project = projects.get(0);
                String nameSurname = project.getUser().getName()+" "+project.getUser().getSurname();
                //set name, surname, title, summary and requirements
                userNameSurname.setText(nameSurname);
                title.setText(project.getTitle());
                summary.setText(project.getSummary());
                requirements.setText(project.getRequirements());
                //set the current status
                String[] statusArray = getResources().getStringArray(R.array.status_array);
                status.setText(statusArray[(project.getStatus()%5)]);
                //set color of the text like frontend
                int[] stat_colors = getResources().getIntArray(R.array.status_colors);
                status.setTextColor(stat_colors[project.getStatus()%5]);
                //get tags of the project
                List<Tag> tags = project.getProject_tags();
                List<String> str_tags = new ArrayList<String>();
                for(Tag tag : tags){
                    str_tags.add(tag.getTag());
                }
                //set items of the recyclerview for tags
                RecyclerViewDetailsAdapter recyclerViewAdapter = new RecyclerViewDetailsAdapter(ProjectDetailsUserActivity.this, str_tags);
                recyclerViewTag.setLayoutManager(new LinearLayoutManager(ProjectDetailsUserActivity.this));
                recyclerViewTag.setAdapter(recyclerViewAdapter);

                //get milestones of the project
                List<Milestone> milestones = project.getProject_milestones();
                List<String> str_milestones = new ArrayList<String>();
                for(Milestone milestone: milestones){
                    str_milestones.add(milestone.getTitle());
                }
                //set items of the recyclerview for milestones
                RecyclerViewDetailsAdapter recyclerViewAdapter2 = new RecyclerViewDetailsAdapter(ProjectDetailsUserActivity.this, str_milestones);
                recyclerViewMilestone.setLayoutManager(new LinearLayoutManager(ProjectDetailsUserActivity.this));
                recyclerViewMilestone.setAdapter(recyclerViewAdapter2);

                //set collaborators of the project
                String collaboratorList="";
                List<ProjectCollaborators> collabs = project.getProject_collaborators();
                for(int i=0; i<project.getProject_collaborators().size(); i++){
                    collaboratorList+= project.getProject_collaborators().get(i).getUser().getName()+" "+
                            project.getProject_collaborators().get(i).getUser().getSurname()+", ";
                }
                collaborators.setText(collaboratorList);

                //checks the user is already collaborating or not
                //if already collaborating, request collaboration is changed into leave project
                for(ProjectCollaborators collab : collabs){
                    if(collab.getUser_id()==myId){
                        req_button.setText("Leave Project");
                        break;
                    }
                }
            }

            @Override
            public void onFailure(Call<List<GetProjects>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });
    }
    //get token of the user from local storage
    private void loadData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());
    }

    //get project from the intent
    private void getData() {

        if(getIntent().hasExtra("project")){
            project = (GetProjects) getIntent().getSerializableExtra("project");
        }
        else{
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }


}

