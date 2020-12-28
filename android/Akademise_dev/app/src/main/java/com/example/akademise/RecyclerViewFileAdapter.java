package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
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

public class RecyclerViewFileAdapter extends RecyclerView.Adapter<RecyclerViewFileAdapter.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    List<String> files;
    Context context;
    public RecyclerViewFileAdapter(Context ct, List<String> fls) {
        context = ct;
        files = fls;
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
        View view = inflater.inflate(R.layout.file_row, parent, false);
        return new RecyclerViewFileAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.file_name.setText(files.get(position));
        holder.imageView.setImageResource(R.drawable.ic_folder_foreground);
        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*
                Call<Collab> call = akademiseApi.addCollab(c, "Bearer " + myToken);

                call.enqueue(new Callback<Collab>() {
                    @Override
                    public void onResponse(Call<Collab> call, Response<Collab> response) {

                        if (!response.isSuccessful()) {
                            Log.d("Project", "onResponse: not successful");
                            return;
                        }

                    }

                    @Override
                    public void onFailure(Call<Collab> call, Throwable t) {

                        Log.d("Project", "onFailure: failed");

                    }
                });
                */
            }
        });

    }

    @Override
    public int getItemCount() {
        if (files.isEmpty()) {
            return 0;
        }

        return files.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView file_name;
        ImageView imageView;
        View mView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            file_name = itemView.findViewById(R.id.tv_filename);
            imageView = itemView.findViewById(R.id.iv_file);
            mView = itemView;
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