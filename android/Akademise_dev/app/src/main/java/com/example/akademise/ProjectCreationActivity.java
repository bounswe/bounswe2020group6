package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class ProjectCreationActivity extends AppCompatActivity {
    Button next;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_project_creation);

        next = findViewById(R.id.btnPublicationCreation);
        next.setOnClickListener(btnNextClickListener);

        getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation,
                new ProjectInfoEntryFragment()).commit();
    }

    View.OnClickListener btnNextClickListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            if(next.getText().equals(getString(R.string.next))){
                // TODO: get all the information typed

                getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation,
                            new ProjectEntryFragment()).commit();

                next.setText(getString(R.string.done));
            }
            else if(next.getText().equals(getString(R.string.done))){
                finish();
                // TODO: add new element to the recycler view.
            }

        }
    };
}