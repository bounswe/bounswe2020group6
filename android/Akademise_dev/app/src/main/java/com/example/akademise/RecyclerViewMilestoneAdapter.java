package com.example.akademise;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.Arrays;
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
        holder.delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Call<Milestone> call = akademiseApi.deleteMilestone(milestones.get(position).getId(), "Bearer " + myToken);

                call.enqueue(new Callback<Milestone>() {
                    @Override
                    public void onResponse(Call<Milestone> call, Response<Milestone> response) {

                        if (!response.isSuccessful()) {
                            Log.d("Tag", "onResponse: not successful");
                            return;
                        }

                        Log.d("Milestone", "onResponse: successful");
                        Log.d("Milestone", "Deleted Milestone: " + milestones.get(position).getTitle() +" "+milestones.get(position).getId());
                        Toast.makeText(context, milestones.get(position).getTitle() + " is deleted successfully!", Toast.LENGTH_LONG).show();
                        ((Activity)context).finish();
                    }

                    @Override
                    public void onFailure(Call<Milestone> call, Throwable t) {

                        Log.d("Tag", "onFailure: failed");

                    }
                });
            }
        });
        holder.update.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String date = holder.milestone_date.getText().toString();
                List<String> dateFields =  Arrays.asList(date.split("/"));
                if(dateFields.size()==3) {
                    Milestone updatedMilestone = milestones.get(position);
                    updatedMilestone.setTitle(holder.milestone_title.getText().toString());
                    updatedMilestone.setDescription(holder.milestone_description.getText().toString());
                    String dateJson = dateFields.get(2) + "-" + dateFields.get(1) + "-" + dateFields.get(0) + "T00:00:00.000Z";
                    updatedMilestone.setDate(dateJson);
                    Call<Milestone> call = akademiseApi.updateMilestone(milestones.get(position).getId(),updatedMilestone, "Bearer " + myToken);

                    call.enqueue(new Callback<Milestone>() {
                        @Override
                        public void onResponse(Call<Milestone> call, Response<Milestone> response) {

                            if (!response.isSuccessful()) {
                                Log.d("Tag", "onResponse: not successful");
                                return;
                            }
                            Log.d("Tag", "onResponse: successful");
                            Log.d("Tag", "Deleted Tag: " + milestones.get(position).getTitle() + " " + milestones.get(position).getId());
                            Toast.makeText(context, milestones.get(position).getTitle() + " is updated successfully!", Toast.LENGTH_LONG).show();
                            ((Activity)context).finish();
                        }

                        @Override
                        public void onFailure(Call<Milestone> call, Throwable t) {

                            Log.d("Tag", "onFailure: failed");

                        }
                    });
                }
            }
        });

    }

    @Override
    public int getItemCount() {
        if (milestones.isEmpty()) {
            return 0;
        }

        return milestones.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        EditText milestone_title;
        EditText milestone_description;
        EditText milestone_date;
        Button delete;
        Button update;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            milestone_title = itemView.findViewById(R.id.et_milestoneTitle);
            milestone_description = itemView.findViewById(R.id.et_milestoneDescription);
            milestone_date = itemView.findViewById(R.id.et_milestoneDate);
            delete = itemView.findViewById(R.id.btnMilestoneDelete);
            update = itemView.findViewById(R.id.btnMilestoneUpdate);
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