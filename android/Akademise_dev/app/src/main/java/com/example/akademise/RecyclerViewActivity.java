package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import java.util.ArrayList;
import java.util.List;

public class RecyclerViewActivity extends AppCompatActivity {

    List<Project> projects;
    RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recycler_view);
        projects = new ArrayList<>();
        projects.add(new Project(0, 0, "Project 1", "Abstract 1",
                "Content 1", null, null,
                "23/12/2025", "c++, matlab",null));
        projects.add(new Project(0, 0, "Project 2", "Abstract 2",
                "Content 2", null, null,
                "23/12/2025", "c++, matlab",null));
        projects.add(new Project(0, 0, "Project 3", "Abstract 3",
                "Content 3", null, null,
                "23/12/2025", "c++, matlab",null));
        projects.add(new Project(0, 0, "Project 3", "Abstract 3",
                "Content 3", null, null,
                "23/12/2025", "c++, matlab",null));
        projects.add(new Project(0, 0, "Project 3", "Abstract 3",
                "Content 3", null, null,
                "23/12/2025", "c++, matlab",null));
        projects.add(new Project(0, 0, "Project 3", "Abstract 3",
                "Content 3", null, null,
                "23/12/2025", "c++, matlab",null));
        projects.add(new Project(0, 0, "Project 3", "Abstract 3",
                "Content 3", null, null,
                "23/12/2025", "c++, matlab",null));

        recyclerView = findViewById(R.id.rv_recyclerView);
        RecyclerViewAdapter recyclerViewAdapter = new RecyclerViewAdapter(this, projects);
        recyclerView.setAdapter(recyclerViewAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));


    }
}