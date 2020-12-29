package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.os.Bundle;
import android.widget.Toast;

public class ProfileActivity extends AppCompatActivity {
    Profile profile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        if(me()){
            getSupportFragmentManager().beginTransaction().replace(R.id.flProfileFragments,
                    new ProfileFragment()).commit();
        }
        else{
            getData();
            Fragment fragment = new ProfileOthersFragment();
            Bundle args = new Bundle();
            args.putSerializable("user", profile);
            fragment.setArguments(args);
            getSupportFragmentManager().beginTransaction().replace(R.id.flProfileFragments,
                    fragment).commit();
        }

    }

    private void getData(){
        if(getIntent().hasExtra("user")){
            profile = (Profile) getIntent().getSerializableExtra("user");
        }
        else{
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }

    private boolean me(){
        return getIntent().hasExtra("me");

    }


}