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
    Button selectDate;
    CalendarView calendar;
    List<Milestone> changedMilestones;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show_project_milestones);
        milestoneTitle = findViewById(R.id.etMilestoneTitle);
        milestoneDescription = findViewById(R.id.etMilestoneDescription);
        milestoneDate = findViewById(R.id.etMilestoneDate);
        //calendar = findViewById(R.id.calendarMilestone);
        addMilestone = findViewById(R.id.btnAddMilestone);
        //selectDate = findViewById(R.id.btnSetDate);
        //calendar.setDate(System.currentTimeMillis(),false,true);
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://ec2-52-91-31-85.compute-1.amazonaws.com:3000/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        loadData();
        akademiseApi = retrofit.create(AkademiseApi.class);
        if(getIntent().hasExtra("project")){
            project = (GetProjects) getIntent().getSerializableExtra("project");
            getWholeData(project.getId());
            milestones = project.getProject_milestones();
            changedMilestones = milestones;
            Log.d("milestone", ""+milestones.size());
        }
        else{
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }

        recyclerView = findViewById(R.id.rv_recyclerViewMilestone);
        RecyclerViewMilestoneAdapter recyclerViewAdapter = new RecyclerViewMilestoneAdapter(EditMilestonesActivity.this, milestones, project);
        recyclerView.setLayoutManager(new LinearLayoutManager(EditMilestonesActivity.this));
        recyclerView.setAdapter(recyclerViewAdapter);

        /*selectDate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calendar.setVisibility(View.VISIBLE);
            }
        });
         */
        addMilestone.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String date = milestoneDate.getText().toString();
                List<String> dateFields =  Arrays.asList(date.split("/"));
                if(dateFields.size()==3){
                    String dateJson = dateFields.get(2) + "-" + dateFields.get(1) + "-" + dateFields.get(0) + "T00:00:00.000Z";
                    Milestone newMilestone = new Milestone(project.getId(),dateJson,milestoneTitle.getText().toString(),milestoneDescription.getText().toString());
                    //changedMilestones.add(newMilestone);
                    Call<Milestone> call = akademiseApi.addMilestone(newMilestone, "Bearer " + myToken);
                    call.enqueue(new Callback<Milestone>() {
                        @Override
                        public void onResponse(Call<Milestone> call, Response<Milestone> response) {

                            if (!response.isSuccessful()) {
                                Log.d("Project", "onResponse: not successful");
                                Log.d("Project", myToken);
                                Log.d("NotCreated", response.toString());
                                Toast.makeText(EditMilestonesActivity.this, "Not updated, try again" + response.code(), Toast.LENGTH_LONG).show();
                                return;
                            }

                            Log.d("Project", "onResponse: successful");
                            Toast.makeText(EditMilestonesActivity.this, "Milestones are updated", Toast.LENGTH_LONG).show();
                            finish();

                        }

                        @Override
                        public void onFailure(Call<Milestone> call, Throwable t) {
                            Toast.makeText(EditMilestonesActivity.this, "Be sure to be connected", Toast.LENGTH_LONG).show();
                            Log.d("Project", "onFailure: failed");
                        }
                    });
                }
                else{

                }
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
                project = projects.get(0);
            }

            @Override
            public void onFailure(Call<List<GetProjects>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });
    }

    private void loadData(){
        SharedPreferences sharedPreferences = getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
}