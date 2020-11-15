package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;

public class PublicationCreationActivity extends AppCompatActivity {
    Button next;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_publication_creation);

        next = findViewById(R.id.btnPublicationCreation);
        next.setOnClickListener(btnNextClickListener);

        getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation,
                new PublicationCommonEntryFragment()).commit();
    }

    View.OnClickListener btnNextClickListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            if(next.getText().equals(getString(R.string.next))){
                CheckBox cbProject = findViewById(R.id.cbIfProject);
                // TODO: get all the information typed
                if(cbProject.isChecked()){
                    getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation,
                            new ProjectEntryFragment()).commit();


                }
                else{
                    getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation,
                            new PaperEntryFragment()).commit();
                }
                next.setText(getString(R.string.done));
            }
            else if(next.getText().equals(getString(R.string.done))){
                finish();
                // TODO: add new element to the recycler view.
            }

        }
    };
}