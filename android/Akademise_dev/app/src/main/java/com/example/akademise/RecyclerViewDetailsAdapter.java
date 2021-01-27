package com.example.akademise;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.ColorFilter;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.res.ResourcesCompat;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;
//recycler view for viewing contents(tags and milestones)
public class RecyclerViewDetailsAdapter extends RecyclerView.Adapter<RecyclerViewDetailsAdapter.ViewHolder> {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    List<String> contents;
    Context context;
    //constructor for the adapter
    public RecyclerViewDetailsAdapter(Context ct, List<String> contents) {
        context = ct;
        this.contents = contents;
    }
    //customize the view holder
    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.content_row, parent, false);
        return new RecyclerViewDetailsAdapter.ViewHolder(view);
    }

    //add functionalities to items in the view holders by their positions
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        //set name of the content(
        holder.content_name.setText(contents.get(position));
        //change color of the background of the content
        if(position%2==0){
            holder.row_view.setBackground(context.getResources().getDrawable(R.drawable.rowview_shape_white));
        }
    }
    //get how many contents in recycler view
    @Override
    public int getItemCount() {
        if (contents.isEmpty()) {
            return 0;
        }

        return contents.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        //name of the content (tag or milestone)
        TextView content_name;
        //all viewholder for changing background
        ConstraintLayout row_view;

        //constructor for view holder
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            content_name = itemView.findViewById(R.id.tv_contentname);
            row_view = itemView.findViewById(R.id.relativeLayoutContent);
        }

    }


}