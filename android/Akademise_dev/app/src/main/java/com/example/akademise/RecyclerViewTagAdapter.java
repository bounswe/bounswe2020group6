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
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;

//recycler view for viewing tags
public class RecyclerViewTagAdapter extends RecyclerView.Adapter<RecyclerViewTagAdapter.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    List<Tag> tags;
    Context context;
    GetProjects project;

    //constructor for the adapter
    public RecyclerViewTagAdapter(Context ct, List<Tag> tags, GetProjects project) {
        context = ct;
        this.tags = tags;
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
        View view = inflater.inflate(R.layout.tag_row, parent, false);
        return new RecyclerViewTagAdapter.ViewHolder(view);
    }

    //add functionalities to items in the view holders by their positions
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        //set name of the tag
        holder.tag_name.setText(tags.get(position).getTag());
        //change color of the background of the tag
        if(position%2==0){
            holder.row_view.setBackground(context.getResources().getDrawable(R.drawable.rowview_shape_white));
        }
        //delete button for deleting tag from the project
        holder.delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //api call for deleting tag from the project
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
                        //finish the edit tags activity since deletion is successful
                        ((Activity)context).finish();
                    }


                    @Override
                    public void onFailure(Call<Tag> call, Throwable t) {

                        Log.d("Tag", "onFailure: failed");

                    }
                });
            }
        });

    }
    //get how many tags project has
    @Override
    public int getItemCount() {
        if (tags.isEmpty()) {
            return 0;
        }

        return tags.size();
    }
    //define view holder for tag
    public class ViewHolder extends RecyclerView.ViewHolder {
        //name of the tag
        TextView tag_name;
        //button for deletion
        Button delete;
        //all viewholder for changing background
        ConstraintLayout row_view;

        //constructor for view holder
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tag_name = itemView.findViewById(R.id.tv_tagname);
            delete = itemView.findViewById(R.id.btnDelete);
            row_view = itemView.findViewById(R.id.constraintLayout_tag);
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