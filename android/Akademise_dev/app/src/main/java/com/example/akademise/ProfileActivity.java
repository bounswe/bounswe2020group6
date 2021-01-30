package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.os.Bundle;
import android.widget.Toast;

public class ProfileActivity extends AppCompatActivity {
    /*
    This activity opens ProfileFragment or ProfileOthersFragment according to the intent extra.
     */
    Profile profile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        //if it is my profile open ProfileFragment
        if(me()){
            getSupportFragmentManager().beginTransaction().replace(R.id.flProfileFragments,
                    new ProfileFragment()).commit();
        }
        //if it is someone lese's profile open ProfileOthersFragment
        else{
            //get profile info of user
            getData();
            Fragment fragment = new ProfileOthersFragment();
            Bundle args = new Bundle();
            //send profile info to ProfileOthersFragment
            args.putSerializable("user", profile);
            fragment.setArguments(args);
            getSupportFragmentManager().beginTransaction().replace(R.id.flProfileFragments,
                    fragment).commit();
        }

    }
    //get profile of user
    private void getData(){
        if(getIntent().hasExtra("user")){
            profile = (Profile) getIntent().getSerializableExtra("user");
        }
        else{
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }
    //check if it is logged in user
    private boolean me(){
        return getIntent().hasExtra("me");

    }


}