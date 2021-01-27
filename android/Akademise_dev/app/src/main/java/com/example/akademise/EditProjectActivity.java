package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static java.util.Arrays.asList;

//activity for editing projects title, summary, requirements, status and privacy
public class EditProjectActivity extends AppCompatActivity {
    AkademiseApi akademiseApi;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    private String myToken;
    GetProjects project;
    EditText title;
    EditText summary;
    EditText requirements;
    Button milestone;
    Button tags;
    Button update;
    String privacy;
    boolean pr;
    String status;
    int stat;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //initialization of the layout
        setContentView(R.layout.activity_edit_project);
        milestone = findViewById(R.id.btnEditMilestone);
        tags = findViewById(R.id.btnEditTags);
        update = findViewById(R.id.btnUpdate);
        title = findViewById(R.id.etTitle);
        summary = findViewById(R.id.etAbstractProject);
        requirements=findViewById(R.id.tvRequirementsProject);

        //initialize api
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        akademiseApi = retrofit.create(AkademiseApi.class);
        //get projects data and token of the user
        loadData();
        getData();
        getWholeData(project.getId());

        //button that links to edit milestones activity
        milestone.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openMilestoneActivity();
            }
        });
        //button that links to edit tags activity
        tags.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openTagsActivity();
            }
        });
        //spinner for selecting status
        Spinner status_spinner = findViewById(R.id.sStatus);
        //adapter for holding status fields
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(getBaseContext(),
                R.array.update_status,
                android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        status_spinner.setAdapter(adapter);
        //selecting new status for the project
        status_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if(!parent.getItemAtPosition(position).toString().equals("Choose")) {
                    //status is updated if new status is selected
                    status = parent.getItemAtPosition(position).toString();
                }
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        //spinner for changing privacy
        Spinner privacy_spinner = findViewById(R.id.sPrivacy);
        //adapter for possible privacies
        ArrayAdapter<CharSequence> adapter2 = ArrayAdapter.createFromResource(getBaseContext(),
                R.array.update_privacy,
                android.R.layout.simple_spinner_item);
        adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        privacy_spinner.setAdapter(adapter2);
        //setting privacy for the project
        privacy_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if(!parent.getItemAtPosition(position).toString().equals("Choose")) {
                    //privacy is updated if new privacy is selected
                    privacy = parent.getItemAtPosition(position).toString();
                }
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        //update button to update the project
        update.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updateProject();
            }
        });
    }
    //update project function
    private void updateProject() {
        //get the possible status
        String[] statusArray = getResources().getStringArray(R.array.status_array);
        //set the selected status
        stat = java.util.Arrays.asList(statusArray).indexOf(status);
        //set the selected privacy
        pr= !privacy.equals("Private");
        //update project api call
        UpdateProject updates = new UpdateProject(title.getText().toString(), summary.getText().toString(), requirements.getText().toString(), pr, stat);
        Call<Project> call = akademiseApi.updateProject(project.getId(), updates, "Bearer " + myToken);
        call.enqueue(new Callback<Project>() {
            @Override
            public void onResponse(Call<Project> call, Response<Project> response) {

                if (!response.isSuccessful()) {
                    Log.d("Project", "onResponse: not successful");
                    Log.d("Project", myToken);
                    Log.d("NotCreated", response.toString());
                    Toast.makeText(EditProjectActivity.this, "Not updated, try again", Toast.LENGTH_LONG).show();
                    return;
                }
                Log.d("Project", "onResponse: successful");
                Toast.makeText(EditProjectActivity.this, "Project is updated", Toast.LENGTH_LONG).show();
                //updated project can be seen on project detail page
                finish();

            }

            @Override
            public void onFailure(Call<Project> call, Throwable t) {
                Toast.makeText(EditProjectActivity.this, "Be sure to be connected", Toast.LENGTH_LONG).show();
                Log.d("Project", "onFailure: failed");
            }
        });
    }
    //intent to edit milestones activity
    private void openMilestoneActivity() {
        Intent intent = new Intent(this, EditMilestonesActivity.class);
        intent.putExtra("project", project);
        startActivity(intent);

    }
    //intent to edit tags activity
    public void openTagsActivity() {
        Intent intent = new Intent(this, EditTagsActivity.class);
        intent.putExtra("project", project);
        startActivity(intent);
    }
    //get the data of the current project
    private void getData(){
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
    //get the data of the current project before the update and sets the fields
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
                //sets current title, summary and requirements
                title.setText(project.getTitle());
                summary.setText(project.getSummary());
                requirements.setText(project.getRequirements());
                //sets the current privacy
                pr = project.getPrivacy();
                if( !pr){
                    privacy = "Private";
                }
                else{
                    privacy = "Public";
                }
                //sets the current status
                String[] statusArray = getResources().getStringArray(R.array.status_array);
                stat = project.getStatus();
                status = statusArray[stat];

            }

            @Override
            public void onFailure(Call<List<GetProjects>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });
    }
}


