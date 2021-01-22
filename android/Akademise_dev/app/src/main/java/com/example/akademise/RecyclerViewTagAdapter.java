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
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;

public class RecyclerViewTagAdapter extends RecyclerView.Adapter<RecyclerViewTagAdapter.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL = "http://ec2-52-91-31-85.compute-1.amazonaws.com:3000/";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    List<Tag> tags;
    Context context;
    GetProjects project;
    public RecyclerViewTagAdapter(Context ct, List<Tag> tags, GetProjects project) {
        context = ct;
        this.tags = tags;
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
        View view = inflater.inflate(R.layout.tag_row, parent, false);
        return new RecyclerViewTagAdapter.ViewHolder(view);
    }


    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.tag_name.setText(tags.get(position).getTag());
        holder.delete.setOnClickListener(new View.OnClickListener() {
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

    @Override
    public int getItemCount() {
        if (tags.isEmpty()) {
            return 0;
        }

        return tags.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView tag_name;
        Button delete;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tag_name = itemView.findViewById(R.id.tv_tagname);
            delete = itemView.findViewById(R.id.btnDelete);
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