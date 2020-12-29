package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import androidx.appcompat.app.AppCompatActivity;
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
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    GetProjects project;


    TextView title;
    TextView summary;
    TextView status;
    TextView milestones;
    TextView requirements;
    TextView tags;

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
        tags=findViewById(R.id.tvTagsUserProject);
        userNameSurname=findViewById(R.id.tvUserNameSurname);
        collaborators=findViewById(R.id.tvUserCollaborators);
        req_button = findViewById(R.id.btnReqUserProject);

        files.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openShowProjectFilesActivity();
            }
        });

        req_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                request();
            }});


        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        loadData();
        getData();
        loadIDData();


        getWholeData(project.getId());

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
                    Toast.makeText(getApplicationContext(), "WCouldnt send request. ", Toast.LENGTH_LONG).show();
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
                userNameSurname.setText(project.getUser().getName()+" "+project.getUser().getSurname());
                title.setText(project.getTitle());
                summary.setText(project.getSummary());
                String[] statusArray = getResources().getStringArray(R.array.status_array);
                status.setText(statusArray[(project.getStatus()%5)]);
                requirements.setText(project.getRequirements());
                String tagList="";
                for(int i=0; i<project.getProject_tags().size(); i++){
                    tagList+= project.getProject_tags().get(i).getTag()+" ";
                }
                tags.setText(tagList);

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

