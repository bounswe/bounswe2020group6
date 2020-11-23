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
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ProjectFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    AkademiseApi akademiseApi;
    private String myToken;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_project, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        loadData();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        getProjects(1);

        Button btnAdd = view.findViewById(R.id.btnAddPublication);
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoPublicationCreation();
            }
        });
    }

    private void gotoPublicationCreation(){
        Intent intent = new Intent(getActivity().getBaseContext(), ProjectCreationActivity.class);
        startActivity(intent);
    }

    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

     private  void getProjects(Integer id){

        Call<List<Project>> call= akademiseApi.getProjects(id, "Bearer "+myToken);
        call.enqueue(new Callback<List<Project>>() {
            @Override
            public void onResponse(Call<List<Project>> call, Response<List<Project>> response) {

                if(!response.isSuccessful()){
                    Log.d("Project", "onResponse: not successful");
                    return;
                }

                List<Project> projects = response.body();
                int count=0;
                for (Project project : projects){
                    count++;
                }
                Log.d("Get_Project", String.valueOf(count));
            }

            @Override
            public void onFailure(Call<List<Project>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });

    }


}
