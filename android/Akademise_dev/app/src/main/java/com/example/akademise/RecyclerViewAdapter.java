package com.example.akademise;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> {
    List<Project> projects;
    Context context;
    public RecyclerViewAdapter(Context ct, List<Project> prj){
        context=ct;
        projects=prj;

    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.row, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.title.setText(projects.get(position).getTitle());
        holder._abstract.setText(projects.get(position).getAbstract1());
        holder.imageView.setImageResource(R.drawable.ic_folder_foreground);

    }

    @Override
    public int getItemCount() {
        return projects.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView title;
        TextView _abstract;
        ImageView imageView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.tv_title);
            _abstract= itemView.findViewById(R.id.tv_abstract);
            imageView = itemView.findViewById(R.id.iv_project);
        }

    }

}
