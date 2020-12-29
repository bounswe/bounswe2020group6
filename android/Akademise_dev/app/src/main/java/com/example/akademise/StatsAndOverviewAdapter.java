package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;

public class StatsAndOverviewAdapter extends RecyclerView.Adapter<StatsAndOverviewAdapter.ViewHolder> {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    String baseURL = "http://ec2-52-91-31-85.compute-1.amazonaws.com/";
    private String myToken;
    private  Integer myId;
    Profile profile;
    Context context;
    Follower followers;
    FollowingUsers followings;
    Boolean isFollowers;

    public StatsAndOverviewAdapter(Context context, Follower followers, FollowingUsers followings, Boolean isFollowers){
        this.context = context;
        this.followers = followers;
        this.followings = followings;
        this.isFollowers = isFollowers;
        loadData();
        loadIDData();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
    }


    @NonNull
    @Override
    public StatsAndOverviewAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.stats_and_overview_row, parent, false);
        return new StatsAndOverviewAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull StatsAndOverviewAdapter.ViewHolder holder, int position) {
        if(isFollowers){
            String currentName = followers.data.get(position).followed.name + " " + followers.data.get(position).followed.surname;
            holder.name.setText(currentName);
        }else{
            String currentName = followings.data.get(position).following.name + " " + followings.data.get(position).following.surname;
            holder.name.setText(currentName);
        }

        holder.seeProfileButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Call<Profile> call;
                if(isFollowers){
                    call = akademiseApi.getMyProfile(followers.data.get(position).followed.id, "Bearer " + myToken);
                }else{
                    call = akademiseApi.getMyProfile(followings.data.get(position).following.id, "Bearer " + myToken);
                }
                call.enqueue(new Callback<Profile>() {
                    @Override
                    public void onResponse(Call<Profile> call, Response<Profile> response) {
                        if(!response.isSuccessful()){
                            return;
                        }
                        profile = response.body();
                        Intent intent = new Intent(context, ProfileActivity.class);
                        intent.putExtra("user", profile);
                        context.startActivity(intent);
                    }
                    @Override
                    public void onFailure(Call<Profile> call, Throwable t) {
                    }
                });

            }
        });

    }

    @Override
    public int getItemCount() {
        if(isFollowers){
            return followers.data.size();
        }else{
            return followings.data.size();
        }
    }


    public class ViewHolder extends RecyclerView.ViewHolder{
        Button seeFollowers;
        Button seeFollowing;
        TextView name;
        Button seeProfileButton;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            seeFollowers = itemView.findViewById(R.id.see_followers);
            seeFollowing = itemView.findViewById(R.id.see_following);
            name = itemView.findViewById(R.id.name_follow);
            seeProfileButton = itemView.findViewById(R.id.see_profile);
        }
    }

    private void loadData(){
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyPEREFERENCES, MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
    }
    private void loadIDData(){
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);
    }
}
