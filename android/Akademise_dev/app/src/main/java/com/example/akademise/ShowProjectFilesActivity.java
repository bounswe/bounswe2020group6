package com.example.akademise;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//activity that views projects files
public class ShowProjectFilesActivity extends AppCompatActivity {
    String files;
    int projectId;
    RecyclerView recyclerView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //initialize the layout
        setContentView(R.layout.activity_show_project_files);
        Intent in= getIntent();
        Bundle b = in.getExtras();
        projectId = b.getInt("project_id");
        //get project files from the intent and exracts it as list
        files = getIntent().getExtras().getString("project_files");
        List<String> allfiles = Arrays.asList(files.split("<,>"));
        if(files.equals("")){
            allfiles = new ArrayList<String>();
        }
        //initialize the recycler view for the files
        recyclerView = findViewById(R.id.rv_recyclerView3);
        RecyclerViewFileAdapter recyclerViewAdapter = new RecyclerViewFileAdapter(ShowProjectFilesActivity.this, allfiles);
        recyclerView.setLayoutManager(new LinearLayoutManager(ShowProjectFilesActivity.this));
        recyclerView.setAdapter(recyclerViewAdapter);
    }
}