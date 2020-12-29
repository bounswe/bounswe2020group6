package com.example.akademise;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;

public class StatsAndOverviewFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    String baseURL = "http://ec2-52-91-31-85.compute-1.amazonaws.com/";
    private String myToken;
    private  Integer myId;
    Button seeFollowers;
    Button seeFollowing;
    private RecyclerView recyclerView;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        loadData();
        loadIDData();
        View view = inflater.inflate(R.layout.fragment_stats_and_overview, container, false);
        seeFollowers = view.findViewById(R.id.see_followers);
        seeFollowing = view.findViewById(R.id.see_following);
        recyclerView = view.findViewById(R.id.rv_follow);

        seeFollowers.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                handleFollowersCall();
            }
        });

        seeFollowing.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                handleFollowingCall();
            }
        });

        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

    }

    private void handleFollowersCall(){
        Call<Follower> call = akademiseApi.getFollowers("Bearer " + myToken);

        call.enqueue(new Callback<Follower>() {
            @Override
            public void onResponse(Call<Follower> call, Response<Follower> response) {
                if(!response.isSuccessful()){
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getActivity(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                    return;
                }
                Follower followers = response.body();
                FollowingUsers followingUsers = new FollowingUsers();
                StatsAndOverviewAdapter adapter = new StatsAndOverviewAdapter(getActivity(),followers, followingUsers, true);
                recyclerView.setAdapter(adapter);
                recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
            }

            @Override
            public void onFailure(Call<Follower> call, Throwable t) {
                Toast.makeText(getActivity(), "Be sure to be connected", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }

    private void handleFollowingCall(){
        Call<FollowingUsers> call = akademiseApi.getFollowings("Bearer " + myToken);

        call.enqueue(new Callback<FollowingUsers>() {
            @Override
            public void onResponse(Call<FollowingUsers> call, Response<FollowingUsers> response) {
                if(!response.isSuccessful()){
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getActivity(), "Something went wrong :(", Toast.LENGTH_LONG).show();
                    return;
                }
                FollowingUsers followings = response.body();
                Follower followers = new Follower();
                StatsAndOverviewAdapter adapter = new StatsAndOverviewAdapter(getActivity(),followers, followings, false);
                recyclerView.setAdapter(adapter);
                recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
            }

            @Override
            public void onFailure(Call<FollowingUsers> call, Throwable t) {
                Toast.makeText(getActivity(), "Be sure to be connected", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }


    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
    }
    private void loadIDData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);
    }
}
