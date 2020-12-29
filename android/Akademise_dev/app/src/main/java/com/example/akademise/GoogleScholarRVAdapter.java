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

    List<String> Titles;
    List<String> Desc;
    Context context;

    public GoogleScholarRVAdapter(Context ct, List<String> title, List<String> desc) {
        context = ct;
        Titles = title;
        Desc = desc;

    }

    @NonNull
    @Override
    public GoogleScholarRVAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.row, parent, false);
        return new GoogleScholarRVAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull GoogleScholarRVAdapter.ViewHolder holder, int position) {
        holder.title.setText(Titles.get(position));
        holder._abstract.setText(Desc.get(position));
        holder.imageView.setImageResource(R.drawable.ic_folder_foreground);

        }


    @Override
    public int getItemCount() {
        return Titles.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView title;
        TextView _abstract;
        ImageView imageView;
        View mView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.tv_title);
            _abstract = itemView.findViewById(R.id.tv_abstract);
            imageView = itemView.findViewById(R.id.iv_project);
            mView = itemView;
        }

    }


}
