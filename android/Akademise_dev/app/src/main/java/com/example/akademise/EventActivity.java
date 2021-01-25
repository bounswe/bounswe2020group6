package com.example.akademise;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class EventActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event);
        getSupportFragmentManager().beginTransaction().replace(R.id.flEventFragments,
                new EventFragment()).commit();
    }

}
