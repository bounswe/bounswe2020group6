package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class OtherUserProjectsActivity extends AppCompatActivity {
    /*
    this activity is to display projects of other users
     */
    //token variables
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    //id variable
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    private String myToken;

    private List<GetProjects> projects;
    private RecyclerView recyclerView;

    AkademiseApi akademiseApi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_other_user_projects);
        //load token
        loadData();
        //initialize retrofit
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        //initialize API
        akademiseApi = retrofit.create(AkademiseApi.class);
        //get projects of a user
        getProjects();

    }
    //get projects
    private void getProjects(){
        //get user id
       if( getIntent().hasExtra("userId")) {
           int userId = getIntent().getIntExtra("userId", -1);
            //call to get projects of a user who got the "userId"
           Call<List<GetProjects>> call = akademiseApi.getProjects(userId, 0, "Bearer " + myToken);
           call.enqueue(new Callback<List<GetProjects>>() {
               @Override
               public void onResponse(Call<List<GetProjects>> call, Response<List<GetProjects>> response) {
                   if (!response.isSuccessful()) {
                       System.out.println("NOT SUCCESSFUL");
                       Toast.makeText(getBaseContext(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                       return;
                   }
                   System.out.println("SUCCESSFUL");
                   projects = response.body();
                    //got the projects successfully
                   //initialize recycler view
                   recyclerView = findViewById(R.id.rvOtherUserProject);
                   RecyclerViewAdapter recyclerViewAdapter = new RecyclerViewAdapter(getBaseContext(), projects,null);
                   recyclerView.setAdapter(recyclerViewAdapter);
                   recyclerView.setLayoutManager(new LinearLayoutManager(getBaseContext()));
               }

               @Override
               public void onFailure(Call<List<GetProjects>> call, Throwable t) {
                   Toast.makeText(getBaseContext(), "Be sure to be connected", Toast.LENGTH_LONG).show();

               }
           });
       }
    }
    //load token
    private void loadData(){
        SharedPreferences sharedPreferences = getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());
    }
}