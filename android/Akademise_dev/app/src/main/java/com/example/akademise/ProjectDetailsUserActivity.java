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

//todo: bu benim projem değili nasıl check etmeli ?
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
    TextView tags;
    RecyclerView recyclerViewTag;
    RecyclerView recyclerViewMilestone;
    Button files;
    Button req_button;

    TextView userNameSurname;
    TextView collaborators;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_project_details_u);

        files = findViewById(R.id.btnUserProjectFiles);
        title = findViewById(R.id.user_project_title);
        summary = findViewById(R.id.tvAbstractUserProject);
        status=findViewById(R.id.tvStatusUserProject);
        //milestones=findViewById(R.id.tvMilestoneProject);
        requirements=findViewById(R.id.tvRequirementsUserProject);
        userNameSurname=findViewById(R.id.tvUserNameSurname);
        userNameSurname.setClickable(true);
        collaborators=findViewById(R.id.tvUserCollaborators);
        req_button = findViewById(R.id.btnReqUserProject);
        recyclerViewTag = findViewById(R.id.rv_recyclerViewUserProjectTags);
        recyclerViewMilestone = findViewById(R.id.rv_recyclerViewUserProjectMilestone);
        summary.setMovementMethod(new ScrollingMovementMethod());
        requirements.setMovementMethod(new ScrollingMovementMethod());
        files.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openShowProjectFilesActivity();
            }
        });

        req_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(req_button.getText().toString().equalsIgnoreCase("Request Collaboration")){
                    request();
                }
                else if(req_button.getText().toString().equalsIgnoreCase("Leave Project")){
                    leaveProject();
                }
            }});


        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        loadData();
        getData();
        loadIDData();


        getWholeData(project.getId());
        userNameSurname.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Call<Profile> call = akademiseApi.getMyProfile(project.getUserId(), "Bearer " + myToken);
                call.enqueue(new Callback<Profile>() {
                    @Override
                    public void onResponse(Call<Profile> call, Response<Profile> response) {
                        if(!response.isSuccessful()){
                            Log.d("GetProfile", "onResponse: not successful" + response.message());
                            return;
                        }
                        profile = response.body();
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
                finish();
                startActivity(getIntent());
            }

            @Override
            public void onFailure(Call<Project> call, Throwable t) {
                Log.d("LeaveProject", "onResponse: failed" + t.toString());

            }
        });
    }


    private void loadIDData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);
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

    private void request() {
        List<Integer> i = new ArrayList<Integer>() {{
            add(myId);
            add(project.getUserId());
            add(project.getId());
            add(1);
        }};
        Invitation invitation = new Invitation(i);

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
                GetProjects project = projects.get(0);
                String nameSurname = project.getUser().getName()+" "+project.getUser().getSurname();
                userNameSurname.setText(nameSurname);
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
                RecyclerViewDetailsAdapter recyclerViewAdapter = new RecyclerViewDetailsAdapter(ProjectDetailsUserActivity.this, str_tags);
                recyclerViewTag.setLayoutManager(new LinearLayoutManager(ProjectDetailsUserActivity.this));
                recyclerViewTag.setAdapter(recyclerViewAdapter);

                String collaboratorList="";
                List<ProjectCollaborators> collabs = project.getProject_collaborators();
                for(int i=0; i<project.getProject_collaborators().size(); i++){
                    collaboratorList+= project.getProject_collaborators().get(i).getUser().getName()+" "+
                            project.getProject_collaborators().get(i).getUser().getSurname()+", ";
                }

                List<Milestone> milestones = project.getProject_milestones();
                List<String> str_milestones = new ArrayList<String>();
                for(Milestone milestone: milestones){
                    str_milestones.add(milestone.getTitle());
                }
                RecyclerViewDetailsAdapter recyclerViewAdapter2 = new RecyclerViewDetailsAdapter(ProjectDetailsUserActivity.this, str_milestones);
                recyclerViewMilestone.setLayoutManager(new LinearLayoutManager(ProjectDetailsUserActivity.this));
                recyclerViewMilestone.setAdapter(recyclerViewAdapter2);
                collaborators.setText(collaboratorList);
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

    private void loadData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());
    }


    private void getData() {
        String test = getIntent().getClass().toString();
        //Toast.makeText(this, test, Toast.LENGTH_LONG).show();

        if(getIntent().hasExtra("project")){
            project = (GetProjects) getIntent().getSerializableExtra("project");
        }
        else{
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }


}

