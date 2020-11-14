package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class PublicationCreationActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_publication_creation);

        Button next = findViewById(R.id.btnPaperCreation);
        next.setOnClickListener(btnNextClickListener);

        getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation,
                new PublicationCommonEntryFragment()).commit();
    }

    View.OnClickListener btnNextClickListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {

        }
    };
}