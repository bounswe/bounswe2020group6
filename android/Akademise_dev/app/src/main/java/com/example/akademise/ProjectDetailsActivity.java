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
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        loadData();
        akademiseApi = retrofit.create(AkademiseApi.class);

        getData();

        getWholeData(project.getId());
        Log.d("milestones" , ""+project.getProject_milestones().size());
        files.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openShowProjectFilesActivity();
            }
        });
        invite.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openInvitationActivity();
            }
        });

        edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ProjectDetailsActivity.this,EditProjectActivity.class);
                intent.putExtra("project", project);
                startActivity(intent);
            }
        }
        );
        delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                deleteProject(project.getId());
            }
        }
        );

    }

    @Override
    public void onResume(){
        super.onResume();
        getWholeData(project.getId());

    }

    private void deleteProject(int id) {
        Call<Project> call= akademiseApi.deleteProject(id,"Bearer "+myToken);
        call.enqueue(new Callback<Project>() {
            @Override
            public void onResponse(Call<Project> call, Response<Project> response) {

                if(!response.isSuccessful()){
                    Log.d("Project", "onResponse: not successful");
                    return;
                }
                finish();
                Log.d("Project", "onResponse: project deleted successfully");

            }

            @Override
            public void onFailure(Call<Project> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });
    }


    private void openShowProjectFilesActivity() {
        Intent intent = new Intent(this, ShowProjectFilesActivity.class);
        intent.putExtra("project_id", project.getId());
        List<ProjectFiles> files = project.getProject_files();
        String allfiles="";
        if(files!=null && files.size()!=0) {
            for (int i = 0; i < files.size() - 1; i++) {
                allfiles += files.get(i).getFile_name() + "<,>";
            }
            if (files.size() != 0) {
                allfiles += files.get(files.size() - 1).getFile_name();
            }
        }
        intent.putExtra("project_files", allfiles);
        startActivity(intent);
    }

    public void openInvitationActivity() {
        Intent intent = new Intent(this, RequestInvitationActivity.class);
        intent.putExtra("project_id", project.getId());
        startActivity(intent);
    }


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

    private void loadData(){
        SharedPreferences sharedPreferences = getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    private void getWholeData(int id){
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
                title.setText(project.getTitle());
                summary.setText(project.getSummary());
                String[] statusArray = getResources().getStringArray(R.array.status_array);
                status.setText(statusArray[(project.getStatus()%5)]);
                int[] stat_colors = getResources().getIntArray(R.array.status_colors);
                status.setTextColor(stat_colors[project.getStatus()%5]);

                requirements.setText(project.getRequirements());
                List<Tag> tags = project.getProject_tags();
                List<String> str_tags = new ArrayList<String>();
                for(Tag tag : tags){
                    str_tags.add(tag.getTag());
                }
                RecyclerViewDetailsAdapter recyclerViewAdapter = new RecyclerViewDetailsAdapter(ProjectDetailsActivity.this, str_tags);
                recyclerViewTag.setLayoutManager(new LinearLayoutManager(ProjectDetailsActivity.this));
                recyclerViewTag.setAdapter(recyclerViewAdapter);

                List<Milestone> milestones = project.getProject_milestones();
                List<String> str_milestones = new ArrayList<String>();
                for(Milestone milestone: milestones){
                    str_milestones.add(milestone.getTitle());
                }
                RecyclerViewDetailsAdapter recyclerViewAdapter2 = new RecyclerViewDetailsAdapter(ProjectDetailsActivity.this, str_milestones);
                recyclerViewMilestone.setLayoutManager(new LinearLayoutManager(ProjectDetailsActivity.this));
                recyclerViewMilestone.setAdapter(recyclerViewAdapter2);

                if(!project.getPrivacy()) privacy.setText("Private");
                else privacy.setText("Public");
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


