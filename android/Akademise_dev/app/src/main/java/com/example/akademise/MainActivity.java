package com.example.akademise;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        BottomNavigationView bottomNav= findViewById(R.id.bottomNavigationView);

        bottomNav.setOnNavigationItemSelectedListener(navListener);

        getSupportFragmentManager().beginTransaction().replace(R.id.flFragment,
                new HomeFragment()).commit();
    }

    private BottomNavigationView.OnNavigationItemSelectedListener navListener =
            new BottomNavigationView.OnNavigationItemSelectedListener() {
                @Override
                public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                    Fragment selectedFragment = null;

                    switch (item.getItemId()){
                        case R.id.miHome:
                            selectedFragment = new HomeFragment();
                            break;
                        case R.id.miCreate:
                            selectedFragment = new ProjectFragment();
                            break;
                        case R.id.miProfile:
                            Intent intent = new Intent(MainActivity.this, ProfileActivity.class);
                            intent.putExtra("me",1);
                            startActivity(intent);
                            break;
                    }
                    if(selectedFragment!=null) {
                        getSupportFragmentManager().beginTransaction().replace(R.id.flFragment,
                                selectedFragment).commit();
                    }
                            
                    return true;
                }
            };




}