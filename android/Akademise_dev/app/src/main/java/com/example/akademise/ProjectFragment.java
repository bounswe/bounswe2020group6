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
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

//fragment for displaying projects of a user
public class ProjectFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    private String myToken;
    private  Integer myId;
    RecyclerView recyclerView;
    List<GetProjects> projects;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_project, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        loadData();
        //initialize api
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        akademiseApi = retrofit.create(AkademiseApi.class);
        //get necessary information for the projects to list them
        loadIDData();
        getProjects(myId);
        //button for adding new project
        Button btnAdd = view.findViewById(R.id.btnAddPublication);
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoPublicationCreation();
            }
        });
    }
    //refresh user's projects
    @Override
    public void onResume() {
        super.onResume();
        //get user's projects and update recycler view for projects
        getProjects(myId);
    }
    //function that directs user to project creation activity
    private void gotoPublicationCreation(){
        Intent intent = new Intent(getActivity().getBaseContext(), ProjectCreationActivity.class);
        startActivity(intent);
    }
    //get token of the user from local storage
    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
    // function to get all projects of the user
     private  void getProjects(Integer id){
        //api call to get all projects of the user
        Call<List<GetProjects>> call= akademiseApi.getProjects(id, 0,"Bearer "+myToken);
        call.enqueue(new Callback<List<GetProjects>>() {
            @Override
            public void onResponse(Call<List<GetProjects>> call, Response<List<GetProjects>> response) {

                if(!response.isSuccessful()){
                    Log.d("Project", "onResponse: not successful");
                    return;
                }

                projects = response.body();
                //initialization of the recycler view for listing projects of a user
                recyclerView = getView().findViewById(R.id.rv_projects);
                RecyclerViewAdapter recyclerViewAdapter = new RecyclerViewAdapter(getActivity(), projects,null);
                recyclerView.setAdapter(recyclerViewAdapter);
                recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
            }

            @Override
            public void onFailure(Call<List<GetProjects>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });

    }
    //get id of the user from local storage
    private void loadIDData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }


}
