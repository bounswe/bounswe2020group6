package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Parcelable;
import android.text.method.ScrollingMovementMethod;
import android.view.View;
import android.widget.Button;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;

import android.widget.TextView;
import android.widget.Toast;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

//show details of a project from owner perspective
public class ProjectDetailsActivity extends AppCompatActivity {
    AkademiseApi akademiseApi;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    private String myToken;

    GetProjects project;
    TextView title;
    TextView summary;
    TextView status;
    TextView requirements;
    RecyclerView recyclerViewTag;
    RecyclerView recyclerViewMilestone;
    Button files;
    Button invite;
    Button edit;
    Button delete;

    TextView privacy;
    TextView collaborators;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //initialize the view from the layout
        setContentView(R.layout.activity_project_details);
        title = findViewById(R.id.title);
        edit = findViewById(R.id.btnEditProject);
        delete = findViewById(R.id.btnDeleteProject);
        invite = findViewById(R.id.btnReqInvProject);
        files = findViewById(R.id.btnFilesProject);
        summary = findViewById(R.id.tvAbstractProject);
        status=findViewById(R.id.tvStatusProject);
        requirements=findViewById(R.id.tvRequirementsProject);
        privacy=findViewById(R.id.tvPrivacyProjectDetails);
        collaborators = findViewById(R.id.tvCollaborators);
        recyclerViewTag = findViewById(R.id.rv_recyclerViewProjectTags);
        recyclerViewMilestone = findViewById(R.id.rv_recyclerViewProjectMilestone);
        summary.setMovementMethod(new ScrollingMovementMethod());
        requirements.setMovementMethod(new ScrollingMovementMethod());
        //initialize the api
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        //get the necessary data for the project
        loadData();
        getData();
        getWholeData(project.getId());
        Log.d("Milestone" , "Number of milestones: "+project.getProject_milestones().size());
        //button that redirects to project files
        files.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openShowProjectFilesActivity();
            }
        });
        //button that redirects to invitations for the project page
        invite.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openInvitationActivity();
            }
        });
        //button that redirects to edit project activity
        edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //intent with the project information
                Intent intent = new Intent(ProjectDetailsActivity.this,EditProjectActivity.class);
                intent.putExtra("project", project);
                startActivity(intent);
            }
        }
        );
        //button to delete project
        delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                deleteProject(project.getId());
            }
        }
        );

    }
    //refresh contents of the project when activity resumed
    @Override
    public void onResume(){
        super.onResume();
        getWholeData(project.getId());

    }
    //function to delete project
    private void deleteProject(int id) {
        //api call to delete a project
        Call<Project> call= akademiseApi.deleteProject(id,"Bearer "+myToken);
        call.enqueue(new Callback<Project>() {
            @Override
            public void onResponse(Call<Project> call, Response<Project> response) {

                if(!response.isSuccessful()){
                    Log.d("Project", "onResponse: not successful");
                    return;
                }
                //finish activity since the project is not present anymore
                finish();
                Log.d("Project", "onResponse: project deleted successfully");

            }

            @Override
            public void onFailure(Call<Project> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });
    }

    //function to direct user to show project files activity
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
    //function that opens invitations page for the project
    public void openInvitationActivity() {
        Intent intent = new Intent(this, RequestInvitationActivity.class);
        //put project id additionally
        intent.putExtra("project_id", project.getId());
        startActivity(intent);
    }
    //get project form the intent
    private void getData(){
        String test= getIntent().getClass().toString();
        //Toast.makeText(this, test, Toast.LENGTH_LONG).show();
        if(getIntent().hasExtra("project")){
            project = (GetProjects) getIntent().getSerializableExtra("project");
        }
        else{

            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }
    //get token of the user from local storage
    private void loadData(){
        SharedPreferences sharedPreferences = getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
    //get whole data of the project and set fields of the layout
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
                project = projects.get(0);
                //set title, summary and requirements
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
                RecyclerViewDetailsAdapter recyclerViewAdapter = new RecyclerViewDetailsAdapter(ProjectDetailsActivity.this, str_tags);
                recyclerViewTag.setLayoutManager(new LinearLayoutManager(ProjectDetailsActivity.this));
                recyclerViewTag.setAdapter(recyclerViewAdapter);

                //get milestones of the project
                List<Milestone> milestones = project.getProject_milestones();
                List<String> str_milestones = new ArrayList<String>();
                for(Milestone milestone: milestones){
                    str_milestones.add(milestone.getTitle());
                }
                //set items of the recyclerview for milestones
                RecyclerViewDetailsAdapter recyclerViewAdapter2 = new RecyclerViewDetailsAdapter(ProjectDetailsActivity.this, str_milestones);
                recyclerViewMilestone.setLayoutManager(new LinearLayoutManager(ProjectDetailsActivity.this));
                recyclerViewMilestone.setAdapter(recyclerViewAdapter2);

                if(!project.getPrivacy()) privacy.setText("Private");
                else privacy.setText("Public");
                //set collaborators of the project
                String collaboratorList="";
                for(int i=0; i<project.getProject_collaborators().size(); i++){
                    collaboratorList+= project.getProject_collaborators().get(i).getUser().getName()+" "+
                            project.getProject_collaborators().get(i).getUser().getSurname()+", ";
                }
                collaborators.setText(collaboratorList);

            }

            @Override
            public void onFailure(Call<List<GetProjects>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });
    }
}


