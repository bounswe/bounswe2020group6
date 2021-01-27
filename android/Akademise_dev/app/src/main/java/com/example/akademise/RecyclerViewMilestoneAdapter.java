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
import androidx.constraintlayout.widget.ConstraintLayout;
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
//recycler view for viewing and editing milestones
public class RecyclerViewMilestoneAdapter extends RecyclerView.Adapter<RecyclerViewMilestoneAdapter.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    List<Milestone> milestones;
    Context context;
    GetProjects project;

    //constructor for the adapter
    public RecyclerViewMilestoneAdapter(Context ct, List<Milestone> milestones, GetProjects project) {
        context = ct;
        this.milestones = milestones;
        this.project = project;
        loadData();
        loadIDData();
        //initalize api
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();


        akademiseApi = retrofit.create(AkademiseApi.class);

    }
    //customize the view holder
    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.milestone_row, parent, false);
        return new RecyclerViewMilestoneAdapter.ViewHolder(view);
    }
    //add functionalities to items in the view holders by their positions
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        //set title and description of the milestone
        holder.milestone_title.setText(milestones.get(position).getTitle());
        holder.milestone_description.setText(milestones.get(position).getDescription());
        //converting json to DD/MM/YYYY format
        String time = milestones.get(position).getDate();
        String year = time.substring(0,4);
        String month = time.substring(5,7);
        String day = time.substring(8,10);
        String date = day + "/" + month + "/" + year;
        holder.milestone_date.setText(date);
        //change color of the background of the milestone
        if(position%2==0){
            holder.row_view.setBackground(context.getResources().getDrawable(R.drawable.rowview_shape_white));
        }
        //delete call should be done since delete is pressed
        holder.delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //api call for deleting milestone
                Call<Milestone> call = akademiseApi.deleteMilestone(milestones.get(position).getId(), "Bearer " + myToken);
                call.enqueue(new Callback<Milestone>() {
                    @Override
                    public void onResponse(Call<Milestone> call, Response<Milestone> response) {

                        if (!response.isSuccessful()) {
                            Log.d("Milestone", "onResponse: not successful");
                            return;
                        }
                        Log.d("Milestone", "onResponse: successful");
                        Log.d("Milestone", "Deleted Milestone: " + milestones.get(position).getTitle() +" "+milestones.get(position).getId());
                        Toast.makeText(context, milestones.get(position).getTitle() + " is deleted successfully!", Toast.LENGTH_LONG).show();
                        //finish the edit milestones activity since deletion is successful
                        ((Activity)context).finish();
                    }

                    @Override
                    public void onFailure(Call<Milestone> call, Throwable t) {

                        Log.d("Tag", "onFailure: failed");

                    }
                });
            }
        });
        //update call should be done since the button is pressed
        holder.update.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //get deadline of the milestone
                String date = holder.milestone_date.getText().toString();
                //extract day month and year from DD/MM/YYYY format
                List<String> dateFields =  Arrays.asList(date.split("/"));
                //check the validity of inserted date
                if(dateFields.size()==3) {
                    //get contents of the milestone
                    Milestone updatedMilestone = milestones.get(position);
                    //change contents of the milestone with inserted values
                    updatedMilestone.setTitle(holder.milestone_title.getText().toString());
                    updatedMilestone.setDescription(holder.milestone_description.getText().toString());
                    //converting deadline into json form
                    String dateJson = dateFields.get(2) + "-" + dateFields.get(1) + "-" + dateFields.get(0) + "T00:00:00.000Z";
                    updatedMilestone.setDate(dateJson);
                    //api call for updating milestone
                    Call<Milestone> call = akademiseApi.updateMilestone(milestones.get(position).getId(),updatedMilestone, "Bearer " + myToken);
                    call.enqueue(new Callback<Milestone>() {
                        @Override
                        public void onResponse(Call<Milestone> call, Response<Milestone> response) {

                            if (!response.isSuccessful()) {
                                Log.d("Milestone", "onResponse: not successful");
                                return;
                            }
                            Log.d("Milestone", "onResponse: successful");
                            Log.d("Milestone", "Update Milestone: " + milestones.get(position).getTitle() + " " + milestones.get(position).getId());
                            Toast.makeText(context, milestones.get(position).getTitle() + " is updated successfully!", Toast.LENGTH_LONG).show();
                            //finish the edit milestones activity since update is successful
                            ((Activity)context).finish();
                        }

                        @Override
                        public void onFailure(Call<Milestone> call, Throwable t) {

                            Log.d("Milestone", "onFailure: failed");

                        }
                    });
                }
            }
        });

    }
    //get how many milestones project has
    @Override
    public int getItemCount() {
        if (milestones.isEmpty()) {
            return 0;
        }

        return milestones.size();
    }

    //define view holder for milestone
    public class ViewHolder extends RecyclerView.ViewHolder {
        //title of the milestone
        EditText milestone_title;
        //description of the milestone
        EditText milestone_description;
        //deadline for the milestone
        EditText milestone_date;
        //button for delete milestone
        Button delete;
        //button for update contents of the milesitone
        Button update;
        //all viewholder for changing backgrund
        ConstraintLayout row_view;

        //constructor for view holder
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            milestone_title = itemView.findViewById(R.id.et_milestoneTitle);
            milestone_description = itemView.findViewById(R.id.et_milestoneDescription);
            milestone_date = itemView.findViewById(R.id.et_milestoneDate);
            delete = itemView.findViewById(R.id.btnMilestoneDelete);
            update = itemView.findViewById(R.id.btnMilestoneUpdate);
            row_view = itemView.findViewById(R.id.constraintLayout_milestone);
        }

    }

    //get token of the user from local storage
    private void loadData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
    //get id of the user from local storage
    private void loadIDData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }
}