package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CalendarView;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

//activity for editing milestones, addition deletion or updates can be done
public class EditMilestonesActivity extends AppCompatActivity {

    AkademiseApi akademiseApi;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    private String myToken;
    GetProjects project;
    RecyclerView recyclerView;
    EditText milestoneTitle;
    EditText milestoneDescription;
    EditText milestoneDate;
    List<Milestone> milestones;
    Button addMilestone;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // initialize the view from the layout
        setContentView(R.layout.activity_show_project_milestones);
        milestoneTitle = findViewById(R.id.etMilestoneTitle);
        milestoneDescription = findViewById(R.id.etMilestoneDescription);
        milestoneDate = findViewById(R.id.etMilestoneDate);
        addMilestone = findViewById(R.id.btnAddMilestone);
        //initialize api
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        akademiseApi = retrofit.create(AkademiseApi.class);
        loadData();
        if(getIntent().hasExtra("project")){
            project = (GetProjects) getIntent().getSerializableExtra("project");
            //get project milestones to view
            getMilestoneData(project.getId());
        }
        else{
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }
        // button for adding new milestone
        addMilestone.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //get date from the edit text
                String date = milestoneDate.getText().toString();
                //extract day, month and year from DD/MM/YYYY format
                List<String> dateFields =  Arrays.asList(date.split("/"));
                //check the date format is correct
                if(dateFields.size()==3){
                    //convert the expected json YYYY-MM-DD and add hour part as 00.00
                    String dateJson = dateFields.get(2) + "-" + dateFields.get(1) + "-" + dateFields.get(0) + "T00:00:00.000Z";
                    //create add milestone object to give it into api call
                    AddMilestone newMilestone = new AddMilestone(project.getId(),dateJson,milestoneTitle.getText().toString(),milestoneDescription.getText().toString());
                    //api call for adding new milestone
                    Call<AddMilestone> call = akademiseApi.addMilestone(newMilestone, "Bearer " + myToken);
                    call.enqueue(new Callback<AddMilestone>() {
                        @Override
                        public void onResponse(Call<AddMilestone> call, Response<AddMilestone> response) {
                            //check the response
                            if (!response.isSuccessful()) {
                                Log.d("Project", "onResponse: not successful");
                                Log.d("Project", myToken);
                                Log.d("NotCreated", response.toString());
                                Toast.makeText(EditMilestonesActivity.this, "Not updated, try again" + response.code(), Toast.LENGTH_LONG).show();
                                return;
                            }

                            Log.d("Project", "onResponse: successful");
                            Toast.makeText(EditMilestonesActivity.this, "Milestones are updated", Toast.LENGTH_LONG).show();
                            //if it is successfull refresh the page
                            finish();
                            startActivity(getIntent());

                        }

                        @Override
                        public void onFailure(Call<AddMilestone> call, Throwable t) {
                            Toast.makeText(EditMilestonesActivity.this, "Be sure to be connected", Toast.LENGTH_LONG).show();
                            Log.d("Project", "onFailure: failed");
                        }
                    });
                }
            }
        });
    }
    //gets current milestone and sets necessary fields for it
    private void getMilestoneData(int id){
        //api call for getting projects fields
        Call<List<GetProjects>> call= akademiseApi.getProjects(id, 1,"Bearer "+myToken);
        call.enqueue(new Callback<List<GetProjects>>() {
            @Override
            public void onResponse(Call<List<GetProjects>> call, Response<List<GetProjects>> response) {

                if(!response.isSuccessful()){
                    Log.d("Project", "onResponse: not successful");
                    return;
                }
                List<GetProjects> projects = response.body();
                Log.d("GetProjectResponse",""+ projects.get(0).getProject_milestones().size());
                //update the project fields
                project =projects.get(0);
                //initialize the recycler view to show project milestones
                recyclerView = findViewById(R.id.rv_recyclerViewMilestone);
                //create adapter for project milestones
                RecyclerViewMilestoneAdapter recyclerViewAdapter = new RecyclerViewMilestoneAdapter(EditMilestonesActivity.this, projects.get(0).getProject_milestones(), project);
                recyclerView.setLayoutManager(new LinearLayoutManager(EditMilestonesActivity.this));
                recyclerView.setAdapter(recyclerViewAdapter);
            }

            @Override
            public void onFailure(Call<List<GetProjects>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });
    }
    //get token of the user from local storage
    private void loadData(){
        SharedPreferences sharedPreferences = getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
}