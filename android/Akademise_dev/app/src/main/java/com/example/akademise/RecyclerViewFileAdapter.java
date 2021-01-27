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
//recycler view for viewing files
public class RecyclerViewFileAdapter extends RecyclerView.Adapter<RecyclerViewFileAdapter.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    List<String> files;
    Context context;
    //constructor for the adapter
    public RecyclerViewFileAdapter(Context ct, List<String> fls) {
        context = ct;
        files = fls;
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
        View view = inflater.inflate(R.layout.file_row, parent, false);
        return new RecyclerViewFileAdapter.ViewHolder(view);
    }
    //add functionalities to items in the view holders by their positions
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        //set name of the file
        holder.file_name.setText(files.get(position));
        holder.imageView.setImageResource(R.drawable.ic_folder_foreground);
    }
    //get how many files project has
    @Override
    public int getItemCount() {
        if (files.isEmpty()) {
            return 0;
        }

        return files.size();
    }
    //define view holder for file
    public class ViewHolder extends RecyclerView.ViewHolder {
        //name of the file
        TextView file_name;
        //file icon for the file
        ImageView imageView;
        //whole view
        View mView;

        //constructor for view holder
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            file_name = itemView.findViewById(R.id.tv_filename);
            imageView = itemView.findViewById(R.id.iv_file);
            mView = itemView;
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