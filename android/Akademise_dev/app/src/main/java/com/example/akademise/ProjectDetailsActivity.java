package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

public class ProjectDetailsActivity extends AppCompatActivity {

    Project project;
    TextView title;
    TextView _abstract;
    TextView status;
    TextView milestones;
    TextView requirements;
    TextView tags;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_project_details);
        title = findViewById(R.id.tvTitleProject);
        _abstract = findViewById(R.id.tvAbstractProject);
        status=findViewById(R.id.tvAbstractProject);
        milestones=findViewById(R.id.tvMilestoneProject);
        requirements=findViewById(R.id.tvRequirementsProject);
        tags=findViewById(R.id.tvTagsProject);

        getData();
        title.setText(project.getTitle());
        _abstract.setText(project.getAbstract1());
        //status.setText(project.getStatus());
        milestones.setText(project.getDeadline());
        requirements.setText(project.getRequirements());


    }

    private void getData(){
       String test= getIntent().getClass().toString();
       //Toast.makeText(this, test, Toast.LENGTH_LONG).show();
        if(getIntent().hasExtra("project")){
            project = (Project) getIntent().getSerializableExtra("project");
        }
        else{
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }
}