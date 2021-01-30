package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.SearchView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class InvitationActivity extends AppCompatActivity {

    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    private String myToken;
    private Integer myId;
    private Integer projectId;
    List<Request> requests;

    //xml elements i will be using
    RecyclerView recyclerView;
    SearchView searchView;

    @Override
    //set the layout, initialize the api
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //set the layout
        setContentView(R.layout.fragment_invitation);

        loadData();
//init retrofit
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
//init api
        akademiseApi = retrofit.create(AkademiseApi.class);
        loadIDData();


        //set the search bar to search and find users to invite
        searchView = (SearchView) findViewById(R.id.svSearch_invitation);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {

            @Override
            //get the information of the searched user
            public boolean onQueryTextSubmit(String query) {
                getUsers(query);
                Log.d("search", query.toString());
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });

    }


    //load my login token
    private void loadData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    //load my user id
    private void loadIDData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }

    //get the result for our search query
    private void getUsers(String query) {
//request
        Call<SearchedUsers> inside_call = akademiseApi.getUsersSearched(query, "0", "Bearer " + myToken);
        inside_call.enqueue(new Callback<SearchedUsers>() {
            @Override
            public void onResponse(Call<SearchedUsers> call, Response<SearchedUsers> response) {
                if (!response.isSuccessful()) {
                    Log.d("Get", "onResponse: " + response.code());
                    return;
                }
                Log.d("GET", "On response: " + response.message());
                //get the result of the request
                SearchedUsers searchedUsers = response.body();
                //we should set the recyclerviewer and necessary layouts to acheive a dynamic, scrollable screen
                recyclerView = findViewById(R.id.invitationRv);
                //initialize rv
                RecyclerViewAdapterInvite recyclerViewAdapter = new RecyclerViewAdapterInvite(InvitationActivity.this, searchedUsers, projectId);
                recyclerView.setAdapter(recyclerViewAdapter);
                recyclerView.setLayoutManager(new LinearLayoutManager(InvitationActivity.this));

            }

            @Override
            public void onFailure(Call<SearchedUsers> call, Throwable t) {
                Log.d("Get", "onFailure: " + t.getMessage());

            }
        });


    }


}