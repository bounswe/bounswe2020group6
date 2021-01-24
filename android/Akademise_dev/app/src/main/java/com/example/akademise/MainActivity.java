package com.example.akademise;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    String baseURL ;
    AkademiseApi akademiseApi;
    private String myToken;
    private Integer myId;
    List<Request> requests;
    List<Notifications> notif;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        baseURL=getString(R.string.baseUrl);

        BottomNavigationView bottomNav= findViewById(R.id.bottomNavigationView);

        bottomNav.setOnNavigationItemSelectedListener(navListener);

        getSupportFragmentManager().beginTransaction().replace(R.id.flFragment,
                new HomeFragment()).commit();
        loadData();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        loadIDData();
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
                        case R.id.miNotifications:
                            getNotifications();
                            break;
                    }
                    if(selectedFragment!=null) {
                        getSupportFragmentManager().beginTransaction().replace(R.id.flFragment,
                                selectedFragment).commit();
                    }
                            
                    return true;
                }
            };



    private void loadIDData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }

    private void getRequests() {
        List<Request> mod_req = new ArrayList<Request>();
        Call<List<Request>> call = akademiseApi.getRequests("Bearer " + myToken);
        call.enqueue(new Callback<List<Request>>() {
            @Override
            public void onResponse(Call<List<Request>> call, Response<List<Request>> response) {

                if (!response.isSuccessful()) {
                    Log.d("Request", "onResponse: not successful");
                    return;
                }

                requests = response.body();


                for (int i = 0; i < requests.size(); i++) {
                    Request req = requests.get(i);
                        mod_req.add(req);

                }

                final AlertDialog.Builder mBuilder = new AlertDialog.Builder(MainActivity.this);
                mBuilder.setTitle("Notifications");
                LayoutInflater inflater = getLayoutInflater();
                View convertView = inflater.inflate(R.layout.popup, null);

                RecyclerView list = convertView.findViewById(R.id.rv_popup);
                list.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
                PopUpAdapter recyclerViewAdapter = new PopUpAdapter(MainActivity.this, mod_req, notif);
                list.setAdapter(recyclerViewAdapter);
                mBuilder.setView(convertView); // setView

                AlertDialog dialog = mBuilder.create();
                dialog.show();

            }

            @Override
            public void onFailure(Call<List<Request>> call, Throwable t) {

                Log.d("Request", "onFailure: failed");

            }
        });


    }

    private void getNotifications(){
         notif = new ArrayList<Notifications>();
        Call<List<Notifications>> call = akademiseApi.getNotifications("Bearer " + myToken);
        call.enqueue(new Callback<List<Notifications>>() {
            @Override
            public void onResponse(Call<List<Notifications>> call, Response<List<Notifications>> response) {
                if (!response.isSuccessful()) {
                    Log.d("Notifications", "onResponse: not successful");
                    return;
                }
                List<Notifications> getNotif = response.body();
                for (int i = 0; i < getNotif.size(); i++) {
                    Notifications not = getNotif.get(i);
                    notif.add(not);
                }
                getRequests();
            }

            @Override
            public void onFailure(Call<List<Notifications>> call, Throwable t) {
                Log.d("Notifications", "onFailure: failed");
            }
        });
    }

    private void loadData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }




}