package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import static android.content.Context.MODE_PRIVATE;

public class GoogleScholarRVAdapter extends RecyclerView.Adapter<GoogleScholarRVAdapter.ViewHolder> {
    /*
     It is the recycler view adapter of google scholar page.
     */
    List<String> Titles;
    List<String> Desc;
    Context context;

    public GoogleScholarRVAdapter(Context ct, List<String> title, List<String> desc) {
        //get the titles and desc lists. (These lists are filled on GoogleScholarFragment.java)
        context = ct;
        Titles = title;
        Desc = desc;

    }

    @NonNull
    @Override
    public GoogleScholarRVAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        //layout row is used for this recycler view.
        View view = inflater.inflate(R.layout.row, parent, false);
        return new GoogleScholarRVAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull GoogleScholarRVAdapter.ViewHolder holder, int position) {
        //fill the variables
        holder.title.setText(Titles.get(position));
        holder._abstract.setText(Desc.get(position));
        holder.imageView.setImageResource(R.drawable.ic_folder_foreground);

        }


    @Override
    public int getItemCount() {
        //size of the recycler view
        return Titles.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        //publication variables
        TextView title;
        TextView _abstract;
        ImageView imageView;
        View mView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            //initialize the variables
            title = itemView.findViewById(R.id.tv_title);
            _abstract = itemView.findViewById(R.id.tv_abstract);
            imageView = itemView.findViewById(R.id.iv_project);
            mView = itemView;
        }

    }


}
