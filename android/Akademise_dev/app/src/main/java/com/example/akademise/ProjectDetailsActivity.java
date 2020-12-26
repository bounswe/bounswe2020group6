package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
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
    Button invite;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_project_details);
        title = findViewById(R.id.title);
        _abstract = findViewById(R.id.tvAbstractProject);
        status = findViewById(R.id.tvStatusProject);
        milestones = findViewById(R.id.tvMilestoneProject);
        requirements = findViewById(R.id.tvRequirementsProject);
        tags = findViewById(R.id.tvTagsProject);
        invite = findViewById(R.id.btnInvite);

        getData();
        title.setText(project.getTitle());
        _abstract.setText(project.getAbstract1());
        //status.setText(project.getStatus());
        milestones.setText(project.getDeadline());
        requirements.setText(project.getRequirements());

        invite.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Bundle bundle = new Bundle();
                bundle.putInt("project_id", project.getId());
                RequestInvitationFragment frg = new RequestInvitationFragment();
                frg.setArguments(bundle);
                getSupportFragmentManager().beginTransaction().replace(R.id.req_and_invitations,
                        frg).commit();
            }
        });


    }

    public void openInvitationActivity() {
        Intent intent = new Intent(this, RequestInvitationFragment.class);
        intent.putExtra("project_id", project.getId());
        startActivity(intent);
    }

    private void getData() {
        String test = getIntent().getClass().toString();
        //Toast.makeText(this, test, Toast.LENGTH_LONG).show();
        if (getIntent().hasExtra("project")) {
            project = (Project) getIntent().getSerializableExtra("project");
        } else {
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }
}