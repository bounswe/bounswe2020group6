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
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import static android.content.Context.MODE_PRIVATE;

public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> {
    /*
    This recycler view adapter takes list of GetProjects objects and SearchedUsers object as inputs.
    Then displays them in the recycler view.
    When one element is clicked in the recycler view, then related page (project details page or profile page) is opened.
     */
    //variables to get the ID of logged in user.
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    public static final String accessID = "XXXXXID";

    List<GetProjects> projects;
    SearchedUsers searchedUsers;
    Context context;
    List<Integer> userId=new ArrayList<>();

    public RecyclerViewAdapter(Context ct, List<GetProjects> prj, SearchedUsers srchdUsr) {
        //get the parameters
        context = ct;
        projects = prj;
        searchedUsers = srchdUsr;

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
        //get the ID of the logged in user
        loadIDData();
        //if it is a project, set the texts so
        if(position<projects.size()) {
            holder.title.setText(projects.get(position).getTitle());
            holder._abstract.setText(projects.get(position).getSummary());
            holder.imageView.setImageResource(R.drawable.ic_folder_foreground);
            userId.add(projects.get(position).getUserId());
        }
        //if it is a user, set the texts so
        else{
            String person= searchedUsers.getUsers().get(position-projects.size()).getName()+" "+
                    searchedUsers.getUsers().get(position-projects.size()).getSurname();
            holder.title.setText(person);
            holder._abstract.setText(searchedUsers.getUsers().get(position-projects.size()).getTitle());
            holder.imageView.setImageResource(R.drawable.ic_profile_foreground);
            userId.add(searchedUsers.getUsers().get(position-projects.size()).getId());
        }
        //decides what to do on a click
        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                //if a project is clicked
                if(position<projects.size()) {
                    //if it is logged in user's project
                    if (userId.get(position) == myId) {
                        intent = new Intent(context, ProjectDetailsActivity.class);

                    //if its another user's project
                    } else {
                        intent = new Intent(context, ProjectDetailsUserActivity.class);
                    }

                    //send the project info to the next page that will be opened
                    intent.putExtra("project", projects.get(position));
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

                    context.startActivity(intent);
                }
                //if a user is clicked
                else{
                    intent = new Intent(context, ProfileActivity.class);
                    //if it is me, put "me" as extra
                    if (userId.get(position) == myId) {
                        intent.putExtra("me",1);

                    //if it is another user, put "otherUser" as extra
                    } else {
                        intent.putExtra("otherUser",0);
                    }
                    intent.putExtra("user", searchedUsers.getUsers().get(position-projects.size()));
                    context.startActivity(intent);

                }
            }
        });


    }

    @Override
    public int getItemCount() {
        //specify the length of the recycler view
        if(searchedUsers!=null && searchedUsers.getUsers()!=null ){
            return projects.size() + searchedUsers.getUsers().size();
        }
        else return projects.size();

    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView title;
        TextView _abstract;
        ImageView imageView;
        View mView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            //initialize the xml variables
            title = itemView.findViewById(R.id.tv_title);
            _abstract = itemView.findViewById(R.id.tv_abstract);
            imageView = itemView.findViewById(R.id.iv_project);
            mView = itemView;
        }

    }
    //load ID of logged in user
    private void loadIDData() {
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }
}
