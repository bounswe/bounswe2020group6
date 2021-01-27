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

public class EditTagsActivity extends AppCompatActivity {
    AkademiseApi akademiseApi;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    private String myToken;
    GetProjects project;
    RecyclerView recyclerView;
    RecyclerView recyclerTagView;
    TextView tvChosenTags;
    EditText manuelNewTag;
    List<Tag> tags;
    List<String> str_tags = new ArrayList<String>();
    Button addTag;
    List<String> newTags = new ArrayList<String>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show_project_tags);
        tvChosenTags = findViewById(R.id.tvTags);
        addTag = findViewById(R.id.btnAddTag);
        manuelNewTag = findViewById(R.id.etNewTag);
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        loadData();
        akademiseApi = retrofit.create(AkademiseApi.class);
        if(getIntent().hasExtra("project")){
            project = (GetProjects) getIntent().getSerializableExtra("project");
            tags = project.getProject_tags();
            for( int i = 0; i<tags.size(); i++){
                str_tags.add(tags.get(i).getTag());
            }
            getWholeData(project.getId());
        }
        else{
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }



        Call<Result> call = akademiseApi.getTags("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if(!response.isSuccessful()){
                    Log.d("GetTags", "onResponse: " + response.code());
                    return;
                }
                Log.d("GetTags-success", "On response: " + response.message());
                Result result = response.body();
                Log.d("GetTags-success","GOR BUNU-------------------------");
                Log.d("GetTags-success",result.getResult().toString());
                Spinner tag_spinner = (Spinner) findViewById(R.id.sTag);
                List<String> tagList = result.getResult();
                tagList.add(0, "Choose Tag");
                ArrayAdapter<String> tag_adapter = new ArrayAdapter<String> (getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item,tagList);

                tag_adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                tag_spinner.setAdapter(tag_adapter);
                tag_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        if (position != 0) {
                            String currentText = tvChosenTags.getText().toString();
                            String tag = parent.getItemAtPosition(position).toString();
                            Log.d("Selected", "" + str_tags.toString());
                            if (!currentText.contains(tag) && !str_tags.contains(tag)) {
                                if(currentText.endsWith(":")) {
                                    currentText += " " + tag;
                                }
                                else{
                                    currentText += ", "+ tag;
                                }
                                newTags.add(tag);
                                tvChosenTags.setText(currentText);
                            }

                        }
                    }
                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });
            }
            @Override
            public void onFailure(Call<Result> call, Throwable t) {

                Log.d("Get", "onFailure: " + t.getMessage());

            }
        });

        addTag.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String thetags = manuelNewTag.getText().toString();
                List<String> newWrittenTags= Arrays.asList(thetags.split(","));
                for( int i = 0; i< newWrittenTags.size(); i++) {
                    if(!newWrittenTags.get(i).equals("")) {
                        Call<Tag> call = akademiseApi.addTag(new Tag(newWrittenTags.get(i)), "Bearer " + myToken);
                        call.enqueue(new Callback<Tag>() {
                            @Override
                            public void onResponse(Call<Tag> call, Response<Tag> response) {

                            }

                            @Override
                            public void onFailure(Call<Tag> call, Throwable t) {

                            }
                        });
                        newTags.add(newWrittenTags.get(i));
                    }
                }
                AddTag addedNewTags = new AddTag(newTags,project.getId());
                Call<AddTag> call = akademiseApi.addTags(addedNewTags,"Bearer " + myToken);
                call.enqueue(new Callback<AddTag>() {
                    @Override
                    public void onResponse(Call<AddTag> call, Response<AddTag> response) {
                        if(!response.isSuccessful()){
                            Log.d("GetTags", "onResponse: " + response.code());
                            return;
                        }
                        Toast.makeText(EditTagsActivity.this, "Tags added successfully", Toast.LENGTH_LONG).show();
                        finish();
                        startActivity(getIntent());

                    }
                    @Override
                    public void onFailure(Call<AddTag> call, Throwable t) {

                        Log.d("Get", "onFailure: " + t.getMessage());

                    }
                });
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
                tags = project.getProject_tags();
                recyclerView = findViewById(R.id.rv_recyclerView4);
                RecyclerViewTagAdapter recyclerViewAdapter = new RecyclerViewTagAdapter(EditTagsActivity.this, tags, project);
                recyclerView.setLayoutManager(new LinearLayoutManager(EditTagsActivity.this));
                recyclerView.setAdapter(recyclerViewAdapter);
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