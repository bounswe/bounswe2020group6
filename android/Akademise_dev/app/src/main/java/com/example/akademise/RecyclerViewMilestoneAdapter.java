package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.Date;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;

public class RecyclerViewMilestoneAdapter extends RecyclerView.Adapter<RecyclerViewMilestoneAdapter.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL = "http://ec2-52-91-31-85.compute-1.amazonaws.com:3000/";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    List<Milestone> milestones;
    Context context;
    GetProjects project;
    public RecyclerViewMilestoneAdapter(Context ct, List<Milestone> milestones, GetProjects project) {
        context = ct;
        this.milestones = milestones;
        this.project = project;
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
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.milestone_row, parent, false);
        return new RecyclerViewMilestoneAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.milestone_title.setText(milestones.get(position).getTitle());
        holder.milestone_description.setText(milestones.get(position).getDescription());
        String time = milestones.get(position).getDate();
        String year = time.substring(0,4);
        String month = time.substring(5,7);
        String day = time.substring(8,10);
        String date = day + "/" + month + "/" + year;
        holder.milestone_date.setText(date);
        /*holder.delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Call<Tag> call = akademiseApi.deleteTag(tags.get(position).getTag(),project.getId(), "Bearer " + myToken);

                call.enqueue(new Callback<Tag>() {
                    @Override
                    public void onResponse(Call<Tag> call, Response<Tag> response) {

                        if (!response.isSuccessful()) {
                            Log.d("Tag", "onResponse: not successful");
                            return;
                        }
                        Log.d("Tag", "onResponse: successful");
                        Log.d("Tag", "Deleted Tag: " + tags.get(position).getTag() +" "+project.getId());
                        Toast.makeText(context, tags.get(position).getTag() + " is deleted successfully!", Toast.LENGTH_LONG).show();
                        Intent intent = new Intent(context, ProjectDetailsActivity.class);
                        intent.putExtra("project", project);
                        //intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        context.startActivity(intent);
                    }

                    @Override
                    public void onFailure(Call<Tag> call, Throwable t) {

                        Log.d("Tag", "onFailure: failed");

                    }
                });
            }
        });
    */
    }

    @Override
    public int getItemCount() {
        if (milestones.isEmpty()) {
            return 0;
        }

        return milestones.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView milestone_title;
        TextView milestone_description;
        TextView milestone_date;
        Button delete;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            milestone_title = itemView.findViewById(R.id.tv_milestoneTitle);
            milestone_description = itemView.findViewById(R.id.tv_milestoneDescription);
            milestone_date = itemView.findViewById(R.id.tv_milestoneDate);
            delete = itemView.findViewById(R.id.btnMilestoneDelete);
        }

    }

    private void loadData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    private void loadIDData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }
}