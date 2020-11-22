package com.example.akademise;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class SignupActivity extends AppCompatActivity {
    private Button btn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_signup);

        btn = (Button) findViewById(R.id.btnNext);

        getSupportFragmentManager().beginTransaction().replace(R.id.suFragment,
                new SignupFragment()).commit();

        btn.setOnClickListener(next);

    }

    View.OnClickListener next = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Fragment selectedFragment = null;
            Boolean gotologin = false;

            if(btn.getText().equals(getString(R.string.signup))){
                btn.setText(getString(R.string.validate));
                selectedFragment = new ValidationFragment();
            }
            else if(btn.getText().equals(getString(R.string.validate))){
                btn.setText(getString(R.string.next));
                selectedFragment = new PersonalInfoFragment();
            }
            else if(btn.getText().equals(getString(R.string.next))){
                btn.setText(getString(R.string.done));
                selectedFragment = new ResearchTagFragment();
            }
            else{
                gotologin=true;
            }
            if(gotologin){
                goToLogin();
            }
            else{
                getSupportFragmentManager().beginTransaction().replace(R.id.suFragment,
                        selectedFragment).commit();
            }
        }
    };

    private void goToLogin() {
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }


}