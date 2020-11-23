package com.example.akademise;

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

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class HomeFragment extends Fragment {
    //List<Project> searchedPosts;
    AkademiseApi akademiseApi;
    SearchView searchView;
    TextView tvScroll;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);

    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://jsonplaceholder.typicode.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

        tvScroll = getView().findViewById(R.id.tvScrollView);

        searchView = (SearchView) getView().findViewById(R.id.svSearch);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                getPosts();
                Log.d("search", query.toString());
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });



    }

    private  void getPosts(){

        Call<List<Project>> call= akademiseApi.getPostsSearched(2);
        call.enqueue(new Callback<List<Project>>() {
            @Override
            public void onResponse(Call<List<Project>> call, Response<List<Project>> response) {

                if(!response.isSuccessful()){
                    Log.d("Project", "onResponse: not successful");
                    return;
                }

                List<Project> projects = response.body();

                for (Project project : projects){

                    tvScroll.setText(tvScroll.getText()+ project.getTitle()+"\n");

                }

            }

            @Override
            public void onFailure(Call<List<Project>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });

    }
}
