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
    String baseURL = "http://ec2-52-91-31-85.compute-1.amazonaws.com:3000/";
    AkademiseApi akademiseApi;
    private String myToken;
    private Integer myId;
    List<Request> requests;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

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
                            getRequests();
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

              /*  final Dialog dialog = new Dialog(getApplicationContext());

                dialog.setContentView(R.layout.popup);
                dialog.setCancelable(false);

                if (dialog.getWindow() != null){
                    dialog.getWindow().setLayout(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
                }

                RecyclerView recyclerView = dialog.findViewById(R.id.rv_popup);
                RequestAdapter recyclerViewAdapter = new RequestAdapter(MainActivity.this, mod_req);
                recyclerView.setLayoutManager(new LinearLayoutManager(MainActivity.this));
                recyclerView.setAdapter(recyclerViewAdapter);

                dialog.show();

                 */
                final AlertDialog.Builder mBuilder = new AlertDialog.Builder(MainActivity.this);
                mBuilder.setTitle("Notifications");
                LayoutInflater inflater = getLayoutInflater();
                View convertView = inflater.inflate(R.layout.popup, null);

                RecyclerView list = convertView.findViewById(R.id.rv_popup);
                list.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
                PopUpAdapter recyclerViewAdapter = new PopUpAdapter(MainActivity.this, mod_req);
                list.setAdapter(recyclerViewAdapter);
                mBuilder.setView(convertView); // setView

                AlertDialog dialog = mBuilder.create();
                dialog.show();

            }

            @Override
            public void onFailure(Call<List<Request>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });


    }

    private void loadData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }




}