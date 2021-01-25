package com.example.akademise;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

public class UpdateEventActivity extends AppCompatActivity {
    int eventId;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_event);

        eventId = getIntent().getIntExtra("eventId",eventId);
        System.out.println(eventId);

        Fragment fragment = new UpdateEventFragment();
        Bundle args = new Bundle();
        args.putInt("eventId", eventId);
        fragment.setArguments(args);
        getSupportFragmentManager().beginTransaction().replace(R.id.flUpdateEventFragments,
                fragment).commit();

    }
}
