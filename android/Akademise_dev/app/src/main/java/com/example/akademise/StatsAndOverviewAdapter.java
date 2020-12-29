package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class StatsAndOverviewAdapter extends RecyclerView.Adapter<StatsAndOverviewAdapter.ViewHolder> {
    Context context;
    Follower followers;
    FollowingUsers followings;
    Boolean isFollowers;

    public StatsAndOverviewAdapter(Context context, Follower followers, FollowingUsers followings, Boolean isFollowers){
        this.context = context;
        this.followers = followers;
        this.followings = followings;
        this.isFollowers = isFollowers;
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
        /*
        holder.seeProfileButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               Intent intent;

            }
        });
         */
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
}
