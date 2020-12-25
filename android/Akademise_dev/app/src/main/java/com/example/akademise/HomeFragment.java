package com.example.akademise;

import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.SearchView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class HomeFragment extends Fragment {

    AkademiseApi akademiseApi;
    SearchView searchView;
    RecyclerView recyclerView;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    private String myToken;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);

    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        loadData();
        akademiseApi = retrofit.create(AkademiseApi.class);



        searchView = (SearchView) getView().findViewById(R.id.svSearch);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                getPosts(query);
                Log.d("search", query.toString());
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });



    }

    private  void getPosts(String query){


        //List<Post> searchedPosts;
        //String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTYwNjEyODgwNH0.5JLFXGx4E2_RT7sGt-as2lgmFk67h1KWODTgZFT9QR0";
        Call<Projects> call= akademiseApi.getProjectsSearched(query,"1","Bearer " + myToken);
        call.enqueue(new Callback<Projects>() {
            @Override
            public void onResponse(Call<Projects> call, Response<Projects> response) {

                if(!response.isSuccessful()){
                    Log.d("Get", "onResponse: " + response.code());
                    return;
                }
                Log.d("GET", "On response: " + response.message());
                Projects Projects = response.body();

                List<Project> projects = Projects.getProjects();
                Call<SearchedUsers> inside_call= akademiseApi.getUsersSearched(query,"0","Bearer " + myToken);
                inside_call.enqueue(new Callback<SearchedUsers>() {
                    @Override
                    public void onResponse(Call<SearchedUsers> call, Response<SearchedUsers> response) {
                        if(!response.isSuccessful()){
                            Log.d("Get", "onResponse: " + response.code());
                            return;
                        }
                        Log.d("GET", "On response: " + response.message());
                        SearchedUsers searchedUsers = response.body();
                        recyclerView = getView().findViewById(R.id.rv_home);
                        RecyclerViewAdapter recyclerViewAdapter = new RecyclerViewAdapter(getActivity(), projects,searchedUsers);
                        recyclerView.setAdapter(recyclerViewAdapter);
                        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));

                    }

                    @Override
                    public void onFailure(Call<SearchedUsers> call, Throwable t) {
                        Log.d("Get", "onFailure: " + t.getMessage());

                    }
                });

            }

            @Override

            public void onFailure(Call<Projects> call, Throwable t) {

                Log.d("Get", "onFailure: " + t.getMessage());

            }
        });


    }
    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
}
